import type { GameState } from './gameTypes';
import type { Position } from '@/domain/types';
import { boxIndex } from '@/domain/grid';
import { getConflicts } from '@/domain/rules';

export function getSelectedCell(state: GameState) {
  if (!state.selected) return null;
  return state.grid[state.selected.row][state.selected.col];
}

export function getPeerPositions(pos: Position): Position[] {
  const peers: Position[] = [];
  for (let c = 0; c < 9; c++) peers.push({ row: pos.row, col: c });
  for (let r = 0; r < 9; r++) peers.push({ row: r, col: pos.col });
  const { boxRow, boxCol } = boxIndex(pos);
  const startRow = boxRow * 3;
  const startCol = boxCol * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) peers.push({ row: startRow + r, col: startCol + c });
  }

  // Remove duplicates
  const key = (p: Position) => `${p.row}:${p.col}`;
  const seen = new Set<string>();
  return peers.filter((p) => {
    const k = key(p);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function getConflictPositions(state: GameState): Position[] {
  if (!state.selected) return [];
  return getConflicts(state.grid, state.selected);
}

export function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
