type KeypadProps = {
  disabled?: boolean;
  onDigit: (digit: number) => void;
  onClear: () => void;
};

export function Keypad({ disabled, onDigit, onClear }: KeypadProps) {
  return (
    <div className="panel" aria-label="Keypad" style={{ width: 'min(320px, 92vw)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((d) => (
          <button
            key={d}
            type="button"
            disabled={disabled}
            onClick={() => onDigit(d)}
            aria-label={`Digit ${d}`}
            style={{ padding: '12px 10px' }}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          disabled={disabled}
          onClick={onClear}
          aria-label="Clear cell"
          style={{ gridColumn: '1 / -1', padding: '12px 10px' }}
        >
          Clear
        </button>
      </div>
      <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 12 }}>
        Tip: You can also use keyboard digits 1-9, Backspace/Delete to clear, and N to toggle note
        mode.
      </p>
    </div>
  );
}
