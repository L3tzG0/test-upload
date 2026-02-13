import { describe, expect, it } from 'vitest';
import { parseGivensToGrid } from '@/domain/grid';
import { createInitialGameState, gameReducer } from '@/state/gameReducer';

describe('gameReducer', () => {
  it('prevents editing given cells', () => {
    const grid = parseGivensToGrid(
      '53..7....' +
        '6..195...' +
        '.98....6.' +
        '8...6...3' +
        '4..8.3..1' +
        '7...2...6' +
        '.6....28.' +
        '...419..5' +
        '....8..79'
    );

    let state = createInitialGameState({ grid, difficulty: 'easy', puzzleId: 'x' });
    state = gameReducer(state, { type: 'game/select', payload: { selected: { row: 0, col: 0 } } });

    const next = gameReducer(state, { type: 'game/setDigit', payload: { digit: 9 } });
    expect(next.grid[0][0].value).toBe(5);
  });

  it('supports undo/redo for value changes', () => {
    const grid = parseGivensToGrid('.'.repeat(81));
    let state = createInitialGameState({ grid, difficulty: 'easy', puzzleId: 'x' });

    state = gameReducer(state, { type: 'game/select', payload: { selected: { row: 0, col: 0 } } });
    state = gameReducer(state, { type: 'game/setDigit', payload: { digit: 1 } });
    expect(state.grid[0][0].value).toBe(1);

    state = gameReducer(state, { type: 'game/undo' });
    expect(state.grid[0][0].value).toBe(null);

    state = gameReducer(state, { type: 'game/redo' });
    expect(state.grid[0][0].value).toBe(1);
  });
});
