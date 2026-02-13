export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Position = {
  row: number; // 0..8
  col: number; // 0..8
};

export type Cell = {
  given: boolean;
  value: Digit | null;
  candidates: Set<Digit>;
};

export type Grid = Cell[][]; // 9x9

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Puzzle = {
  id: string;
  difficulty: Difficulty;
  // 81 chars: '.' for empty, '1'..'9' for given
  givens: string;
  // Optional solution string
  solution?: string;
};
