# Building a Sudoku Board Game in Vite + React

A project-based, intermediate curriculum that guides you through building a fully playable Sudoku web app using modern React tooling. The codebase is structured like a small production frontend: clear separation of UI, domain logic, state, and testable utilities.

## What you will build
- A playable 9x9 Sudoku board with pencil marks
- Input via keyboard and on-screen keypad
- Validation (row/column/box), conflict highlighting, and completion detection
- Puzzle generation via a curated sample set (extensible to true generator)
- Timer, difficulty selection, undo/redo, and persistence

## Learning outcomes
By completing this project, you will be able to:
- Structure a Vite + React + TypeScript app with maintainable boundaries
- Model Sudoku domain concepts (grid, candidates, constraints) in pure functions
- Implement reducer-driven state management (undo/redo)
- Build accessible, testable UI components
- Write unit/integration tests with Vitest and Testing Library
- Use CI and GitHub Classroom autograding workflows

## Quick start
### Prerequisites
- Node.js 20+
- npm 9+

### Install
```bash
npm install
```

### Run dev server
```bash
npm run dev
```

### Run tests
```bash
npm test
```

### Lint and format
```bash
npm run lint
npm run format
```

## Project workflow (suggested)
1. Read `docs/ARCHITECTURE.md` to understand boundaries.
2. Start with the domain layer in `src/domain/`.
3. Wire state management in `src/state/`.
4. Build UI in `src/components/` and `src/pages/`.
5. Use `tests/` to guide implementation.

## Quality checklist
- Domain functions are pure and unit-tested
- UI components are accessible (labels, focus states)
- Reducer actions are typed and predictable
- No direct mutation of grid state
- CI passes: `npm run lint` and `npm test`

## License
MIT (see `LICENSE`)
