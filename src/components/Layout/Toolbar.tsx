import type { Difficulty } from '@/domain/types';

type ToolbarProps = {
  difficulty: Difficulty;
  noteMode: 'value' | 'candidates';
  status: 'playing' | 'solved';
  timeLabel: string;
  canUndo: boolean;
  canRedo: boolean;
  onNewGame: (difficulty: Difficulty) => void;
  onToggleNoteMode: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearSaved: () => void;
};

export function Toolbar(props: ToolbarProps) {
  return (
    <div
      className="panel"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}
    >
      <div style={{ flex: '1 1 auto' }}>
        <div style={{ color: 'var(--muted)', fontSize: 12 }}>Time</div>
        <div style={{ fontSize: 18 }}>{props.timeLabel}</div>
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>Difficulty</span>
        <select
          value={props.difficulty}
          onChange={(e) => props.onNewGame(e.target.value as Difficulty)}
          aria-label="Select difficulty"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button onClick={() => props.onNewGame(props.difficulty)} aria-label="New game">
        New game
      </button>

      <button onClick={props.onToggleNoteMode} aria-label="Toggle note mode">
        Note mode: {props.noteMode === 'value' ? 'Value' : 'Candidates'}
      </button>

      <button onClick={props.onUndo} disabled={!props.canUndo} aria-label="Undo">
        Undo
      </button>
      <button onClick={props.onRedo} disabled={!props.canRedo} aria-label="Redo">
        Redo
      </button>

      <button onClick={props.onClearSaved} aria-label="Clear saved game">
        Clear saved
      </button>

      {props.status === 'solved' ? (
        <div style={{ marginLeft: 'auto', color: 'var(--accent)', fontWeight: 600 }}>
          Solved
        </div>
      ) : null}
    </div>
  );
}
