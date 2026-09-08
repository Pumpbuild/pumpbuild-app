"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, TerminalSquare } from "lucide-react";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#developers", label: "Builders" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#transparency", label: "Transparency" },
  { href: "/#faq", label: "FAQ" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--line)", position: "sticky", top: 0, zIndex: 50, background: "var(--paper)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "18px 24px", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, flexShrink: 0, textDecoration: "none", color: "var(--ink)" }}>
          <TerminalSquare size={20} color="var(--ink)" />
          <span className="pb-slab" style={{ fontSize: 18, fontWeight: 700 }}>PumpBuild</span>
        </Link>

        <div className="pb-hide-mobile" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="pb-nav-link" style={{ whiteSpace: "nowrap" }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="pb-hide-mobile" style={{ display: "flex", alignItems: "center", gap: 12, justifySelf: "end" }}>
          <Link href="/apply" className="pb-btn pb-btn-amber">Apply</Link>
        </div>

        <div style={{ justifySelf: "end", gridColumn: 3 }} className="pb-menu-btn">
          <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="pb-menu-btn" style={{ flexDirection: "column", padding: "0 24px 20px", gap: 4 }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="pb-nav-link" style={{ textAlign: "left", padding: "10px 0", width: "100%" }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/apply" className="pb-btn pb-btn-amber" style={{ marginTop: 8, justifyContent: "center" }} onClick={() => setOpen(false)}>
            Apply
          </Link>
        </div>
      )}
    </div>
  );
}
