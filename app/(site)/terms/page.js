import { LegalSection, LegalPageShell } from "@/components/Legal";

export const metadata = { title: "Terms of Service — PumpBuild" };

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service" updated="September 2026">
      <LegalSection number={1} title="Acceptance of Terms">
        <p>
          By accessing or using PumpBuild, you agree to be bound by these Terms of Service. If you do not agree,
          please do not use the platform.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Platform Description">
        <p>
          PumpBuild builds and manages fee-earning tokens on Solana, via pump.fun, on behalf of developers shipping
          open-source work and startup founders building a product. PumpBuild sets up the token and community; 100%
          of the trading fees the token generates are routed to the builder. PumpBuild's own revenue is separate and
          does not come out of those fees, as described in Section 5.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Eligibility">
        <p>
          You must be at least 18 years old to use PumpBuild, whether as a listed builder or as someone interacting
          with a builder's token. By using the platform, you confirm you meet this requirement and have the legal
          capacity to enter into these terms.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Consent and Onboarding">
        <p>
          PumpBuild does not create a profile, launch a token, or build a community for anyone without that person's
          explicit approval first. If you're contacted about being listed on PumpBuild, nothing is built until you
          say yes, and you may request your profile be taken down at any time after launch.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Fees and Transactions">
        <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          <li>100% of the trading fees a builder's token generates belong to that builder. PumpBuild does not deduct, withhold, or take a percentage of these fees.</li>
          <li>All token transactions happen on the Solana blockchain and are final. PumpBuild does not custody funds.</li>
          <li>Anyone interacting with a builder's token is solely responsible for verifying wallet addresses and understanding the risk before trading.</li>
        </ul>
      </LegalSection>

      <LegalSection number={6} title="Not Investment, Not Equity">
        <p>
          Tokens created through PumpBuild, including tokens tied to a startup founder, do not represent equity,
          ownership, a security, or any investment in a person, project, or company. Buying, holding, or trading a
          token is speculative and does not entitle the holder to any share of a company's profits, assets, or
          decision-making. Founders and developers do not receive funding through a sale of these tokens; they
          receive a share of the trading fees the token generates once it is live.
        </p>
      </LegalSection>

      <LegalSection number={7} title="User Conduct">
        <p style={{ marginBottom: 10 }}>You agree not to:</p>
        <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          <li>Use PumpBuild for any unlawful purpose.</li>
          <li>Attempt to manipulate the leaderboard, claimed totals, or trading activity.</li>
          <li>Impersonate a builder or submit a fraudulent application on someone else's behalf.</li>
          <li>Interfere with the platform's security or normal operation.</li>
        </ul>
      </LegalSection>

      <LegalSection number={8} title="Intellectual Property">
        <p>
          The PumpBuild name, logo, and site design belong to PumpBuild. Developer and founder profile content
          (GitHub activity, company details, bios) remains the property of the respective builder.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Disclaimer of Warranties">
        <p>
          PumpBuild is provided "as is," without warranties of any kind. We do not guarantee the accuracy of any
          profile, claimed amount, or blockchain data displayed on the platform, and we do not guarantee any level
          of earnings for developers or founders. Use the platform at your own risk.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, PumpBuild is not liable for any direct, indirect, incidental, or
          consequential damages arising from use of the platform, including loss of funds from blockchain
          transactions or trading activity.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of PumpBuild after a change is posted means
          you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Contact">
        <p>
          Questions about these Terms can be sent to{" "}
          <a href="mailto:pumpbuild@proton.me" style={{ color: "var(--amber-deep)" }}>pumpbuild@proton.me</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
