# Code Conventions

## TypeScript

- Enable `strict: true` in `tsconfig.json`
- Prefer `interface` for object shapes, `type` for unions/aliases
- Use explicit return types on exported functions
- Avoid `any`; use `unknown` when the type is truly unknown

## React

- Functional components only — no class components
- One component per file
- File name matches component name (PascalCase)
- Use `import type` for type-only imports

## CSS

- Global styles in `src/global.css` (resets, fonts, variables)
- Component-scoped or layout styles in `src/main.css`
- Use CSS custom properties (`--var-name`) for design tokens

## XState

- Machine definitions live in `src/machines/`
- Use `createMachine` from `xstate` v5
- Use `useMachine` from `@xstate/react` in components

## Testing

- Tests live in `test/`
- Vitest is the test runner
- File naming: `<feature>.test.ts` or `<feature>.test.tsx`

## Git

- Commit messages use imperative mood: "Add feature" not "Added feature"
- One logical change per commit
