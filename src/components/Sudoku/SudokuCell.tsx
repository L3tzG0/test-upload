import type { Cell, Position } from '@/domain/types';

type SudokuCellProps = {
  cell: Cell;
  pos: Position;
  isSelected: boolean;
  isPeer: boolean;
  isConflict: boolean;
  onSelect: (pos: Position) => void;
};

function borderStyle(pos: Position): React.CSSProperties {
  const thick = '2px solid rgba(255,255,255,0.25)';
  const thin = '1px solid rgba(255,255,255,0.10)';

  return {
    borderTop: pos.row % 3 === 0 ? thick : thin,
    borderLeft: pos.col % 3 === 0 ? thick : thin,
    borderRight: pos.col === 8 ? thick : thin,
    borderBottom: pos.row === 8 ? thick : thin
  };
}

export function SudokuCell({ cell, pos, isSelected, isPeer, isConflict, onSelect }: SudokuCellProps) {
  const bg = isSelected
    ? 'var(--cell-selected)'
    : isPeer
      ? 'var(--cell-peer)'
      : (pos.row + pos.col) % 2 === 0
        ? 'var(--cell)'
        : 'var(--cell-alt)';

  const outline = isConflict ? `2px solid var(--danger)` : 'none';

  return (
    <button
      type="button"
      role="gridcell"
      onClick={() => onSelect(pos)}
      aria-label={`Cell row ${pos.row + 1} column ${pos.col + 1}`}
      style={{
        ...borderStyle(pos),
        background: bg,
        outline,
        width: '100%',
        aspectRatio: '1 / 1',
        display: 'grid',
        placeItems: 'center',
        padding: 0,
        cursor: 'pointer',
        color: 'var(--text)'
      }}
    >
      {cell.value ? (
        <span style={{ fontSize: 22, fontWeight: cell.given ? 700 : 500 }}>{cell.value}</span>
      ) : cell.candidates.size > 0 ? (
        <span
          style={{
            fontSize: 10,
            lineHeight: 1.15,
            color: 'var(--muted)',
            padding: 6,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            width: '100%'
          }}
        >
          {Array.from({ length: 9 }, (_, i) => i + 1).map((d) => (
            <span key={d} style={{ textAlign: 'center' }}>
              {cell.candidates.has(d as any) ? d : ''}
            </span>
          ))}
        </span>
      ) : (
        <span style={{ fontSize: 18, color: 'transparent' }}>.</span>
      )}
    </button>
  );
}
