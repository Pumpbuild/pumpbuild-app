"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { TopThreeCard, DeveloperCard } from "@/components/ui";

const LEADERBOARD_PAGE_SIZE = 6;

export default function LeaderboardPage() {
  const router = useRouter();
  const [developers, setDevelopers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | developer | founder
  const [visibleCount, setVisibleCount] = useState(LEADERBOARD_PAGE_SIZE);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("builders")
      .select("*")
      .then(({ data, error }) => {
        if (!error && data) setDevelopers(data);
        setLoaded(true);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return [...developers]
      .filter((d) => filter === "all" || d.category === filter)
      .filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.repo && d.repo.toLowerCase().includes(q)) ||
          (d.company_name && d.company_name.toLowerCase().includes(q))
      )
      .sort((a, b) => b.claimed_usd - a.claimed_usd);
  }, [developers, query, filter]);

  useEffect(() => {
    setVisibleCount(LEADERBOARD_PAGE_SIZE);
  }, [query, filter]);

  const topThree = filtered.slice(0, 3);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const tabs = [
    { id: "all", label: "All" },
    { id: "developer", label: "Developers" },
    { id: "founder", label: "Startups" },
  ];

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px 70px" }}>
      <h1 className="pb-slab" style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Leaderboard</h1>
      <p className="pb-muted" style={{ fontSize: 15, marginBottom: 28, maxWidth: 520 }}>
        Ranked by total fees claimed on-chain, from developers shipping open-source work to founders building products. Every number comes straight from each builder's own record.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className="pb-mono"
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: `1px solid ${filter === t.id ? "var(--ink)" : "var(--line)"}`,
                background: filter === t.id ? "var(--ink)" : "transparent",
                color: filter === t.id ? "var(--paper)" : "var(--muted)",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", maxWidth: 300, width: "100%" }}>
          <Search size={15} color="var(--muted)" style={{ position: "absolute", left: 12, top: 13 }} />
          <input
            className="pb-field"
            style={{ paddingLeft: 34 }}
            placeholder="Search by name, repo, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {topThree.length > 0 && (
        <div className="pb-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 }}>
          {topThree.map((d, i) => (
            <TopThreeCard key={d.id} dev={d} rank={i + 1} onClick={() => router.push(`/builders/${d.id}`)} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h2 className="pb-slab" style={{ fontSize: 19, fontWeight: 600 }}>Full leaderboard</h2>
          <p className="pb-muted" style={{ fontSize: 13.5, marginTop: 2 }}>
            Showing {visible.length} of {filtered.length} builder{filtered.length === 1 ? "" : "s"}.
          </p>
        </div>
      )}

      <div className="pb-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {visible.map((d, i) => (
          <DeveloperCard key={d.id} dev={d} rank={i + 1} onClick={() => router.push(`/builders/${d.id}`)} />
        ))}
      </div>

      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <button className="pb-btn pb-btn-outline" onClick={() => setVisibleCount((c) => c + LEADERBOARD_PAGE_SIZE)}>
            Load more builders
          </button>
        </div>
      )}

      {loaded && filtered.length === 0 && (
        <div className="pb-muted" style={{ padding: "30px 8px", fontSize: 14 }}>
          No builders match this search.
        </div>
      )}
    </div>
  );
}
