import type { Grid, Position } from '@/domain/types';
import { SudokuCell } from './SudokuCell';

type SudokuBoardProps = {
  grid: Grid;
  selected: Position | null;
  peers: Position[];
  conflicts: Position[];
  onSelect: (pos: Position) => void;
};

const keyOf = (p: Position) => `${p.row}:${p.col}`;

export function SudokuBoard({ grid, selected, peers, conflicts, onSelect }: SudokuBoardProps) {
  const peerSet = new Set(peers.map(keyOf));
  const conflictSet = new Set(conflicts.map(keyOf));
  const selectedKey = selected ? keyOf(selected) : null;

  return (
    <div
      className="panel"
      role="grid"
      aria-label="Sudoku board"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gap: 0,
        width: 'min(520px, 92vw)',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => {
          const pos = { row: r, col: c };
          const k = keyOf(pos);
          return (
            <SudokuCell
              key={k}
              cell={cell}
              pos={pos}
              isSelected={selectedKey === k}
              isPeer={peerSet.has(k)}
              isConflict={conflictSet.has(k)}
              onSelect={onSelect}
            />
          );
        })
      )}
    </div>
  );
}
