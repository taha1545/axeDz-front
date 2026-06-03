import { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '../components/code-block';
import {
    DocCallout,
    DocHeading,
    DocList,
    DocSection,
    DocSubSection,
    DocTable,
} from '../components/doc-section';
import { PRICING } from '../components/docs-nav';

export const metadata: Metadata = {
    title: 'Payment — AxeDz Docs',
};

export default function PaymentPage() {
    return (
        <>
            <DocHeading
                title="Payment & Wallet"
                description="AxeDz uses a prepaid wallet in Algerian Dinars (DZD). Top up your balance, send messages, and track every transaction from your dashboard."
            />

            <DocSection title="Your wallet">
                <p>
                    Every AxeDz account comes with a wallet. When you send messages in production
                    mode, the cost is automatically deducted from your balance. In sandbox mode,
                    nothing is charged.
                </p>
                <DocList
                    items={[
                        'Check your current balance anytime in the dashboard',
                        'Top up using SATIM  Algeria\'s trusted payment gateway',
                        'View a full history of top-ups and message charges',
                        'Get notified when your balance is running low',
                    ]}
                />
            </DocSection>

            <DocSection title="What you pay">
                <p>You are only charged for messages successfully sent in production mode:</p>
                <DocTable
                    headers={['Service', 'Price (DZD)', 'Unit']}
                    rows={[
                        [PRICING.sms.label, `${PRICING.sms.price}`, PRICING.sms.unit],
                        [PRICING.email.label, `${PRICING.email.price}`, PRICING.email.unit],
                        [PRICING.storage.label, `${PRICING.storage.price}`, PRICING.storage.unit],
                        [PRICING.tokens.label, `${PRICING.tokens.price}`, PRICING.tokens.unit],
                    ]}
                />
                <p>
                    Estimate your costs with our{' '}
                    <Link href="/pricing" className="font-medium text-primary hover:text-secondary">
                        pricing calculator
                    </Link>
                    .
                </p>
            </DocSection>

            <DocSection title="How billing works">
                <DocList
                    items={[
                        'You top up your wallet through SATIM in the dashboard',
                        'When you send a message in production, the cost is deducted automatically',
                        'If your balance is too low, the request is rejected — top up and try again',
                        'Every charge appears in your transaction history with the date and amount',
                        'Sandbox mode never charges your wallet, no matter how many tests you run',
                    ]}
                />
            </DocSection>

            <DocSection title="Topping up with SATIM">
                <p>
                    SATIM is Algeria  national electronic payment system. You can top up your
                    wallet securely from the dashboard using your bank card or SATIM account.
                </p>
                <DocCallout title="How to top up">
                    Go to Dashboard → Wallet → Top Up, enter the amount in DZD, and complete
                    payment through SATIM. Your balance updates as soon as the payment is confirmed.
                </DocCallout>
            </DocSection>

            <DocSection title="Checking your balance via API">
                <p>You can check your wallet balance programmatically:</p>
                <DocSubSection title="Get wallet balance">
                    <CodeBlock language="bash" code="GET /v1/wallet" />
                    <CodeBlock
                        language="json"
                        title="Response"
                        code={`{
  "success": true,
  "data": {
    "balance": 12500,
    "currency": "DZD",
    "mode": "production"
  }
}`}
                    />
                </DocSubSection>
            </DocSection>

            <DocSection title="Transaction history">
                <p>
                    View all your top-ups and message charges from the dashboard, or fetch them
                    via the API:
                </p>
                <DocSubSection title="Payment history">
                    <CodeBlock language="bash" code="GET /v1/payment/history" />
                    <p>Returns your SATIM top-up history.</p>
                </DocSubSection>

                <DocSubSection title="All transactions">
                    <CodeBlock language="bash" code="GET /v1/payment/transactions" />
                    <p>Returns all wallet activity — top-ups and message charges.</p>
                </DocSubSection>
            </DocSection>

            <DocSection title="Low balance">
                <p>
                    If your wallet balance is not enough to cover a message, the API returns an
                    error and the message is not sent. Top up your wallet and try again — no
                    message is partially charged.
                </p>
            </DocSection>
        </>
    );
}
