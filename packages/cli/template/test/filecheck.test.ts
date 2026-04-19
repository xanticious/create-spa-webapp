import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const REQUIRED_FILES = [
  'package.json',
  'vite.config.ts',
  'vitest.config.ts',
  'tsconfig.json',
  'index.html',
  'README.md',
  '.gitignore',
  'src/main.tsx',
  'src/global.css',
  'src/main.css',
  'src/App.tsx',
  'src/vite-env.d.ts',
  'src/components/FontExamples.tsx',
  'src/components/PixiExample.tsx',
  'src/components/Counter.tsx',
  'src/machines/counterMachine.ts',
  'public/favicon.svg',
  'design/DESIGN_DOCUMENT.md',
  '.github/copilot-instructions.md',
  '.github/instructions/design-project.md',
  '.github/docs/code-conventions.md',
  '.github/docs/architecture.md',
  '.github/workflows/deploy.yml',
];

describe('File structure', () => {
  for (const file of REQUIRED_FILES) {
    it(`should have ${file}`, () => {
      expect(existsSync(join(root, file))).toBe(true);
    });
  }
});
