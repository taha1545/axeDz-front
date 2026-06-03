import { Metadata } from 'next';
import Link from 'next/link';
import {
    DocCallout,
    DocHeading,
    DocList,
    DocSection,
    DocTable,
} from '../components/doc-section';
import { PRICING } from '../components/docs-nav';

export const metadata: Metadata = {
    title: 'Overview | AxeDz Docs',
};

export default function OverviewPage() {
    return (
        <>
            <DocHeading
                title="Overview"
                description="AxeDz helps you send SMS and email to your customers in Algeria. Create an account, add credit to your wallet, and start sending messages through a simple API or dashboard."
            />

            <DocSection title="What is AxeDz?">
                <p>
                    AxeDz is a messaging platform built for businesses and apps that need reliable
                    SMS and email delivery in Algeria. You pay only for what you use, in Algerian
                    Dinars (DZD), with no monthly subscription required.
                </p>
                <DocList
                    items={[
                        'Send SMS and transactional emails to your customers',
                        'Manage projects and API keys from your dashboard',
                        'Top up your wallet with SATIM and track spending in real time',
                        'Test for free in sandbox mode before going live',
                        'View delivery logs and message history anytime',
                        'Official SDKs for Node.js and Python',
                    ]}
                />
            </DocSection>

            <DocSection title="What you can do">
                <DocTable
                    headers={['Feature', 'Description']}
                    rows={[
                        ['Send SMS', 'OTP codes, alerts, notifications, and marketing messages'],
                        ['Send email', 'Welcome emails, receipts, password resets, and more'],
                        ['Manage contacts', 'Save customer phone numbers and emails for later use'],
                        ['Track usage', 'See every message sent, its status, and what it cost'],
                        ['Control spending', 'Check your balance and top up whenever you need'],
                    ]}
                />
            </DocSection>

            <DocSection title="How it works">
                <DocList
                    items={[
                        'Create a free account and verify your email or phone',
                        'Generate an API key for your project from the dashboard',
                        'Test your integration in sandbox mode at no cost',
                        'Top up your wallet and switch to production when you are ready',
                        'Send messages via the API or SDK — balance is deducted per message',
                    ]}
                />
                <DocCallout title="Sandbox vs production">
                    Sandbox lets you test your integration without sending real messages or
                    spending money. Production sends live messages and charges your wallet.
                </DocCallout>
            </DocSection>

            <DocSection title="Pricing">
                <p>
                    You only pay when messages are successfully sent in production mode. Sandbox
                    mode is completely free.
                </p>
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
                    Use our{' '}
                    <Link href="/pricing" className="font-medium text-primary hover:text-secondary">
                        pricing calculator
                    </Link>{' '}
                    to estimate your monthly costs before you start.
                </p>
            </DocSection>

            <DocSection title="Security & privacy">
                <DocList
                    items={[
                        'All requests are encrypted over HTTPS',
                        'API keys can be created and revoked anytime from your dashboard',
                        'Your wallet and payment details are protected',
                        'Rate limits protect your account from abuse',
                        'OTP verification keeps your account secure',
                    ]}
                />
            </DocSection>

            <DocSection title="Get started">
                <p>
                    Ready to send your first message? Follow the{' '}
                    <Link href="/docs/quickstart" className="font-medium text-primary hover:text-secondary">
                        Quickstart guide
                    </Link>{' '}
                    or browse the{' '}
                    <Link href="/docs/api-reference" className="font-medium text-primary hover:text-secondary">
                        API Reference
                    </Link>{' '}
                    for full endpoint details.
                </p>
            </DocSection>
        </>
    );
}
