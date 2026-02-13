import { z } from 'zod';
import type { Difficulty } from '@/domain/types';

const PersistedSchema = z.object({
  puzzleId: z.string(),
  difficulty: z.custom<Difficulty>(),
  elapsedMs: z.number().nonnegative(),
  gridValues: z.string().length(81)
});

export type PersistedGame = z.infer<typeof PersistedSchema>;

const KEY = 'sudoku.v1';

export function saveGame(data: PersistedGame): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

export function loadGame(): PersistedGame | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const res = PersistedSchema.safeParse(parsed);
    return res.success ? res.data : null;
  } catch {
    return null;
  }
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
