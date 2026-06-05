import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for AxeDz — Algeria's messaging platform for SMS, email, and API-based communication.",
};

const sections = [
  {
    title: "1. Acceptance of terms",
    content: (
      <>
        <p>
          By creating an account, accessing the AxeDz dashboard, or using our
          API, you agree to these Terms of Service. If you do not agree, please
          do not use our services.
        </p>
        <p>
          These terms apply to all users, including individuals, businesses, and
          organizations that send SMS, email, or other messages through AxeDz.
        </p>
      </>
    ),
  },
  {
    title: "2. About our service",
    content: (
      <>
        <p>
          AxeDz provides a cloud communication platform that lets you send SMS
          and transactional email to your customers in Algeria. Services are
          delivered through our dashboard and REST API, with billing handled via
          a prepaid wallet in Algerian Dinars (DZD).
        </p>
        <p>
          We offer a free sandbox mode for testing and a production mode for
          live message delivery. Features, pricing, and availability may change
          over time. We will make reasonable efforts to notify you of material
          changes.
        </p>
      </>
    ),
  },
  {
    title: "3. Your account",
    content: (
      <>
        <p>
          You must provide accurate information when registering and keep your
          account details up to date. You are responsible for all activity under
          your account, including actions taken with your API keys.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You must be at least 18 years old or have legal authority to enter
            this agreement
          </li>
          <li>You must verify your email or phone number as requested</li>
          <li>
            You must not share your login credentials or API keys publicly
          </li>
          <li>
            You must notify us immediately if you suspect unauthorized access
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Acceptable use",
    content: (
      <>
        <p>
          You agree to use AxeDz only for lawful purposes. You must not use our
          platform to:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Send spam, unsolicited bulk messages, or fraudulent content</li>
          <li>Harass, threaten, or impersonate others</li>
          <li>
            Send messages containing malware, phishing links, or illegal
            material
          </li>
          <li>
            Violate telecommunications regulations or recipient consent
            requirements
          </li>
          <li>
            Attempt to bypass rate limits, security controls, or billing systems
          </li>
          <li>
            Reverse engineer, scrape, or abuse the API in ways that harm the
            platform
          </li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these rules, with or without notice depending on severity.
        </p>
      </>
    ),
  },
  {
    title: "5. Wallet, billing & payments",
    content: (
      <>
        <p>
          AxeDz uses a prepaid wallet model. You top up your balance through
          SATIM or other supported payment methods. Message costs are deducted
          automatically when you send in production mode.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            All prices are displayed in Algerian Dinars (DZD) unless stated
            otherwise
          </li>
          <li>Sandbox mode is free and does not charge your wallet</li>
          <li>
            If your balance is insufficient, production requests will be
            rejected
          </li>
          <li>
            Wallet top-ups are generally non-refundable except where required by
            law
          </li>
          <li>
            You are responsible for any applicable taxes on your purchases
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Message delivery",
    content: (
      <>
        <p>
          We strive to deliver messages reliably, but delivery depends on
          third-party carriers, email providers, and recipient devices. We do
          not guarantee that every message will be delivered, read, or delivered
          within a specific timeframe.
        </p>
        <p>
          You are responsible for the content of messages you send and for
          obtaining proper consent from recipients where required by law,
          including opt-in for marketing communications.
        </p>
      </>
    ),
  },
  {
    title: "7. API keys & security",
    content: (
      <>
        <p>
          API keys authenticate your requests and are linked to your wallet.
          Treat them as secrets. Do not embed keys in client-side code, public
          repositories, or mobile apps where they can be extracted.
        </p>
        <p>
          You may create, rotate, and revoke keys from your dashboard at any
          time. Revoked keys stop working immediately. We are not liable for
          charges incurred through compromised keys before you revoke them.
        </p>
      </>
    ),
  },
  {
    title: "8. Intellectual property",
    content: (
      <>
        <p>
          AxeDz, including its name, logo, dashboard, API, and documentation, is
          owned by AxeDz and protected by applicable intellectual property laws.
          You may not copy, modify, or redistribute our platform without written
          permission.
        </p>
        <p>
          You retain ownership of the content you send through our service. You
          grant us a limited license to process and transmit that content solely
          to provide the service.
        </p>
      </>
    ),
  },
  {
    title: "9. Limitation of liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, AxeDz is provided &quot;as
          is&quot; without warranties of any kind. We are not liable for
          indirect, incidental, special, or consequential damages, including
          lost profits or data.
        </p>
        <p>
          Our total liability for any claim related to the service is limited to
          the amount you paid to AxeDz in the twelve (12) months before the
          claim arose.
        </p>
      </>
    ),
  },
  {
    title: "10. Suspension & termination",
    content: (
      <>
        <p>
          You may close your account at any time from the dashboard or by
          contacting support. We may suspend or terminate your access if you
          breach these terms, fail to pay, or if continued service poses a legal
          or security risk.
        </p>
        <p>
          Upon termination, your right to use the service ends. Unused wallet
          balance may be handled according to our refund policy and applicable
          law.
        </p>
      </>
    ),
  },
  {
    title: "11. Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time. When we do, we will post
        the revised version on this page and update the &quot;Last updated&quot;
        date. Continued use of AxeDz after changes take effect means you accept
        the updated terms.
      </p>
    ),
  },
  {
    title: "12. Governing law",
    content: (
      <p>
        These terms are governed by the laws of Algeria. Any disputes shall be
        subject to the exclusive jurisdiction of the competent courts in
        Algeria, unless otherwise required by mandatory consumer protection
        laws.
      </p>
    ),
  },
  {
    title: "13. Contact us",
    content: (
      <>
        <p>If you have questions about these terms, contact us at:</p>
        <ul className="list-none space-y-1 pl-0">
          <li>
            Email:{" "}
            <a
              href="mailto:support@axedz.com"
              className="font-medium text-primary hover:text-secondary"
            >
              support@axedz.com
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <section className="min-h-dvh bg-background px-4 py-6 md:px-6 md:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-10 space-y-4 border-b-2  border-foreground pb-8 md:mb-12">
          <span className="inline-block w-fit rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold tracking-wide text-background sm:px-6 sm:py-4 sm:text-2xl">
            Legal
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Last updated: May 31, 2026
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Please read these terms carefully before using AxeDz. They explain
            your rights and responsibilities when using our messaging platform.
          </p>
        </header>

        <div className="space-y-10 pb-16">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
