# DESIGN DOCUMENT: create-spa-webapp

## Overview

`create-spa-webapp` is a CLI scaffolding tool similar to `create-react-app` or `create-next-app`.
It generates a fully-configured, batteries-included Single Page Application (SPA) template with a
modern TypeScript/React/Vite stack plus interactive examples showcasing common libraries.

---

## CLI Usage

### Global Install

```bash
npm install -g create-spa-webapp
```

### Invocation

```bash
create-spa-webapp
# or
npm create spa-webapp
# or
npx create-spa-webapp
```

### Interactive Prompts

```
What is the project name?
> My Awesome App

What is the folder name? (defaults to kebab-case of project name)
> my-awesome-app

What port number? (defaults to a random port)
> 5173
```

After answering the prompts the CLI will:

1. Copy the embedded project template into the specified folder
2. Replace all `__PROJECT_NAME__` and `__PORT__` placeholders with the user's answers
3. Run `npm install` inside the new project
4. Attempt to open the project in VSCode (`code .`)

---

## Monorepo Structure

```
create-spa-webapp/              ← repo root
├── package.json                ← workspaces root
├── DESIGN_DOCUMENT.md          ← this document
├── README.md
├── .gitignore
└── packages/
    └── cli/                    ← published npm package "create-spa-webapp"
        ├── package.json
        ├── tsconfig.json
        ├── src/
        │   └── index.ts        ← CLI entry point
        └── template/           ← bundled project template
            └── ...
```

---

## Generated Project Structure

```
<folder-name>/
├── node_modules/
├── design/
│   └── DESIGN_DOCUMENT.md      ← blank, ready to fill
├── public/
│   └── favicon.svg
├── src/
│   ├── global.css              ← Google Fonts + CSS reset
│   ├── main.tsx                ← React entry point
│   ├── App.tsx                 ← root component
│   ├── components/
│   │   ├── FontExamples.tsx    ← Google Fonts showcase
│   │   ├── PixiExample.tsx     ← PixiJS WebGL canvas
│   │   └── Counter.tsx         ← XState counter
│   └── machines/
│       └── counterMachine.ts   ← XState machine definition
├── test/
│   └── filecheck.test.ts       ← verifies all required files exist
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   │   └── design-project.md
│   ├── docs/
│   │   ├── code-conventions.md
│   │   └── architecture.md
│   └── workflows/
│       └── deploy.yml          ← GitHub Pages deployment
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts              ← base: './' for GitHub Pages
└── vitest.config.ts
```

---

## Technology Stack (Generated Project)

| Technology   | Role                     |
| ------------ | ------------------------ |
| TypeScript   | Static typing            |
| React 19     | UI framework             |
| Vite         | Dev server & bundler     |
| Vitest       | Unit/integration testing |
| XState v5    | State machines           |
| PixiJS v8    | 2D WebGL rendering       |
| OxLint       | Fast Rust-based linter   |
| Oxfmt        | Code formatter           |
| FontAwesome  | Icon library             |
| Google Fonts | Typography               |

---

## Generated Project NPM Scripts

| Command              | Description                                   |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start Vite dev server                         |
| `npm run build`      | TypeScript compile + Vite production build    |
| `npm run preview`    | Preview production build locally              |
| `npm run test`       | Run Vitest once                               |
| `npm run test:watch` | Run Vitest in watch mode                      |
| `npm run lint`       | OxLint with `--tsconfig` for type-aware rules |
| `npm run linter`     | Alias for `lint`                              |
| `npm run fmt`        | Oxfmt format (write)                          |
| `npm run format`     | Alias for `fmt`                               |

---

## Generated App — Hello World Screen

The generated `App.tsx` renders a simple reference page:

```
SPA (Single Page Application) Template

Stack: TypeScript, React, Vite, Vitest, XState, PixiJS, OxLint, Oxfmt, FontAwesome

Features:
  • State machine (XState)
  • WebGL rendering (PixiJS)
  • Google Fonts
  • FontAwesome icons
  • Type-safe with TypeScript

Examples:

  Font Examples
  ─────────────
  Hello World! from Libre Baskerville  (serif)
  Hello World! from Lora               (serif)
  Hello World! from Inter              (sans-serif)
  Hello World! from Roboto             (sans-serif)
  Hello World! from Open Sans          (sans-serif)
  Hello World! from Lato               (sans-serif)
  Hello World! from JetBrains Mono     (monospace)
  Hello World! from Fira Code          (monospace)

  PixiJS Example
  ──────────────
  [WebGL canvas — dark background with a blue circle and a pink triangle]

  XState Counter
  ──────────────
  Count: 0     [ - ]  [ Reset ]  [ + ]
```

---

## GitHub Pages Deployment

`vite.config.ts` uses `base: './'` so all asset paths are relative, making the production build
portable for GitHub Pages sub-directory hosting.

A GitHub Actions workflow at `.github/workflows/deploy.yml` automates deployment on every push to
`main`.

---

## CLI Technology Stack

| Technology     | Role                          |
| -------------- | ----------------------------- |
| TypeScript     | Type-safe CLI source          |
| tsup           | ESM bundle for distribution   |
| @clack/prompts | Beautiful interactive prompts |
| execa          | Spawn npm install / `code .`  |
| fs-extra       | Recursive template copy       |

---

## Design Decisions

### Monorepo

The repository is a minimal npm workspaces monorepo with a single `cli` package. This keeps the
CLI source and template co-located without introducing heavy tooling (no Turborepo/Nx required at
this scale).

### Template Bundled with CLI

The template directory lives inside the `cli` package and is published to npm alongside the
compiled CLI binary (`dist/index.js`). This means no network fetches are needed at project
creation time — the template is always available locally.

### Relative Paths for GitHub Pages

`vite.config.ts` sets `base: './'`. This makes all JS/CSS/asset imports in the production build
use relative paths, so the built `dist/` folder can be served from any GitHub Pages URL path
(e.g. `https://<user>.github.io/<repo>/`).

### oxlint over ESLint

OxLint is dramatically faster than ESLint for large codebases and has zero configuration
overhead. The `--tsconfig tsconfig.json` flag enables type-aware rules equivalent to
`@typescript-eslint/recommended-type-checked`.

### Oxfmt for Formatting

Oxfmt is a Rust-based formatter from the OXC project. It is a drop-in replacement for Prettier,
requires no configuration for sensible defaults, and is significantly faster.

### XState v5

XState v5 introduced a vastly simplified API (no more `Machine()` + `interpret()` boilerplate).
The counter machine demonstrates the new `createMachine` + `assign` pattern with `@xstate/react`'s
`useMachine` hook.

### PixiJS v8

PixiJS v8 moved to a fully async `Application.init()` pattern. The `PixiExample` component
demonstrates the correct async/cleanup pattern inside a React `useEffect`.
