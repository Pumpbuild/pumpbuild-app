"use client";

import { useEffect, useState, use as usePromise } from "react";
import Link from "next/link";
import { Github, Building2, GitCommit } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { XIcon } from "@/components/icons";
import { Avatar, StatusPill, fmtUsd } from "@/components/ui";

export default function ProfilePage({ params }) {
  const { id } = usePromise(params);
  const [developer, setDeveloper] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("builders")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setDeveloper(data || null);
        setLoaded(true);
      });
  }, [id]);

  if (loaded && !developer) {
    return (
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "60px 24px" }}>
        <p className="pb-muted">Builder not found.</p>
        <Link href="/leaderboard" className="pb-nav-link">← Back to leaderboard</Link>
      </div>
    );
  }

  if (!developer) {
    return <div style={{ padding: "80px 24px", textAlign: "center" }} className="pb-muted pb-mono">loading…</div>;
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 70px" }}>
      <Link href="/leaderboard" className="pb-nav-link" style={{ display: "inline-block", marginBottom: 22 }}>
        ← Back to leaderboard
      </Link>

      <div style={{ display: "flex", gap: 22, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <Avatar name={developer.category === "founder" ? developer.company_name : developer.name} seed={developer.handle} size={72} radius={8} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 className="pb-slab" style={{ fontSize: 28, fontWeight: 700 }}>{developer.name}</h1>
            <StatusPill status={developer.status} />
          </div>
          {developer.category === "founder" && (
            <div className="pb-mono pb-muted" style={{ fontSize: 13, marginTop: 2 }}>{developer.company_name} · {developer.stage}</div>
          )}
          <p className="pb-muted" style={{ fontSize: 14.5, marginTop: 4 }}>{developer.bio}</p>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {developer.github && (
              <a href={developer.github} target="_blank" rel="noreferrer" className="pb-nav-link" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Github size={14} /> @{developer.handle}
              </a>
            )}
            {developer.twitter && (
              <a href={developer.twitter} target="_blank" rel="noreferrer" className="pb-nav-link" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <XIcon size={13} /> {developer.handle}
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <div className="pb-mono pb-muted" style={{ fontSize: 12, marginBottom: 6 }}>total claimed</div>
        <div className="pb-slab pb-mono" style={{ fontSize: 34, fontWeight: 700, marginBottom: 26 }}>{fmtUsd(developer.claimed_usd)}</div>

        <div className="pb-mono pb-muted" style={{ fontSize: 12, marginBottom: 10 }}>
          {developer.category === "founder" ? "company" : "project"}
        </div>
        {developer.category === "founder" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Building2 size={16} />
            {developer.product_url ? (
              <a href={developer.product_url} target="_blank" rel="noreferrer" style={{ fontWeight: 600, fontSize: 15 }}>{developer.company_name}</a>
            ) : (
              <span style={{ fontWeight: 600, fontSize: 15 }}>{developer.company_name}</span>
            )}
            <span className="pb-mono pb-muted" style={{ fontSize: 12.5 }}>{developer.stage}</span>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <GitCommit size={16} />
            <a href={`https://github.com/${developer.handle}/${developer.repo}`} target="_blank" rel="noreferrer" style={{ fontWeight: 600, fontSize: 15 }}>{developer.repo}</a>
            <span className="pb-mono pb-muted" style={{ fontSize: 12.5 }}>{developer.repo_stars} stars · {developer.language}</span>
          </div>
        )}
      </div>
    </div>
  );
}
