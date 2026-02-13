# Contributing

## Working agreements
- Use small, focused commits
- Prefer pure functions in `src/domain/` and cover them with unit tests
- Keep UI components accessible and test interactions

## Development workflow
1. Create a branch
2. Run checks locally:
   ```bash
   npm run typecheck
   npm run lint
   npm test
   ```
3. Open a PR with a clear description and screenshots for UI changes

## Commit message convention
Use a simple, readable convention:
- `feat: add keypad input`
- `fix: prevent editing given cells`
- `test: add validation edge cases`
- `docs: clarify architecture`

## Code review checklist
- Does the change include tests for domain logic?
- Are there any direct mutations of state?
- Does the UI remain keyboard accessible?
- Are error states and edge cases handled?
