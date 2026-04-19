# Design Project Instructions

When designing new features or making significant changes, follow these steps:

1. Update `design/DESIGN_DOCUMENT.md` with the proposed design before implementation.
2. Break the work into small, reviewable pull requests.
3. Write tests in `test/` for any new functionality.
4. Ensure `npm run lint` and `npm run fmt` pass before committing.
5. Keep components small and focused — prefer composition over large components.
6. New state machines belong in `src/machines/` following the `counterMachine.ts` pattern.
