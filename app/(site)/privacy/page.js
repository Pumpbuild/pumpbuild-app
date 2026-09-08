import { LegalSection, LegalPageShell } from "@/components/Legal";

export const metadata = { title: "Privacy Policy — PumpBuild" };

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy" updated="September 2026">
      <LegalSection number={1} title="Introduction">
        <p>
          This Privacy Policy explains what information PumpBuild ("we," "our," or "us") collects from developers,
          startup founders, and visitors, and how that information is used. By using PumpBuild, you agree to the
          practices described here.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Information We Collect">
        <p style={{ marginBottom: 10 }}>Depending on how you use PumpBuild, we may collect:</p>
        <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          <li><strong style={{ color: "var(--ink)" }}>GitHub profile data:</strong> public username, avatar, repositories, and contribution history, for developers who connect a GitHub account.</li>
          <li><strong style={{ color: "var(--ink)" }}>Company and product information:</strong> company name, product links, and pitch details, for founders applying to or listed on PumpBuild.</li>
          <li><strong style={{ color: "var(--ink)" }}>Solana wallet addresses:</strong> used to route trading fees to the correct builder.</li>
          <li><strong style={{ color: "var(--ink)" }}>Application details:</strong> name, contact information, and anything else voluntarily submitted through our application form.</li>
          <li><strong style={{ color: "var(--ink)" }}>Usage data:</strong> basic, non-identifying analytics about how the site is used.</li>
        </ul>
      </LegalSection>

      <LegalSection number={3} title="Blockchain Transactions">
        <p>
          Token launches, trading fees, and fee claims happen on the Solana blockchain. Blockchain transactions are
          public and permanent by design. PumpBuild does not control, store, or have access to your private keys or
          funds.
        </p>
      </LegalSection>

      <LegalSection number={4} title="How We Use Information">
        <p>
          We use the information above to verify applicants, build and maintain builder profiles, route trading fees
          correctly, respond to inquiries, and operate and improve the platform. We do not use your information to
          make investment decisions on your behalf or on behalf of anyone else.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Data Sharing">
        <p>
          We do not sell or rent personal information. Public profile data shown on PumpBuild (GitHub activity,
          company/product details) is sourced from information that is already public or that you provided for the
          purpose of being listed. We may share limited information with service providers strictly necessary to
          operate the platform (for example, hosting).
        </p>
      </LegalSection>

      <LegalSection number={6} title="Data Retention">
        <p>
          We retain profile and application information for as long as your profile is active on PumpBuild, or as
          needed to comply with legal obligations. You can request removal of your profile at any time by contacting
          us below.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with a new
          "Last updated" date.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Contact">
        <p>
          Questions about this policy, or requests to update or remove your information, can be sent to{" "}
          <a href="mailto:pumpbuild@proton.me" style={{ color: "var(--amber-deep)" }}>pumpbuild@proton.me</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
