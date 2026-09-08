export function LegalSection({ number, title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 className="pb-slab" style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
        {number}. {title}
      </h2>
      <div className="pb-muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export function LegalPageShell({ title, updated, children }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>
      <h1 className="pb-slab" style={{ fontSize: 30, fontWeight: 700, marginBottom: 6 }}>{title}</h1>
      <p className="pb-mono pb-muted" style={{ fontSize: 12.5, marginBottom: 36 }}>Last updated: {updated}</p>
      {children}
    </div>
  );
}
