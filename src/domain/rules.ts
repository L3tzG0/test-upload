import { DIGITS } from './constants';
import type { Digit, Grid, Position } from './types';
import { boxIndex, positionsInBox, positionsInCol, positionsInRow } from './grid';

export function getRowValues(grid: Grid, row: number): Array<Digit> {
  return positionsInRow(row)
    .map((p) => grid[p.row][p.col].value)
    .filter((v): v is Digit => v !== null);
}

export function getColValues(grid: Grid, col: number): Array<Digit> {
  return positionsInCol(col)
    .map((p) => grid[p.row][p.col].value)
    .filter((v): v is Digit => v !== null);
}

export function getBoxValues(grid: Grid, pos: Position): Array<Digit> {
  const { boxRow, boxCol } = boxIndex(pos);
  return positionsInBox(boxRow, boxCol)
    .map((p) => grid[p.row][p.col].value)
    .filter((v): v is Digit => v !== null);
}

export function isMoveLegal(grid: Grid, pos: Position, digit: Digit): boolean {
  // Legal if digit does not already appear in row/col/box (ignoring the same cell)
  for (let c = 0; c < 9; c++) {
    if (c !== pos.col && grid[pos.row][c].value === digit) return false;
  }
  for (let r = 0; r < 9; r++) {
    if (r !== pos.row && grid[r][pos.col].value === digit) return false;
  }
  const { boxRow, boxCol } = boxIndex(pos);
  for (const p of positionsInBox(boxRow, boxCol)) {
    if (p.row === pos.row && p.col === pos.col) continue;
    if (grid[p.row][p.col].value === digit) return false;
  }
  return true;
}

export function getConflicts(grid: Grid, pos: Position): Position[] {
  const value = grid[pos.row][pos.col].value;
  if (!value) return [];

  const conflicts: Position[] = [];

  for (let c = 0; c < 9; c++) {
    if (c !== pos.col && grid[pos.row][c].value === value) conflicts.push({ row: pos.row, col: c });
  }
  for (let r = 0; r < 9; r++) {
    if (r !== pos.row && grid[r][pos.col].value === value) conflicts.push({ row: r, col: pos.col });
  }
  const { boxRow, boxCol } = boxIndex(pos);
  for (const p of positionsInBox(boxRow, boxCol)) {
    if (p.row === pos.row && p.col === pos.col) continue;
    if (grid[p.row][p.col].value === value) conflicts.push(p);
  }

  return conflicts;
}

export function getAllowedDigits(grid: Grid, pos: Position): Digit[] {
  // TODO: Consider optimizing by caching row/col/box sets in selectors.
  return DIGITS.filter((d) => isMoveLegal(grid, pos, d));
}

export function isSolved(grid: Grid): boolean {
  // TODO: Consider verifying against a known solution if provided.
  // Here we treat "solved" as: all cells filled and no conflicts.
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (!grid[r][c].value) return false;
      if (!isMoveLegal(grid, { row: r, col: c }, grid[r][c].value!)) return false;
    }
  }
  return true;
}
