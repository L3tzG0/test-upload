import { describe, expect, it } from 'vitest';
import { parseGivensToGrid } from '@/domain/grid';
import { getAllowedDigits, isMoveLegal, isSolved } from '@/domain/rules';

describe('Sudoku rules', () => {
  it('detects illegal move in row', () => {
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

    // Row 0 already has 5 and 3.
    expect(isMoveLegal(grid, { row: 0, col: 2 }, 5)).toBe(false);
    expect(isMoveLegal(grid, { row: 0, col: 2 }, 3)).toBe(false);
  });

  it('computes allowed digits for an empty cell', () => {
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

    const allowed = getAllowedDigits(grid, { row: 0, col: 2 });
    // Known from classic example: allowed digits include 1,2,4.
    expect(allowed).toEqual(expect.arrayContaining([1, 2, 4]));
    expect(allowed).not.toEqual(expect.arrayContaining([3, 5, 7]));
  });

  it('detects solved grid', () => {
    const solved =
      '534678912' +
      '672195348' +
      '198342567' +
      '859761423' +
      '426853791' +
      '713924856' +
      '961537284' +
      '287419635' +
      '345286179';

    const grid = parseGivensToGrid(solved);
    expect(isSolved(grid)).toBe(true);
  });
});
