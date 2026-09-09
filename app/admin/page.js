"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, TerminalSquare } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { Avatar, CategoryTag, fmtUsd } from "@/components/ui";
import BuilderForm from "@/components/BuilderForm";

export default function AdminPage() {
  const router = useRouter();
  const [developers, setDevelopers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState("list"); // list | new | edit
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("builders").select("*");
    if (!error && data) setDevelopers(data);
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  const sorted = [...developers].sort((a, b) => b.claimed_usd - a.claimed_usd);
  const editingBuilder = editingId ? developers.find((d) => d.id === editingId) : null;

  const idFor = (data) => {
    const base = (data.category === "founder" ? data.company_name : data.name) || "builder";
    const slug = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `${slug}-${Math.random().toString(36).slice(2, 7)}`;
  };

  const handleSave = async (data) => {
    const supabase = createClient();
    if (mode === "edit" && editingId) {
      await supabase.from("builders").update(data).eq("id", editingId);
    } else {
      await supabase.from("builders").insert({ ...data, id: idFor(data) });
    }
    setMode("list");
    setEditingId(null);
    await load();
  };

  const handleDelete = async (d) => {
    const label = d.category === "founder" ? d.company_name : d.name;
    if (!window.confirm(`Remove ${label} from the leaderboard? This can't be undone.`)) return;
    const supabase = createClient();
    await supabase.from("builders").delete().eq("id", d.id);
    await load();
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div>
      <div style={{ borderBottom: "1px solid var(--line)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <TerminalSquare size={18} color="var(--ink)" />
            <span className="pb-slab" style={{ fontSize: 15, fontWeight: 700 }}>PumpBuild Admin</span>
          </div>
          <button className="pb-nav-link" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 70px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 12 }}>
          <h1 className="pb-slab" style={{ fontSize: 30, fontWeight: 700 }}>Manage builders</h1>
          {mode === "list" && (
            <button className="pb-btn pb-btn-amber" onClick={() => { setMode("new"); setEditingId(null); }}>
              <Plus size={15} /> Add builder
            </button>
          )}
        </div>
        <p className="pb-muted" style={{ fontSize: 14.5, marginBottom: 28 }}>
          Add, edit, or remove developer and startup profiles. The leaderboard re-sorts automatically whenever a total claimed amount changes.
        </p>

        {mode !== "list" && (
          <BuilderForm
            initial={mode === "edit" ? editingBuilder : null}
            onSave={handleSave}
            onCancel={() => { setMode("list"); setEditingId(null); }}
          />
        )}

        {mode === "list" && (
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {sorted.map((d) => (
              <div key={d.id} className="pb-hair" style={{ borderBottom: "1px solid", padding: "14px 4px", display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar name={d.category === "founder" ? d.company_name : d.name} seed={d.handle} size={40} avatarUrl={d.avatar_url} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, fontSize: 14.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {d.category === "founder" ? d.company_name : d.name}
                    </span>
                    <CategoryTag category={d.category} />
                  </div>
                  <div className="pb-mono pb-muted" style={{ fontSize: 12, marginTop: 2 }}>{fmtUsd(d.claimed_usd)} claimed</div>
                </div>
                <button className="pb-btn pb-btn-outline" style={{ padding: "7px 12px", fontSize: 12.5 }} onClick={() => { setMode("edit"); setEditingId(d.id); }}>
                  Edit
                </button>
                <button
                  className="pb-btn"
                  style={{ padding: "7px 12px", fontSize: 12.5, border: "1px solid var(--coral)", color: "var(--coral)" }}
                  onClick={() => handleDelete(d)}
                >
                  Delete
                </button>
              </div>
            ))}
            {loaded && sorted.length === 0 && (
              <div className="pb-muted" style={{ padding: "30px 4px", fontSize: 14 }}>No builders yet. Add the first one above.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
