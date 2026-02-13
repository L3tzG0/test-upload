# Architecture

## Goals
- Keep Sudoku rules and transformation logic independent from React
- Make state transitions explicit and testable
- Keep UI components focused on rendering and user interaction

## Boundaries
- `src/domain/*`: Pure functions and types (no React, no browser APIs)
- `src/state/*`: Reducer and actions (still mostly pure)
- `src/components/*`: Reusable UI components
- `src/pages/*`: Page-level composition
- `src/services/*`: Browser integrations (localStorage)

## Data model
- The grid is a 9x9 matrix of `Cell`
- A `Cell` can be:
  - `given`: part of the puzzle
  - `value`: user-entered final value
  - `candidates`: pencil marks

## Undo/redo
Undo/redo is implemented in the reducer via a history stack.

Design choice:
- Store snapshots of the grid (81 cells) for simplicity.
- TODO: If performance becomes an issue, store patches/diffs.

## Extensibility
- Add a real generator in `src/domain/generator.ts`.
- Add difficulty rating by counting givens or using solving techniques.
- Add mobile gestures and richer accessibility.
