# create-spa-webapp

A CLI tool for scaffolding modern Single Page Applications — similar to `create-react-app` or `create-next-app`.

## Usage

```bash
# Using npx (no install required)
npx create-spa-webapp

# Or install globally
npm install -g create-spa-webapp
create-spa-webapp
```

The CLI will prompt you for:

```
What is the project name?    → My Awesome App
What is the folder name?     → my-awesome-app  (defaults to kebab-case of project name)
What port number?            → 5173             (defaults to a random port)
```

It then:
1. Copies the embedded template into the specified folder
2. Replaces placeholders (`__PROJECT_NAME__`, `__FOLDER_NAME__`, `__PORT__`)
3. Runs `npm install`
4. Attempts to open the project in VSCode

## Generated Project Stack

| Technology | Role |
|---|---|
| TypeScript | Static typing |
| React 19 | UI framework |
| Vite | Dev server & bundler |
| Vitest | Unit testing |
| XState v5 | State machines |
| PixiJS v8 | 2D WebGL rendering |
| OxLint | Fast Rust-based linter |
| Biome | Code formatter |
| FontAwesome | Icon library |
| Google Fonts | Typography |

## Generated Project Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` / `linter` | Run OxLint |
| `npm run fmt` / `format` | Run Biome formatter |

## Repository Structure

```
create-spa-webapp/
├── DESIGN_DOCUMENT.md       ← Project design document
├── package.json             ← npm workspaces monorepo root
└── packages/
    └── cli/                 ← Published npm package
        ├── src/index.ts     ← CLI entry point
        └── template/        ← Bundled project template
```

See [DESIGN_DOCUMENT.md](./DESIGN_DOCUMENT.md) for the full design specification.
