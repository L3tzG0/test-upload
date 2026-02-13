import { BOX_SIZE, GRID_SIZE } from './constants';
import type { Cell, Digit, Grid, Position } from './types';

export function createEmptyCell(): Cell {
  return { given: false, value: null, candidates: new Set() };
}

export function createEmptyGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => createEmptyCell())
  );
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map((row) =>
    row.map((cell) => ({
      given: cell.given,
      value: cell.value,
      candidates: new Set(cell.candidates)
    }))
  );
}

export function isValidPosition(pos: Position): boolean {
  return pos.row >= 0 && pos.row < GRID_SIZE && pos.col >= 0 && pos.col < GRID_SIZE;
}

export function boxIndex(pos: Position): { boxRow: number; boxCol: number } {
  return {
    boxRow: Math.floor(pos.row / BOX_SIZE),
    boxCol: Math.floor(pos.col / BOX_SIZE)
  };
}

export function positionsInRow(row: number): Position[] {
  return Array.from({ length: GRID_SIZE }, (_, col) => ({ row, col }));
}

export function positionsInCol(col: number): Position[] {
  return Array.from({ length: GRID_SIZE }, (_, row) => ({ row, col }));
}

export function positionsInBox(boxRow: number, boxCol: number): Position[] {
  const startRow = boxRow * BOX_SIZE;
  const startCol = boxCol * BOX_SIZE;
  const positions: Position[] = [];
  for (let r = 0; r < BOX_SIZE; r++) {
    for (let c = 0; c < BOX_SIZE; c++) {
      positions.push({ row: startRow + r, col: startCol + c });
    }
  }
  return positions;
}

export function serializeGridValues(grid: Grid): string {
  // '.' for empty, '1'..'9' for values
  return grid
    .flat()
    .map((cell) => (cell.value ? String(cell.value) : '.'))
    .join('');
}

export function parseGivensToGrid(givens: string): Grid {
  if (givens.length !== 81) {
    throw new Error(`Expected givens string length 81, got ${givens.length}`);
  }

  const grid = createEmptyGrid();
  for (let i = 0; i < 81; i++) {
    const ch = givens[i];
    const row = Math.floor(i / 9);
    const col = i % 9;

    if (ch === '.') continue;
    const digit = Number(ch) as Digit;
    if (!(digit >= 1 && digit <= 9)) {
      throw new Error(`Invalid digit '${ch}' at index ${i}`);
    }
    grid[row][col] = { given: true, value: digit, candidates: new Set() };
  }

  return grid;
}
