"use client";

import { useState } from "react";
import { Github, GitCommit, ExternalLink, ChevronDown } from "lucide-react";
import { XIcon } from "./icons";

export const fmtUsd = (n) => `$${Number(n || 0).toLocaleString("en-US")}`;

const SOL_USD_RATE = 101.95;
export const fmtSol = (usd) => `${(Number(usd || 0) / SOL_USD_RATE).toFixed(2)} SOL`;

const AVATAR_COLORS = ["#EFA23B", "#3F9E74", "#D9634F", "#6B8CAE", "#9C7BB0", "#5B6E65"];

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function initialsOf(name) {
  return (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function Avatar({ name, seed, size = 40, radius = 6, avatarUrl }) {
  const [imgFailed, setImgFailed] = useState(false);
  const color = AVATAR_COLORS[hashSeed(seed || name || "x") % AVATAR_COLORS.length];

  if (avatarUrl && !imgFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name || ""}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          objectFit: "cover",
          flexShrink: 0,
          border: "1px solid var(--line)",
          background: "var(--paper-2)",
        }}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 600,
        fontSize: Math.round(size * 0.36),
        flexShrink: 0,
        border: "1px solid var(--line)",
      }}
    >
      {initialsOf(name)}
    </div>
  );
}

export function StatusPill({ status }) {
  const map = {
    trading: { label: "Trading", color: "var(--green)" },
    building: { label: "Building", color: "var(--amber-deep)" },
    queued: { label: "Queued", color: "var(--muted)" },
  };
  const s = map[status] || map.queued;
  return (
    <span
      className="pb-mono"
      style={{ fontSize: 11.5, color: s.color, border: `1px solid ${s.color}`, borderRadius: 20, padding: "3px 9px", whiteSpace: "nowrap" }}
    >
      {s.label}
    </span>
  );
}

export function StagePill({ stage }) {
  const map = { Idea: "var(--muted)", Building: "var(--amber-deep)", Launched: "var(--green)" };
  const color = map[stage] || "var(--muted)";
  return (
    <span className="pb-mono" style={{ fontSize: 11.5, color, border: `1px solid ${color}`, borderRadius: 20, padding: "3px 9px", whiteSpace: "nowrap" }}>
      {stage}
    </span>
  );
}

export function CategoryTag({ category }) {
  const isFounder = category === "founder";
  return (
    <span
      className="pb-mono"
      style={{
        fontSize: 10.5,
        color: isFounder ? "var(--amber-deep)" : "var(--green)",
        border: `1px solid ${isFounder ? "var(--amber-deep)" : "var(--green)"}`,
        borderRadius: 20,
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {isFounder ? "Startup" : "Developer"}
    </span>
  );
}

export function RankBadge({ rank }) {
  const colors = { 1: "var(--amber)", 2: "var(--muted)", 3: "var(--coral)" };
  const bg = colors[rank] || "var(--line)";
  return (
    <span
      className="pb-mono"
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: bg,
        color: rank <= 3 ? "#1B1204" : "var(--ink)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11.5,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {rank}
    </span>
  );
}

export function PipelineStage({ n, label, desc, last }) {
  return (
    <div style={{ display: "flex", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          className="pb-mono"
          style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}
        >
          {n}
        </div>
        {!last && <div style={{ flex: 1, width: 1, background: "var(--line)", marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: 34 }}>
        <div className="pb-slab" style={{ fontSize: 17, fontWeight: 600, marginBottom: 5 }}>{label}</div>
        <p className="pb-muted" style={{ fontSize: 14.5, lineHeight: 1.6, maxWidth: 440 }}>{desc}</p>
      </div>
    </div>
  );
}

export function FeatureRow({ tag, title, desc }) {
  return (
    <div className="pb-hair" style={{ borderTop: "1px solid", padding: "22px 0", display: "flex", gap: 20 }}>
      <span className="pb-mono pb-muted" style={{ fontSize: 14, paddingTop: 2 }}>$</span>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
          <span className="pb-slab" style={{ fontSize: 16.5, fontWeight: 600 }}>{title}</span>
          <span className="pb-mono" style={{ fontSize: 11.5, color: "var(--amber-deep)" }}>{tag}</span>
        </div>
        <p className="pb-muted" style={{ fontSize: 14.5, lineHeight: 1.6, maxWidth: 520 }}>{desc}</p>
      </div>
    </div>
  );
}

export function StatBlock({ value, label, sub }) {
  return (
    <div>
      <div className="pb-mono pb-slab" style={{ fontSize: 30, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{label}</div>
      {sub && <div className="pb-muted" style={{ fontSize: 12.5, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export function TransparencyCard({ icon, title, desc }) {
  return (
    <div className="pb-box">
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <div className="pb-slab" style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <p className="pb-muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

export function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="pb-hair" style={{ borderBottom: "1px solid" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 2px", textAlign: "left" }}
      >
        <span className="pb-slab" style={{ fontSize: 15.5, fontWeight: 600, color: "var(--ink)" }}>{q}</span>
        <ChevronDown size={17} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease", flexShrink: 0, marginLeft: 12 }} />
      </button>
      {open && (
        <p className="pb-muted" style={{ fontSize: 14, lineHeight: 1.65, paddingBottom: 18, maxWidth: 640 }}>{a}</p>
      )}
    </div>
  );
}

export function TopThreeCard({ dev, rank, onClick }) {
  const highlightBorder = rank === 1 ? "var(--amber)" : "var(--line)";
  return (
    <div className="pb-box pb-row-hover" style={{ cursor: "pointer", borderColor: highlightBorder, display: "flex", alignItems: "center", gap: 14 }} onClick={onClick}>
      <RankBadge rank={rank} />
      <Avatar name={dev.category === "founder" ? dev.company_name : dev.name} seed={dev.handle} size={40} avatarUrl={dev.avatar_url} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <span style={{ fontWeight: 600, fontSize: 14.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {dev.category === "founder" ? dev.company_name : dev.name}
          </span>
          <span style={{ flexShrink: 0 }}><CategoryTag category={dev.category} /></span>
        </div>
        <div className="pb-mono pb-muted" style={{ fontSize: 12, marginTop: 2 }}>{fmtUsd(dev.claimed_usd)} claimed</div>
      </div>
    </div>
  );
}

export function DeveloperCard({ dev, rank, onClick }) {
  return (
    <div className="pb-box pb-row-hover" style={{ cursor: "pointer", position: "relative", display: "flex", flexDirection: "column", height: "100%" }} onClick={onClick}>
      <div style={{ position: "absolute", top: 16, right: 16 }}>
        <RankBadge rank={rank} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, paddingRight: 30 }}>
        <Avatar name={dev.category === "founder" ? dev.company_name : dev.name} seed={dev.handle} size={46} avatarUrl={dev.avatar_url} />
        <div style={{ minWidth: 0, flex: 1 }}>
          {dev.category === "founder" ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 15.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                  {dev.company_name}
                </span>
                <span style={{ flexShrink: 0 }}><CategoryTag category={dev.category} /></span>
              </div>
              <div className="pb-mono pb-muted" style={{ fontSize: 11.5, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Founded by {dev.name}
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: 15.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                {dev.name}
              </span>
              <span style={{ flexShrink: 0 }}><CategoryTag category={dev.category} /></span>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 3 }}>
            {dev.github && (
              <a href={dev.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="pb-nav-link" style={{ display: "flex" }}>
                <Github size={13} />
              </a>
            )}
            {dev.twitter && (
              <a href={dev.twitter} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="pb-nav-link" style={{ display: "flex" }}>
                <XIcon size={12} />
              </a>
            )}
          </div>
        </div>
      </div>

      <p className="pb-muted" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 12, minHeight: 34 }}>{dev.bio}</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        {dev.category === "founder" ? (
          <>
            <StagePill stage={dev.stage} />
            {dev.product_url && (
              <a
                href={dev.product_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="pb-mono"
                style={{ fontSize: 11.5, color: "var(--amber-deep)", display: "flex", alignItems: "center", gap: 5, textDecoration: "none", fontWeight: 500 }}
              >
                Visit product <ExternalLink size={11} />
              </a>
            )}
          </>
        ) : (
          <>
            <span className="pb-mono" style={{ fontSize: 11, border: "1px solid var(--line)", borderRadius: 20, padding: "3px 9px" }}>
              {dev.language}
            </span>
            <span className="pb-mono pb-muted" style={{ fontSize: 11, border: "1px solid var(--line)", borderRadius: 20, padding: "3px 9px", display: "flex", alignItems: "center", gap: 5 }}>
              <GitCommit size={11} /> {dev.repo} · {dev.repo_stars}★{dev.forks ? ` · ${dev.forks}⑂` : ""}
            </span>
          </>
        )}
      </div>

      <div style={{ marginTop: "auto" }}>
        <div className="pb-mono pb-muted" style={{ fontSize: 11, marginBottom: 4 }}>total claimed</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="pb-slab pb-mono" style={{ fontSize: 22, fontWeight: 700 }}>{fmtUsd(dev.claimed_usd)}</span>
          <span className="pb-mono pb-muted" style={{ fontSize: 12 }}>{fmtSol(dev.claimed_usd)}</span>
        </div>
      </div>
    </div>
  );
}
