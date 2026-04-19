#!/usr/bin/env node
import * as p from "@clack/prompts";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toKebabCase(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");
}

function randomPort(): number {
  return Math.floor(Math.random() * (9000 - 3000 + 1) + 3000);
}

async function replaceInFile(
  filePath: string,
  replacements: Record<string, string>,
): Promise<void> {
  const textExts = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".md",
    ".css",
    ".html",
    ".svg",
    ".yml",
    ".yaml",
    ".txt",
    ".gitignore",
  ]);
  const ext = path.extname(filePath);
  if (!textExts.has(ext) && !filePath.endsWith(".gitignore")) return;

  let content = await fs.readFile(filePath, "utf-8");
  for (const [placeholder, value] of Object.entries(replacements)) {
    content = content.replaceAll(placeholder, value);
  }
  await fs.writeFile(filePath, content);
}

async function replaceInDirectory(
  dir: string,
  replacements: Record<string, string>,
): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await replaceInDirectory(fullPath, replacements);
    } else {
      await replaceInFile(fullPath, replacements);
    }
  }
}

async function main(): Promise<void> {
  p.intro("🚀  create-spa-webapp");

  const projectName = await p.text({
    message: "What is the project name?",
    validate: (val) => {
      if (!val.trim()) return "Project name is required.";
    },
  });

  if (p.isCancel(projectName)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const defaultFolder = toKebabCase(String(projectName));

  const folderNameInput = await p.text({
    message: "What is the folder name?",
    placeholder: defaultFolder,
    defaultValue: defaultFolder,
  });

  if (p.isCancel(folderNameInput)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const defaultPort = randomPort();

  const portInput = await p.text({
    message: "What port number?",
    placeholder: String(defaultPort),
    defaultValue: String(defaultPort),
    validate: (val) => {
      const port = parseInt(val, 10);
      if (isNaN(port) || port < 1 || port > 65535) {
        return "Port must be a number between 1 and 65535.";
      }
    },
  });

  if (p.isCancel(portInput)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const name = String(projectName).trim();
  const folder = String(folderNameInput) || defaultFolder;
  const port = String(portInput) || String(defaultPort);

  const targetDir = path.resolve(process.cwd(), folder);

  if (await fs.pathExists(targetDir)) {
    const overwrite = await p.confirm({
      message: `Folder "${folder}" already exists. Overwrite?`,
      initialValue: false,
    });
    if (!overwrite || p.isCancel(overwrite)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }
    await fs.remove(targetDir);
  }

  // The template directory is at ../template relative to dist/index.js
  const templateDir = path.join(__dirname, "..", "template");

  const spinner = p.spinner();

  spinner.start("Creating project files…");
  await fs.copy(templateDir, targetDir, {
    filter: (src) => !src.includes("node_modules"),
  });

  // Rename _gitignore → .gitignore if it was renamed to avoid git issues
  const gitignoreSrc = path.join(targetDir, "_gitignore");
  if (await fs.pathExists(gitignoreSrc)) {
    await fs.rename(gitignoreSrc, path.join(targetDir, ".gitignore"));
  }

  const replacements: Record<string, string> = {
    __PROJECT_NAME__: name,
    __FOLDER_NAME__: folder,
    __PORT__: port,
  };

  await replaceInDirectory(targetDir, replacements);
  spinner.stop("Project files created.");

  spinner.start("Installing dependencies…");
  try {
    await execa("npm", ["install"], { cwd: targetDir, stdio: "inherit" });
    spinner.stop("Dependencies installed.");
  } catch {
    spinner.stop("npm install failed — please run it manually.");
    p.log.warn(`  cd ${folder} && npm install`);
  }

  try {
    await execa("code", ["."], { cwd: targetDir });
    p.log.info("Opened project in VSCode.");
  } catch {
    p.log.warn("Could not open VSCode automatically (is the `code` CLI installed?).");
  }

  p.outro(`✅  Project "${name}" is ready!\n\n` + `   cd ${folder}\n` + `   npm run dev\n`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
