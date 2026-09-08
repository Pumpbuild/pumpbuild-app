"use client";

import { useState } from "react";

const emptyBuilder = {
  category: "developer",
  name: "",
  handle: "",
  github: "",
  twitter: "",
  bio: "",
  language: "",
  repo: "",
  repo_stars: "",
  company_name: "",
  stage: "Building",
  product_url: "",
  claimed_usd: 0,
  status: "queued",
};

export default function BuilderForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyBuilder);
  const [saving, setSaving] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isFounder = form.category === "founder";

  const submit = async (e) => {
    e.preventDefault();
    const name = (form.name || "").trim();
    if (!name) return;
    if (isFounder && !(form.company_name || "").trim()) return;
    setSaving(true);
    await onSave({
      ...form,
      claimed_usd: Number(form.claimed_usd) || 0,
      repo_stars: form.repo_stars ? String(form.repo_stars) : "",
    });
    setSaving(false);
  };

  return (
    <form onSubmit={submit} className="pb-box" style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 18 }}>
        <label className="pb-label">Category</label>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { id: "developer", label: "Developer" },
            { id: "founder", label: "Startup" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setForm({ ...form, category: opt.id })}
              className="pb-mono"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 4,
                border: `1px solid ${form.category === opt.id ? "var(--amber-deep)" : "var(--line)"}`,
                background: form.category === opt.id ? "var(--amber)" : "transparent",
                color: form.category === opt.id ? "#1B1204" : "var(--ink)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label className="pb-label">{isFounder ? "Founder name" : "Full name"}</label>
          <input className="pb-field" value={form.name} onChange={update("name")} required />
        </div>
        <div>
          <label className="pb-label">Handle (for avatar / links)</label>
          <input className="pb-field" value={form.handle} onChange={update("handle")} placeholder="e.g. janedoe" />
        </div>
      </div>

      <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label className="pb-label">GitHub URL</label>
          <input className="pb-field" value={form.github} onChange={update("github")} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="pb-label">X (Twitter) URL</label>
          <input className="pb-field" value={form.twitter} onChange={update("twitter")} placeholder="https://x.com/..." />
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label className="pb-label">Bio / one-line pitch</label>
        <input className="pb-field" value={form.bio} onChange={update("bio")} />
      </div>

      {isFounder ? (
        <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label className="pb-label">Company name</label>
            <input className="pb-field" value={form.company_name} onChange={update("company_name")} required />
          </div>
          <div>
            <label className="pb-label">Stage</label>
            <select className="pb-field" value={form.stage} onChange={update("stage")}>
              <option>Idea</option>
              <option>Building</option>
              <option>Launched</option>
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="pb-label">Product URL (optional)</label>
            <input className="pb-field" value={form.product_url} onChange={update("product_url")} placeholder="https://..." />
          </div>
        </div>
      ) : (
        <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label className="pb-label">Language</label>
            <input className="pb-field" value={form.language} onChange={update("language")} placeholder="e.g. Rust" />
          </div>
          <div>
            <label className="pb-label">Repo name</label>
            <input className="pb-field" value={form.repo} onChange={update("repo")} placeholder="e.g. flowkit" />
          </div>
          <div>
            <label className="pb-label">Repo stars</label>
            <input className="pb-field" value={form.repo_stars} onChange={update("repo_stars")} placeholder="e.g. 8.2k" />
          </div>
        </div>
      )}

      <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div>
          <label className="pb-label">Total claimed (USD)</label>
          <input className="pb-field" type="number" min="0" step="0.01" value={form.claimed_usd} onChange={update("claimed_usd")} />
        </div>
        <div>
          <label className="pb-label">Status</label>
          <select className="pb-field" value={form.status} onChange={update("status")}>
            <option value="queued">Queued</option>
            <option value="building">Building</option>
            <option value="trading">Trading</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" className="pb-btn pb-btn-amber" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        <button type="button" className="pb-btn pb-btn-outline" onClick={onCancel} disabled={saving}>Cancel</button>
      </div>
    </form>
  );
}
