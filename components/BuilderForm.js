"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

const emptyBuilder = {
  category: "developer",
  name: "",
  handle: "",
  github: "",
  twitter: "",
  bio: "",
  repo_url: "",
  language: "",
  repo: "",
  repo_stars: "",
  forks: "",
  avatar_url: "",
  company_name: "",
  stage: "Building",
  product_url: "",
  claimed_usd: 0,
  status: "queued",
};

function formatCount(n) {
  if (n == null) return "";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// Pulls repo name, language, stars, forks, and the repo owner's avatar
// straight from GitHub's public API — no auth needed for public repos.
// X/Twitter has no equivalent public, unauthenticated way to fetch a profile
// picture, so that part can't be automated the same way.
async function fetchGithubRepoData(repoUrl) {
  const match = (repoUrl || "").match(/github\.com\/([^/\s]+)\/([^/\s]+)/i);
  if (!match) {
    throw new Error("That doesn't look like a GitHub repo URL (expected github.com/owner/repo).");
  }
  const owner = match[1];
  const repo = match[2].replace(/\.git$/, "");

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (res.status === 404) throw new Error("Repo not found. Check the URL is correct and the repo is public.");
  if (res.status === 403) throw new Error("GitHub rate-limited this request. Wait a bit and try again.");
  if (!res.ok) throw new Error("Couldn't fetch that repo from GitHub.");

  const data = await res.json();
  return {
    repo: data.name || repo,
    language: data.language || "",
    repo_stars: formatCount(data.stargazers_count),
    forks: formatCount(data.forks_count),
    avatar_url: data.owner?.avatar_url || "",
    github: data.owner?.html_url || `https://github.com/${owner}`,
  };
}

export default function BuilderForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!initial) return emptyBuilder;
    const repo_url =
      initial.category !== "founder" && initial.github && initial.repo
        ? `${initial.github.replace(/\/$/, "")}/${initial.repo}`
        : "";
    return { ...emptyBuilder, ...initial, repo_url };
  });
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isFounder = form.category === "founder";

  const handleFetchGithub = async () => {
    setFetchError("");
    setFetching(true);
    try {
      const data = await fetchGithubRepoData(form.repo_url);
      setForm((f) => ({ ...f, ...data }));
    } catch (err) {
      setFetchError(err.message || "Something went wrong fetching that repo.");
    }
    setFetching(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const name = (form.name || "").trim();
    if (!name) return;
    if (isFounder && !(form.company_name || "").trim()) return;
    setSaving(true);
    const { repo_url, ...rest } = form;
    await onSave({
      ...rest,
      claimed_usd: Number(form.claimed_usd) || 0,
      repo_stars: form.repo_stars ? String(form.repo_stars) : "",
      forks: form.forks ? String(form.forks) : "",
      // Developers don't get a manual status control (see below) — default
      // them to "trading" so a freshly-added developer with real claimed
      // fees doesn't sit stuck on "Queued" forever.
      status: isFounder ? form.status : "trading",
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
          <label className="pb-label">Handle (for links)</label>
          <input className="pb-field" value={form.handle} onChange={update("handle")} placeholder="e.g. janedoe" />
        </div>
      </div>

      <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label className="pb-label">GitHub profile URL</label>
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
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="pb-label">Avatar image URL (optional)</label>
            <input className="pb-field" value={form.avatar_url} onChange={update("avatar_url")} placeholder="https://... (there's no automatic way to pull this from X)" />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 14 }}>
          <label className="pb-label">GitHub repository URL</label>
          <div style={{ display: "flex", gap: 8, marginBottom: form.repo ? 12 : 0 }}>
            <input
              className="pb-field"
              value={form.repo_url}
              onChange={update("repo_url")}
              placeholder="https://github.com/owner/repo"
            />
            <button
              type="button"
              className="pb-btn pb-btn-outline"
              onClick={handleFetchGithub}
              disabled={fetching || !form.repo_url}
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              <RefreshCw size={14} style={{ animation: fetching ? "pb-spin 1s linear infinite" : "none" }} />
              {fetching ? "Fetching…" : "Fetch"}
            </button>
          </div>
          {fetchError && (
            <div className="pb-mono" style={{ fontSize: 12, color: "var(--coral)", marginBottom: 12 }}>{fetchError}</div>
          )}
          {form.repo && (
            <div className="pb-mono pb-muted" style={{ fontSize: 12.5, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <span>repo: {form.repo}</span>
              <span>language: {form.language || "—"}</span>
              <span>★ {form.repo_stars || "0"}</span>
              <span>⑂ {form.forks || "0"}</span>
              {form.avatar_url && <span>avatar: fetched from GitHub ✓</span>}
            </div>
          )}
        </div>
      )}

      <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: isFounder ? "1fr 1fr" : "1fr", gap: 14, marginBottom: 20 }}>
        <div>
          <label className="pb-label">Total claimed (USD)</label>
          <input
            className="pb-field pb-no-spinner"
            type="number"
            min="0"
            step="0.01"
            value={form.claimed_usd}
            onChange={update("claimed_usd")}
          />
        </div>
        {isFounder && (
          <div>
            <label className="pb-label">Status</label>
            <select className="pb-field" value={form.status} onChange={update("status")}>
              <option value="queued">Queued</option>
              <option value="building">Building</option>
              <option value="trading">Trading</option>
            </select>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" className="pb-btn pb-btn-amber" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        <button type="button" className="pb-btn pb-btn-outline" onClick={onCancel} disabled={saving}>Cancel</button>
      </div>
    </form>
  );
}
