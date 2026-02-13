import type { Difficulty, Grid, Position } from '@/domain/types';

export type NoteMode = 'value' | 'candidates';

export type GameStatus = 'playing' | 'solved';

export type GameState = {
  grid: Grid;
  selected: Position | null;
  noteMode: NoteMode;
  status: GameStatus;
  startedAt: number; // epoch ms
  elapsedMs: number; // accumulated when paused not implemented
  difficulty: Difficulty;
  puzzleId: string;

  // Undo/redo stacks store previous grid snapshots.
  // TODO: Consider storing patches if you add advanced features.
  undoStack: Grid[];
  redoStack: Grid[];
};

export type GameAction =
  | { type: 'game/new'; payload: { grid: Grid; difficulty: Difficulty; puzzleId: string } }
  | { type: 'game/select'; payload: { selected: Position | null } }
  | { type: 'game/toggleNoteMode' }
  | { type: 'game/setDigit'; payload: { digit: number | null } }
  | { type: 'game/toggleCandidate'; payload: { digit: number } }
  | { type: 'game/clearCell' }
  | { type: 'game/undo' }
  | { type: 'game/redo' }
  | { type: 'game/tick'; payload: { now: number } };
