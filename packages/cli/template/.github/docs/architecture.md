# Architecture

## Overview

This is a **client-side Single Page Application (SPA)**. There is no server-side rendering and no
backend — all logic runs in the browser.

## Directory Structure

```
src/
├── global.css              ← CSS reset + Google Fonts import
├── App.module.css          ← App layout styles (CSS Module)
├── main.tsx                ← React root mount
├── App.tsx                 ← Top-level shell component
├── components/             ← Reusable UI components
│   ├── MyComponent.tsx
│   ├── MyComponent.module.css
│   └── PixiScene.tsx
└── machines/               ← XState machine definitions
    └── appMachine.ts
```

## Data Flow

```
App
 ├── MyComponent    (UI component, minimal or no local state)
 ├── PixiScene      (imperative WebGL via PixiJS, managed in useEffect)
 └── FeatureView    (reads/writes appMachine via useMachine hook)
```

## State Management

State machines are defined with XState v5's `createMachine` and consumed with `useMachine` from
`@xstate/react`. For shared global state, lift the actor to a higher component and pass down via
props or React Context.

## Build Pipeline

```
TypeScript → tsc (type-check only, noEmit: true)
                   ↓
           Vite (bundle + optimize)
                   ↓
              dist/ (static files)
```

## Deployment

The `dist/` folder is a fully static site. It can be served from any static host. The project
includes a GitHub Actions workflow that deploys to GitHub Pages on every push to `main`.
