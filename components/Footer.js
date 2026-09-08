import Link from "next/link";
import { Mail, TerminalSquare } from "lucide-react";
import { XIcon, TelegramIcon } from "./icons";

export default function Footer() {
  return (
    <div className="pb-dark" style={{ padding: "48px 24px 28px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32 }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <TerminalSquare size={20} color="#EAF1EC" />
              <span className="pb-slab" style={{ fontSize: 18, fontWeight: 700 }}>PumpBuild</span>
            </div>
            <p className="pb-muted" style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
              We build the token. You ship the code. Every fee compiles straight to your wallet, on Solana.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <a href="mailto:pumpbuild@proton.me" aria-label="Email PumpBuild" style={iconBtnStyle}>
                <Mail size={15} />
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="PumpBuild on X" style={iconBtnStyle}>
                <XIcon size={14} />
              </a>
              <a href="#" target="_blank" rel="noreferrer" aria-label="PumpBuild on Telegram" style={iconBtnStyle}>
                <TelegramIcon size={14} />
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            <div>
              <div className="pb-mono pb-muted" style={{ fontSize: 12, marginBottom: 12 }}>Platform</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/" className="pb-nav-link" style={{ color: "#CBD8D2" }}>Home</Link>
                <Link href="/leaderboard" className="pb-nav-link" style={{ color: "#CBD8D2" }}>Leaderboard</Link>
                <Link href="/#faq" className="pb-nav-link" style={{ color: "#CBD8D2" }}>FAQ</Link>
                <Link href="/apply" className="pb-nav-link" style={{ color: "#CBD8D2" }}>Apply</Link>
              </div>
            </div>
            <div>
              <div className="pb-mono pb-muted" style={{ fontSize: 12, marginBottom: 12 }}>Legal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/privacy" className="pb-nav-link" style={{ color: "#CBD8D2" }}>Privacy</Link>
                <Link href="/terms" className="pb-nav-link" style={{ color: "#CBD8D2" }}>Terms</Link>
                <Link href="/contact" className="pb-nav-link" style={{ color: "#CBD8D2" }}>Contact</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-hair-dark" style={{ borderTop: "1px solid", marginTop: 36, paddingTop: 18 }}>
          <span className="pb-mono pb-muted" style={{ fontSize: 12 }}>
            © 2026 PumpBuild. Built on Solana. Powered by PumpFun.
          </span>
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  borderRadius: "50%",
  border: "1px solid var(--line-dark)",
  color: "#CBD8D2",
};
