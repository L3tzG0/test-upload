import type { Difficulty, Puzzle } from './types';

export function pickPuzzle(puzzles: Puzzle[], difficulty: Difficulty): Puzzle {
  const candidates = puzzles.filter((p) => p.difficulty === difficulty);
  if (candidates.length === 0) {
    throw new Error(`No puzzles available for difficulty '${difficulty}'`);
  }
  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx];
}

// TODO: Implement a real Sudoku generator.
// Consider:
// - Start from a complete solved grid
// - Remove values while maintaining uniqueness
// - Rate difficulty using solving techniques
export function generatePuzzle(_difficulty: Difficulty): Puzzle {
  throw new Error('Not implemented: generatePuzzle');
}
