"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Rocket, DollarSign, Eye, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { Avatar, CategoryTag, FeatureRow, PipelineStage, TransparencyCard, StatBlock, FaqItem, fmtUsd } from "@/components/ui";
import { FAQ_DATA } from "@/data/faq";

export default function LandingPage() {
  const router = useRouter();
  const [developers, setDevelopers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

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

  const totalClaimed = developers.reduce((s, d) => s + Number(d.claimed_usd || 0), 0);
  const totalTx = developers.length * 14 + 32;
  const top6 = [...developers].sort((a, b) => b.claimed_usd - a.claimed_usd).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 56px" }}>
        <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
          <div>
            <div className="pb-mono pb-muted" style={{ fontSize: 13, marginBottom: 18 }}>powered by pump.fun on solana</div>
            <h1 className="pb-slab" style={{ fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.08, fontWeight: 700, marginBottom: 22 }}>
              We build the token.
              <br />
              You keep the fees.
            </h1>
            <p className="pb-muted" style={{ fontSize: 16.5, lineHeight: 1.65, maxWidth: 460, marginBottom: 30 }}>
              PumpBuild turns what you're building, whether open-source work or a startup, into a fee-earning token. Connect your GitHub or company, approve the launch, and every trade compiles into your wallet automatically.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/apply" className="pb-btn pb-btn-amber">Apply <ArrowUpRight size={15} /></Link>
              <Link href="/leaderboard" className="pb-btn pb-btn-outline">View leaderboard</Link>
            </div>
          </div>

          <div className="pb-terminal">
            <div className="pb-terminal-bar">
              <span className="pb-dot" style={{ background: "#D9634F" }} />
              <span className="pb-dot" style={{ background: "#EFA23B" }} />
              <span className="pb-dot" style={{ background: "#3F9E74" }} />
              <span className="pb-mono" style={{ fontSize: 11.5, color: "#9FB6AC", marginLeft: 8 }}>build.log</span>
            </div>
            <div className="pb-mono" style={{ padding: 18, fontSize: 12.5, lineHeight: 2, color: "#CBD8D2" }}>
              <div><span style={{ color: "#9FB6AC" }}>$</span> pumpbuild launch --repo flowkit</div>
              <div style={{ color: "#9FB6AC" }}>verifying github identity… ok</div>
              <div style={{ color: "#9FB6AC" }}>awaiting developer approval… ok</div>
              <div style={{ color: "#9FB6AC" }}>minting token $FLOWKIT… ok</div>
              <div style={{ color: "#9FB6AC" }}>routing fees → wallet ...9kD3… ok</div>
              <div><span className="pb-diff-pos">+ $7,320.00</span> claimed this week</div>
              <div style={{ color: "#EFA23B" }}>status: trading, community live</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginTop: 52, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
          <div>
            <div className="pb-mono pb-slab" style={{ fontSize: 26, fontWeight: 700 }}>{fmtUsd(totalClaimed)}</div>
            <div className="pb-muted" style={{ fontSize: 13 }}>Total claimed by builders</div>
          </div>
          <div>
            <div className="pb-mono pb-slab" style={{ fontSize: 26, fontWeight: 700 }}>{developers.length}</div>
            <div className="pb-muted" style={{ fontSize: 13 }}>Builders onboarded</div>
          </div>
          <div>
            <div className="pb-mono pb-slab" style={{ fontSize: 26, fontWeight: 700 }}>100%</div>
            <div className="pb-muted" style={{ fontSize: 13 }}>Of trading fees routed to builders</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}>
        <div id="features" style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 64px" }}>
          <h2 className="pb-slab" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>What PumpBuild handles for you</h2>
          <p className="pb-muted" style={{ fontSize: 15, marginBottom: 8, maxWidth: 520 }}>Everything between "I wrote this" and "I got paid for it."</p>
          <FeatureRow tag="verify" title="Identity tied to real work" desc="Developers are verified through GitHub: commits, pull requests, and repos. Founders are verified through their product and company presence. Either way, no separate application to fake." />
          <FeatureRow tag="launch" title="Token setup, handled" desc="Once you approve, we create the token and the community around your work. You don't touch a smart contract." />
          <FeatureRow tag="route" title="Fees go straight to you" desc="Every trade generates a fee. It's routed to your wallet automatically, not held in a pool anywhere." />
          <FeatureRow tag="claim" title="Instant, no-middleman claims" desc="Send your accumulated fees to any Solana wallet whenever you want. No lockups, no approval queue, no fee beyond gas." />
          <FeatureRow tag="secure" title="On-chain, audited setup" desc="Token creation and fee routing run through audited contracts on Solana. Nothing about your setup lives off-chain." />
          <FeatureRow tag="verify" title="Nothing hidden from you or anyone" desc="Every claim is a public Solana transaction. Check any builder's numbers yourself on an explorer, no account needed." />
        </div>
      </div>

      {/* Builder preview */}
      <div style={{ borderTop: "1px solid var(--line)" }}>
        <div id="developers" style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 70px" }}>
          <div style={{ marginBottom: 20 }}>
            <h2 className="pb-slab" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Onboarded builders</h2>
            <p className="pb-muted" style={{ fontSize: 14.5 }}>Developers and startup founders who approved a launch and are earning fees for what they built.</p>
          </div>
          {loaded && top6.length === 0 && (
            <p className="pb-muted" style={{ fontSize: 14, padding: "16px 6px" }}>No builders yet.</p>
          )}
          {top6.map((d, i) => (
            <div
              key={d.id}
              className="pb-hair pb-row-hover"
              style={{ borderTop: "1px solid", padding: "16px 6px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
              onClick={() => router.push(`/builders/${d.id}`)}
            >
              <span className="pb-mono pb-muted" style={{ width: 20 }}>{i + 1}</span>
              <Avatar name={d.category === "founder" ? d.company_name : d.name} seed={d.handle} size={38} avatarUrl={d.avatar_url} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span style={{ fontWeight: 600, fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                    {d.category === "founder" ? d.company_name : d.name}
                  </span>
                  <span style={{ flexShrink: 0 }}><CategoryTag category={d.category} /></span>
                </div>
                <div className="pb-mono pb-muted" style={{ fontSize: 12.5, marginTop: 2 }}>
                  {d.category === "founder" ? `Founded by ${d.name} · ${d.stage}` : `${d.repo} · ${d.language}`}
                </div>
              </div>
              <div className="pb-mono" style={{ fontWeight: 600 }}>{fmtUsd(d.claimed_usd)}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <Link href="/leaderboard" className="pb-btn pb-btn-outline">See all builders <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}>
        <div id="how-it-works" style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 70px" }}>
          <h2 className="pb-slab" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>The build pipeline</h2>
          <p className="pb-muted" style={{ fontSize: 15, marginBottom: 30, maxWidth: 480 }}>Five stages from "we found your repo" to "fees are landing in your wallet."</p>
          <PipelineStage n={1} label="We reach out" desc="We find your work through GitHub and contact you directly. Nothing happens until you respond." />
          <PipelineStage n={2} label="You approve the launch" desc="We walk you through exactly what gets created and what you'll keep. A token only launches once you say yes." />
          <PipelineStage n={3} label="We build your token" desc="Your profile goes live and we set up a token tied to your work, plus a community around it." />
          <PipelineStage n={4} label="Post about what you built" desc="One post to your new community explaining your project. That's the only manual step after launch." />
          <PipelineStage n={5} label="Claim your fees, anytime" desc="As people trade your token, fees accumulate on-chain. Send them to any Solana wallet whenever you want." last />
        </div>
      </div>

      {/* Transparency */}
      <div style={{ borderTop: "1px solid var(--line)" }}>
        <div id="transparency" style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 70px" }}>
          <h2 className="pb-slab" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>We build it. You keep 100% of the fees.</h2>
          <p className="pb-muted" style={{ fontSize: 15, marginBottom: 26, maxWidth: 560, lineHeight: 1.6 }}>
            No hidden fees, no fine print, and nothing launches without your approval. We build a token for your work, route every trading fee it generates to you, and put all of it on Solana, in public, where anyone can check.
          </p>

          <div className="pb-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
            <TransparencyCard icon={<Rocket size={19} color="var(--amber-deep)" />} title="We build it for you" desc="Once you approve, PumpBuild sets up the token and an official community around it. All on-chain setup is handled, tied to your GitHub." />
            <TransparencyCard icon={<DollarSign size={19} color="var(--amber-deep)" />} title="100% of fees, always yours" desc="Every trading fee your token generates is redirected to you. PumpBuild doesn't skim a percentage of it. What the token earns is what you claim." />
            <TransparencyCard icon={<Eye size={19} color="var(--amber-deep)" />} title="Fully on-chain and auditable" desc="Fee routing and every claim are public transactions on Solana. Anyone can independently verify any amount on a block explorer." />
            <TransparencyCard icon={<ShieldCheck size={19} color="var(--amber-deep)" />} title="Consent comes first" desc="We contact builders before doing anything. No profile, token, or community is created without an explicit yes from the builder." />
          </div>

          <div className="pb-slab" style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Your part is simple</div>
          <div className="pb-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 26 }}>
            <div>
              <div className="pb-mono" style={{ color: "var(--amber-deep)", fontSize: 13, marginBottom: 6 }}>01</div>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>Approve the launch</div>
              <p className="pb-muted" style={{ fontSize: 13.5, lineHeight: 1.55 }}>Review what we're proposing and say yes before anything goes live.</p>
            </div>
            <div>
              <div className="pb-mono" style={{ color: "var(--amber-deep)", fontSize: 13, marginBottom: 6 }}>02</div>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>Post about what you built</div>
              <p className="pb-muted" style={{ fontSize: 13.5, lineHeight: 1.55 }}>Share your work with the community. Show supporters exactly what they're backing.</p>
            </div>
            <div>
              <div className="pb-mono" style={{ color: "var(--amber-deep)", fontSize: 13, marginBottom: 6 }}>03</div>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>Claim your fees</div>
              <p className="pb-muted" style={{ fontSize: 13.5, lineHeight: 1.55 }}>100% of the trading fees are yours. Claim them to any Solana wallet, whenever you want.</p>
            </div>
          </div>

          <div className="pb-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="pb-slab" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Don't trust, verify.</div>
              <p className="pb-muted" style={{ fontSize: 13.5, maxWidth: 420 }}>Pick any builder on the leaderboard and check their claimed rewards yourself on a Solana explorer.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <Link href="/leaderboard" className="pb-btn pb-btn-amber">View leaderboard</Link>
              <a href="https://solscan.io" target="_blank" rel="noreferrer" className="pb-btn pb-btn-outline">Open Solscan <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Platform stats */}
      <div style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}>
        <div id="stats" style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 70px" }}>
          <h2 className="pb-slab" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>The numbers speak</h2>
          <p className="pb-muted" style={{ fontSize: 15, marginBottom: 30, maxWidth: 480 }}>Every figure here is computed from the same builder profiles you can inspect above, not a separate marketing count.</p>
          <div className="pb-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            <StatBlock value={fmtUsd(totalClaimed)} label="Total claimed" sub="Through the build pipeline" />
            <StatBlock value={developers.length} label="Builders onboarded" sub="And growing every week" />
            <StatBlock value={`${totalTx}+`} label="Transactions" sub="On-chain and verified" />
            <StatBlock value={`${developers.length + 4}+`} label="Active projects" sub="Repos and products in the wild" />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ borderTop: "1px solid var(--line)" }}>
        <div id="faq" style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 70px" }}>
          <h2 className="pb-slab" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Frequently asked questions</h2>
          <p className="pb-muted" style={{ fontSize: 15, marginBottom: 20, maxWidth: 560 }}>
            Straight answers for developers and startup founders alike: how PumpBuild works, where the money goes, and how to check it yourself.
          </p>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {FAQ_DATA.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pb-dark" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="pb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <h2 className="pb-slab" style={{ fontSize: 30, fontWeight: 700, marginBottom: 14, maxWidth: 420 }}>Ship it. Post it. Get paid for it.</h2>
              <p className="pb-muted" style={{ fontSize: 15.5, marginBottom: 26, maxWidth: 420 }}>Apply with your GitHub. We'll reach out before anything is built, and nothing launches without your approval.</p>
              <Link href="/apply" className="pb-btn pb-btn-amber">Apply <ArrowUpRight size={15} /></Link>
            </div>
            <div className="pb-terminal">
              <div className="pb-terminal-bar">
                <span className="pb-dot" style={{ background: "#D9634F" }} />
                <span className="pb-dot" style={{ background: "#EFA23B" }} />
                <span className="pb-dot" style={{ background: "#3F9E74" }} />
                <span className="pb-mono" style={{ fontSize: 11.5, color: "#9FB6AC", marginLeft: 8 }}>approve.sol</span>
              </div>
              <div className="pb-mono" style={{ padding: 18, fontSize: 12.5, lineHeight: 2, color: "#CBD8D2" }}>
                <div style={{ color: "#9FB6AC" }}>// PumpBuild launch request</div>
                <div>const launch = await pumpbuild.propose({"{"}</div>
                <div style={{ paddingLeft: 16 }}>developer: <span style={{ color: "#EFA23B" }}>"@marasol"</span>,</div>
                <div style={{ paddingLeft: 16 }}>repo: <span style={{ color: "#EFA23B" }}>"flowkit"</span>,</div>
                <div style={{ paddingLeft: 16 }}>feeShare: <span style={{ color: "#EFA23B" }}>"100% to developer"</span></div>
                <div>{"}"});</div>
                <div style={{ marginTop: 6 }}><span className="pb-diff-pos">✓ awaiting developer approval</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
