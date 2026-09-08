"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TerminalSquare } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <form onSubmit={submit} className="pb-box" style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 22 }}>
          <TerminalSquare size={20} color="var(--ink)" />
          <span className="pb-slab" style={{ fontSize: 18, fontWeight: 700 }}>PumpBuild Admin</span>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="pb-label">Email</label>
          <input className="pb-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label className="pb-label">Password</label>
          <input className="pb-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="pb-mono" style={{ fontSize: 12.5, color: "var(--coral)", marginBottom: 14 }}>{error}</div>}
        <button type="submit" className="pb-btn pb-btn-amber" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
