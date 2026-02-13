import type { GameAction, GameState } from './gameTypes';
import type { Digit } from '@/domain/types';
import { cloneGrid } from '@/domain/grid';
import { isSolved } from '@/domain/rules';

function toDigit(n: number): Digit {
  if (n < 1 || n > 9) throw new Error(`Invalid digit ${n}`);
  return n as Digit;
}

export function createInitialGameState(params: {
  grid: GameState['grid'];
  difficulty: GameState['difficulty'];
  puzzleId: string;
}): GameState {
  return {
    grid: params.grid,
    selected: null,
    noteMode: 'value',
    status: 'playing',
    startedAt: Date.now(),
    elapsedMs: 0,
    difficulty: params.difficulty,
    puzzleId: params.puzzleId,
    undoStack: [],
    redoStack: []
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'game/new': {
      return createInitialGameState({
        grid: action.payload.grid,
        difficulty: action.payload.difficulty,
        puzzleId: action.payload.puzzleId
      });
    }

    case 'game/select': {
      return { ...state, selected: action.payload.selected };
    }

    case 'game/toggleNoteMode': {
      return { ...state, noteMode: state.noteMode === 'value' ? 'candidates' : 'value' };
    }

    case 'game/tick': {
      if (state.status !== 'playing') return state;
      const delta = action.payload.now - state.startedAt;
      return { ...state, elapsedMs: Math.max(0, delta) };
    }

    case 'game/undo': {
      const prev = state.undoStack[state.undoStack.length - 1];
      if (!prev) return state;
      return {
        ...state,
        grid: prev,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [cloneGrid(state.grid), ...state.redoStack]
      };
    }

    case 'game/redo': {
      const next = state.redoStack[0];
      if (!next) return state;
      return {
        ...state,
        grid: next,
        undoStack: [...state.undoStack, cloneGrid(state.grid)],
        redoStack: state.redoStack.slice(1)
      };
    }

    case 'game/clearCell': {
      if (!state.selected) return state;
      const cell = state.grid[state.selected.row][state.selected.col];
      if (cell.given) return state;

      const nextGrid = cloneGrid(state.grid);
      nextGrid[state.selected.row][state.selected.col] = {
        ...cell,
        value: null,
        candidates: new Set()
      };

      return {
        ...state,
        grid: nextGrid,
        undoStack: [...state.undoStack, cloneGrid(state.grid)],
        redoStack: [],
        status: isSolved(nextGrid) ? 'solved' : 'playing'
      };
    }

    case 'game/setDigit': {
      if (!state.selected) return state;
      const cell = state.grid[state.selected.row][state.selected.col];
      if (cell.given) return state;

      // If digit is null, treat as clear.
      if (action.payload.digit === null) {
        return gameReducer(state, { type: 'game/clearCell' });
      }

      const digit = toDigit(action.payload.digit);

      const nextGrid = cloneGrid(state.grid);
      const nextCell = nextGrid[state.selected.row][state.selected.col];

      if (state.noteMode === 'candidates') {
        // TODO: Decide whether setting a digit in note mode should be blocked.
        // Current behavior: treat note mode as candidate toggle; use toggleCandidate action.
        return state;
      }

      nextGrid[state.selected.row][state.selected.col] = {
        ...nextCell,
        value: digit,
        candidates: new Set()
      };

      return {
        ...state,
        grid: nextGrid,
        undoStack: [...state.undoStack, cloneGrid(state.grid)],
        redoStack: [],
        status: isSolved(nextGrid) ? 'solved' : 'playing'
      };
    }

    case 'game/toggleCandidate': {
      if (!state.selected) return state;
      const cell = state.grid[state.selected.row][state.selected.col];
      if (cell.given) return state;

      const digit = toDigit(action.payload.digit);

      const nextGrid = cloneGrid(state.grid);
      const nextCell = nextGrid[state.selected.row][state.selected.col];

      // Candidate changes are allowed only in candidates mode.
      if (state.noteMode !== 'candidates') return state;

      const nextCandidates = new Set(nextCell.candidates);
      if (nextCandidates.has(digit)) nextCandidates.delete(digit);
      else nextCandidates.add(digit);

      nextGrid[state.selected.row][state.selected.col] = {
        ...nextCell,
        value: null,
        candidates: nextCandidates
      };

      return {
        ...state,
        grid: nextGrid,
        undoStack: [...state.undoStack, cloneGrid(state.grid)],
        redoStack: []
      };
    }

    default:
      return state;
  }
}
