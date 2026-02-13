type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header style={{ marginBottom: 16 }}>
      <h1 style={{ margin: 0, fontSize: 24 }}>{title}</h1>
      {subtitle ? (
        <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>{subtitle}</p>
      ) : null}
    </header>
  );
}
