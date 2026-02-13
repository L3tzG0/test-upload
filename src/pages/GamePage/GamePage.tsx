import { useEffect, useMemo, useReducer } from 'react';
import { Header } from '@/components/Layout/Header';
import { Toolbar } from '@/components/Layout/Toolbar';
import { SudokuBoard } from '@/components/Sudoku/SudokuBoard';
import { Keypad } from '@/components/Sudoku/Keypad';
import { parseGivensToGrid, serializeGridValues, cloneGrid } from '@/domain/grid';
import { PUZZLES } from '@/domain/puzzles';
import { pickPuzzle } from '@/domain/generator';
import type { Difficulty, Position } from '@/domain/types';
import { gameReducer, createInitialGameState } from '@/state/gameReducer';
import { formatElapsed, getConflictPositions, getPeerPositions } from '@/state/selectors';
import { clearSavedGame, loadGame, saveGame } from '@/services/storage';
import { useInterval } from '@/hooks/useInterval';

function applySavedValuesToGrid(givensGrid: ReturnType<typeof parseGivensToGrid>, values: string) {
  // TODO: Validate saved values are compatible with givens.
  const next = cloneGrid(givensGrid);
  for (let i = 0; i < 81; i++) {
    const r = Math.floor(i / 9);
    const c = i % 9;
    const ch = values[i];
    if (ch === '.') continue;
    const digit = Number(ch);
    if (digit >= 1 && digit <= 9 && !next[r][c].given) {
      next[r][c] = { ...next[r][c], value: digit as any, candidates: new Set() };
    }
  }
  return next;
}

export function GamePage() {
  const saved = loadGame();

  const initial = useMemo(() => {
    const fallbackDifficulty: Difficulty = saved?.difficulty ?? 'easy';
    const puzzle = pickPuzzle(PUZZLES, fallbackDifficulty);
    const baseGrid = parseGivensToGrid(puzzle.givens);

    if (saved && saved.puzzleId === puzzle.id) {
      const restored = applySavedValuesToGrid(baseGrid, saved.gridValues);
      return createInitialGameState({
        grid: restored,
        difficulty: saved.difficulty,
        puzzleId: puzzle.id
      });
    }

    return createInitialGameState({ grid: baseGrid, difficulty: fallbackDifficulty, puzzleId: puzzle.id });
  }, []);

  const [state, dispatch] = useReducer(gameReducer, initial);

  useInterval(
    () => dispatch({ type: 'game/tick', payload: { now: Date.now() } }),
    state.status === 'playing' ? 250 : null
  );

  const peers = useMemo(() => (state.selected ? getPeerPositions(state.selected) : []), [state.selected]);
  const conflicts = useMemo(() => getConflictPositions(state), [state]);

  useEffect(() => {
    // Persist a lightweight representation.
    saveGame({
      puzzleId: state.puzzleId,
      difficulty: state.difficulty,
      elapsedMs: state.elapsedMs,
      gridValues: serializeGridValues(state.grid)
    });
  }, [state.grid, state.elapsedMs, state.difficulty, state.puzzleId]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'n' || e.key === 'N') {
        dispatch({ type: 'game/toggleNoteMode' });
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        dispatch({ type: 'game/clearCell' });
        return;
      }
      const digit = Number(e.key);
      if (digit >= 1 && digit <= 9) {
        if (state.noteMode === 'candidates') {
          dispatch({ type: 'game/toggleCandidate', payload: { digit } });
        } else {
          dispatch({ type: 'game/setDigit', payload: { digit } });
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.noteMode]);

  function newGame(difficulty: Difficulty) {
    const puzzle = pickPuzzle(PUZZLES, difficulty);
    const grid = parseGivensToGrid(puzzle.givens);
    dispatch({ type: 'game/new', payload: { grid, difficulty, puzzleId: puzzle.id } });
  }

  function onSelect(pos: Position) {
    dispatch({ type: 'game/select', payload: { selected: pos } });
  }

  return (
    <div className="container">
      <Header
        title="Sudoku"
        subtitle="Build a playable Sudoku game with React, reducer-driven state, and tested domain logic."
      />

      <Toolbar
        difficulty={state.difficulty}
        noteMode={state.noteMode}
        status={state.status}
        timeLabel={formatElapsed(state.elapsedMs)}
        canUndo={state.undoStack.length > 0}
        canRedo={state.redoStack.length > 0}
        onNewGame={newGame}
        onToggleNoteMode={() => dispatch({ type: 'game/toggleNoteMode' })}
        onUndo={() => dispatch({ type: 'game/undo' })}
        onRedo={() => dispatch({ type: 'game/redo' })}
        onClearSaved={() => {
          clearSavedGame();
          newGame(state.difficulty);
        }}
      />

      <div className="row" style={{ marginTop: 16 }}>
        <SudokuBoard
          grid={state.grid}
          selected={state.selected}
          peers={peers}
          conflicts={conflicts}
          onSelect={onSelect}
        />

        <Keypad
          disabled={state.status !== 'playing'}
          onDigit={(digit) => {
            if (state.noteMode === 'candidates') {
              dispatch({ type: 'game/toggleCandidate', payload: { digit } });
            } else {
              dispatch({ type: 'game/setDigit', payload: { digit } });
            }
          }}
          onClear={() => dispatch({ type: 'game/clearCell' })}
        />
      </div>

      <div style={{ marginTop: 16, color: 'var(--muted)', fontSize: 13 }}>
        <p style={{ margin: 0 }}>
          Next steps (intermediate challenges): implement legality checks on input, auto-clearing
          candidates in peers, and a real puzzle generator.
        </p>
      </div>
    </div>
  );
}
