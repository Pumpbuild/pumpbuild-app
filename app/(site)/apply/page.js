"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

export default function ApplyPage() {
  const [form, setForm] = useState({ category: "developer", name: "", github: "", website: "", wallet: "", pitch: "" });
  const [status, setStatus] = useState("idle"); // idle | saving | done | error
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isDeveloper = form.category === "developer";

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.pitch) return;
    if (isDeveloper && !form.github) return;
    setStatus("saving");
    const supabase = createClient();
    const { error } = await supabase.from("applications").insert({
      category: form.category,
      name: form.name,
      github: form.github || null,
      website: form.website || null,
      wallet: form.wallet || null,
      pitch: form.pitch,
    });
    setStatus(error ? "error" : "done");
  };

  if (status === "done") {
    return (
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "80px 24px", textAlign: "left" }}>
        <CheckCircle2 size={30} color="var(--green)" style={{ marginBottom: 16 }} />
        <h1 className="pb-slab" style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Application received</h1>
        <p className="pb-muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
          We'll review what you shared and reach out directly if PumpBuild looks like a fit. Nothing gets built or launched before we've talked to you and you've said yes.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "56px 24px 80px" }}>
      <h1 className="pb-slab" style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Apply</h1>
      <p className="pb-muted" style={{ fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
        For developers shipping open-source work, and for startup founders building something people can back. We'll verify what you share and reach out before anything is built. Nothing goes live without your explicit approval.
      </p>

      <div style={{ marginBottom: 26 }}>
        <label className="pb-label">I'm applying as a</label>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { id: "developer", label: "Developer" },
            { id: "founder", label: "Startup founder" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setForm({ ...form, category: opt.id })}
              className="pb-mono"
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 4,
                border: `1px solid ${form.category === opt.id ? "var(--amber-deep)" : "var(--line)"}`,
                background: form.category === opt.id ? "var(--amber)" : "transparent",
                color: form.category === opt.id ? "#1B1204" : "var(--ink)",
                fontSize: 13.5,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={submit}>
        <div style={{ marginBottom: 18 }}>
          <label className="pb-label">Full name</label>
          <input className="pb-field" value={form.name} onChange={update("name")} required />
        </div>

        {isDeveloper ? (
          <div style={{ marginBottom: 18 }}>
            <label className="pb-label">GitHub profile URL</label>
            <input className="pb-field" value={form.github} onChange={update("github")} placeholder="https://github.com/yourhandle" required />
          </div>
        ) : (
          <div style={{ marginBottom: 18 }}>
            <label className="pb-label">Startup or project website (optional)</label>
            <input className="pb-field" value={form.website} onChange={update("website")} placeholder="https://yourstartup.com" />
          </div>
        )}

        <div style={{ marginBottom: 18 }}>
          <label className="pb-label">Solana wallet address (optional for now)</label>
          <input className="pb-field" value={form.wallet} onChange={update("wallet")} placeholder="Leave blank if you don't have one yet" />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label className="pb-label">{isDeveloper ? "What have you built?" : "What are you building?"}</label>
          <textarea
            className="pb-field"
            rows={4}
            value={form.pitch}
            onChange={update("pitch")}
            placeholder={isDeveloper ? "A repo, a tool, or a library: whatever you want us to look at first." : "A short pitch: what the startup does, who it's for, and what stage you're at."}
            style={{ resize: "vertical", fontFamily: "inherit" }}
            required
          />
        </div>

        {status === "error" && (
          <div className="pb-mono" style={{ fontSize: 12.5, color: "var(--coral)", marginBottom: 14 }}>
            Something went wrong submitting your application. Please try again.
          </div>
        )}

        <button type="submit" className="pb-btn pb-btn-amber" disabled={status === "saving"}>
          {status === "saving" ? "Submitting…" : "Submit application"}
        </button>
      </form>
    </div>
  );
}
