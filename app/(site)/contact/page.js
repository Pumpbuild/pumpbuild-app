import { Mail } from "lucide-react";
import { XIcon, TelegramIcon } from "@/components/icons";

export const metadata = { title: "Contact — PumpBuild" };

function ContactChannel({ icon, label, description, linkLabel, href }) {
  return (
    <div className="pb-box">
      <div style={{ marginBottom: 14 }}>{icon}</div>
      <div className="pb-slab" style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <p className="pb-muted" style={{ fontSize: 13.5, lineHeight: 1.6, marginBottom: 12 }}>{description}</p>
      <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="pb-mono" style={{ fontSize: 13, color: "var(--amber-deep)", textDecoration: "none" }}>
        {linkLabel}
      </a>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>
      <h1 className="pb-slab" style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Contact Us</h1>
      <p className="pb-muted" style={{ fontSize: 15.5, marginBottom: 40 }}>We'd love to hear from you.</p>

      <h2 className="pb-slab" style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Get in Touch</h2>
      <p className="pb-muted" style={{ fontSize: 14.5, lineHeight: 1.65, marginBottom: 28, maxWidth: 560 }}>
        Have questions, feedback, or want to get your project listed on PumpBuild? Reach out through any of the channels below.
      </p>

      <div className="pb-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <ContactChannel
          icon={<Mail size={19} color="var(--amber-deep)" />}
          label="Email"
          description="For general inquiries, applications, and support."
          linkLabel="pumpbuild@proton.me"
          href="mailto:pumpbuild@proton.me"
        />
        <ContactChannel
          icon={<XIcon size={19} color="var(--amber-deep)" />}
          label="X"
          description="Follow along for updates, launches, and announcements."
          linkLabel="Follow on X"
          href="#"
        />
        <ContactChannel
          icon={<TelegramIcon size={19} color="var(--amber-deep)" />}
          label="Telegram"
          description="Follow the channel for updates, launches, and announcements."
          linkLabel="Join the channel"
          href="#"
        />
      </div>
    </div>
  );
}
