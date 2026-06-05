import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for AxeDz — how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          AxeDz (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects
          your privacy. This Privacy Policy explains what information we collect
          when you use our website, dashboard, and API, and how we use and
          protect it.
        </p>
        <p>
          By using AxeDz, you agree to the collection and use of information as
          described in this policy. If you do not agree, please do not use our
          services.
        </p>
      </>
    ),
  },
  {
    title: "2. Information we collect",
    content: (
      <>
        <p>
          We collect information you provide directly and information generated
          when you use our platform:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Account information</strong> —
            name, email address, phone number, and password
          </li>
          <li>
            <strong className="text-foreground">Billing information</strong> —
            wallet balance, transaction history, and payment records via SATIM
          </li>
          <li>
            <strong className="text-foreground">API usage data</strong> —
            messages sent, delivery status, API keys used, and request logs
          </li>
          <li>
            <strong className="text-foreground">Contact data</strong> — phone
            numbers and email addresses you store or message through our
            platform
          </li>
          <li>
            <strong className="text-foreground">Technical data</strong> — IP
            address, browser type, device information, and usage analytics
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How we use your information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide, operate, and maintain the AxeDz platform</li>
          <li>Send SMS and email messages on your behalf</li>
          <li>Process wallet top-ups and deduct usage charges</li>
          <li>Verify your identity and secure your account (including OTP)</li>
          <li>
            Send service notifications, billing alerts, and support responses
          </li>
          <li>Detect fraud, abuse, and security incidents</li>
          <li>Improve our products and develop new features</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. How we share your information",
    content: (
      <>
        <p>
          We do not sell your personal information. We may share data only in
          these cases:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Service providers</strong> — SMS
            carriers, email providers, payment processors (SATIM), and hosting
            partners who help us operate the platform
          </li>
          <li>
            <strong className="text-foreground">Legal requirements</strong> —
            when required by law, court order, or government request
          </li>
          <li>
            <strong className="text-foreground">Business transfers</strong> — in
            connection with a merger, acquisition, or sale of assets, with
            notice to you
          </li>
          <li>
            <strong className="text-foreground">With your consent</strong> —
            when you explicitly authorize us to share information
          </li>
        </ul>
        <p>
          Message content is transmitted to delivery providers solely to fulfill
          your requests. We require partners to handle data securely and only
          for the intended purpose.
        </p>
      </>
    ),
  },
  {
    title: "5. Data retention",
    content: (
      <>
        <p>
          We retain your account information for as long as your account is
          active. Message logs, transaction records, and API usage data are kept
          for billing, support, and legal compliance purposes.
        </p>
        <p>
          When you delete your account, we will delete or anonymize your
          personal data within a reasonable period, except where retention is
          required by law or for legitimate business purposes such as fraud
          prevention.
        </p>
      </>
    ),
  },
  {
    title: "6. Security",
    content: (
      <>
        <p>
          We implement industry-standard security measures to protect your data,
          including encryption in transit (HTTPS), secure API key handling,
          access controls, and rate limiting.
        </p>
        <p>
          No method of transmission or storage is 100% secure. You are
          responsible for keeping your password and API keys confidential.
          Report any suspected breach to{" "}
          <a
            href="mailto:support@axedz.com"
            className="font-medium text-primary hover:text-secondary"
          >
            support@axedz.com
          </a>{" "}
          immediately.
        </p>
      </>
    ),
  },
  {
    title: "7. Your rights",
    content: (
      <>
        <p>Depending on applicable law, you may have the right to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict certain processing</li>
          <li>Export your data in a portable format</li>
          <li>Withdraw consent where processing is consent-based</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a
            href="mailto:support@axedz.com"
            className="font-medium text-primary hover:text-secondary"
          >
            support@axedz.com
          </a>
          . We will respond within a reasonable timeframe.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies & tracking",
    content: (
      <>
        <p>
          We use cookies and similar technologies to keep you signed in,
          remember your preferences, and understand how you use our website.
          Essential cookies are required for the platform to function. Analytics
          cookies help us improve the experience.
        </p>
        <p>
          You can control cookies through your browser settings. Disabling
          essential cookies may affect your ability to use the dashboard.
        </p>
      </>
    ),
  },
  {
    title: "9. Third-party links",
    content: (
      <p>
        Our website may contain links to third-party sites. We are not
        responsible for the privacy practices of those sites. We encourage you
        to read their privacy policies before providing any personal
        information.
      </p>
    ),
  },
  {
    title: "10. Children's privacy",
    content: (
      <p>
        AxeDz is not intended for users under 18 years of age. We do not
        knowingly collect personal information from children. If you believe a
        child has provided us with personal data, contact us and we will delete
        it promptly.
      </p>
    ),
  },
  {
    title: "11. Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        post the revised version on this page and update the &quot;Last
        updated&quot; date. Material changes may also be communicated via email
        or a dashboard notice.
      </p>
    ),
  },
  {
    title: "12. Contact us",
    content: (
      <>
        <p>For privacy-related questions or requests, contact us at:</p>
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

export default function PrivacyPage() {
  return (
    <section className="min-h-dvh bg-background px-4 py-6 md:px-6 md:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-10 space-y-4 border-b-2  border-foreground pb-8 md:mb-12">
          <span className="inline-block w-fit rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold tracking-wide text-background sm:px-6 sm:py-4 sm:text-2xl">
            Legal
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Last updated: May 31, 2026
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            This policy explains how AxeDz collects, uses, and protects your
            personal information when you use our platform.
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
