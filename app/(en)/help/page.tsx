'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, CreditCard, KeyRound, Mail, MessageCircle, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const quickLinks = [
    {
        label: 'Documentation',
        description: 'Guides and API reference',
        href: '/docs',
        icon: BookOpen,
    },
    {
        label: 'Quickstart',
        description: 'Send your first message',
        href: '/docs/quickstart',
        icon: Rocket,
    },
    {
        label: 'Pricing',
        description: 'Rates and cost calculator',
        href: '/pricing',
        icon: CreditCard,
    },
    {
        label: 'Authentication',
        description: 'API keys and account security',
        href: '/docs/authentication',
        icon: KeyRound,
    },
];

const faqCategories = [
    {
        title: 'Getting started',
        items: [
            {
                id: 'create-account',
                question: 'How do I create an account?',
                answer: 'Visit the dashboard and sign up with your email or Google account. Verify your phone or email with the OTP code we send you. You will start in free sandbox mode automatically.',
            },
            {
                id: 'sandbox',
                question: 'What is sandbox mode?',
                answer: 'Sandbox is a free testing environment. You can integrate and test the API without sending real messages or spending money. Switch to production when you are ready to go live.',
            },
            {
                id: 'first-message',
                question: 'How do I send my first message?',
                answer: 'Create an API key in your dashboard, then follow our Quickstart guide to send an SMS or email using cURL or our SDK. The full walkthrough is in the documentation.',
            },
        ],
    },
    {
        title: 'Account & billing',
        items: [
            {
                id: 'top-up',
                question: 'How do I top up my wallet?',
                answer: 'Go to Dashboard → Wallet → Top Up, enter an amount in DZD, and pay through SATIM. Your balance updates once the payment is confirmed.',
            },
            {
                id: 'pricing',
                question: 'How much does each message cost?',
                answer: 'SMS costs 2 DZD per message and email costs 0.4 DZD per email in production mode. Sandbox is free. Use our pricing calculator for monthly estimates.',
            },
            {
                id: 'low-balance',
                question: 'What happens if my balance runs out?',
                answer: 'Production requests are rejected when your balance is too low. Top up your wallet and try again. No message is sent or partially charged.',
            },
        ],
    },
    {
        title: 'API & integration',
        items: [
            {
                id: 'api-key',
                question: 'Where do I find my API key?',
                answer: 'In the dashboard under Projects → API Keys. Create a key for each project or environment. Include it in the X-API-Key header with every request.',
            },
            {
                id: 'revoke-key',
                question: 'How do I revoke a compromised API key?',
                answer: 'Go to your dashboard, find the key under API Keys, and click Revoke. It stops working immediately. Create a new key and update your application.',
            },
            {
                id: 'sdks',
                question: 'Do you have SDKs?',
                answer: 'Yes. Official SDKs are available for Node.js and Python. They handle authentication and error parsing. See the SDK page in our documentation for installation and examples.',
            },
        ],
    },
    {
        title: 'Troubleshooting',
        items: [
            {
                id: '401-error',
                question: 'Why am I getting a 401 error?',
                answer: 'A 401 means your API key is missing, incorrect, or revoked. Check that you are sending the X-API-Key header with a valid active key from your dashboard.',
            },
            {
                id: 'delivery-failed',
                question: 'Why did my message fail to deliver?',
                answer: 'Delivery can fail due to an invalid phone number, carrier issues, or insufficient balance. Check the message logs in your dashboard for the specific status and error details.',
            },
            {
                id: 'otp-not-received',
                question: 'I did not receive my OTP code',
                answer: 'Wait a minute and check your spam folder for email OTPs. You can request a new code from the verification screen. If the problem persists, contact support with your registered email or phone.',
            },
        ],
    },
];

export default function HelpCenterPage() {
    const [openId, setOpenId] = useState<string | null>('create-account');

    return (
        <section className="min-h-dvh bg-background px-4 py-6 md:px-6 md:py-12 lg:px-8">
            <div className="mx-auto w-full max-w-3xl">

                <header className="mb-10 space-y-4 border-b border-border pb-8 md:mb-12">
                    <span className="inline-block w-fit rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold tracking-wide text-background sm:px-4 sm:py-2 sm:text-2xl">
                        Support
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Help Center
                    </h1>
                    <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Find answers to common questions, browse our guides, or reach out to our
                        support team.
                    </p>
                </header>

                <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-foreground">
                                        {link.label}
                                    </span>
                                    <span className="mt-0.5 block text-sm text-muted-foreground">
                                        {link.description}
                                    </span>
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <div className="space-y-10 pb-10">
                    {faqCategories.map((category) => (
                        <section key={category.title} className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
                            <div className="flex flex-col gap-2">
                                {category.items.map((item) => {
                                    const isOpen = openId === item.id;

                                    return (
                                        <div
                                            key={item.id}
                                            className="overflow-hidden rounded-xl border border-border bg-card"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenId(isOpen ? null : item.id)
                                                }
                                                className={cn(
                                                    'flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors sm:text-base',
                                                    isOpen
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'text-foreground hover:bg-muted/50'
                                                )}
                                            >
                                                {item.question}
                                                <span
                                                    className={cn(
                                                        'shrink-0 text-lg leading-none transition-transform',
                                                        isOpen && 'rotate-45'
                                                    )}
                                                >
                                                    +
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="border-t border-border px-5 py-4">
                                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                <section className="mb-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold text-foreground">
                                    Still need help?
                                </h2>
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Our support team is here to help. We typically respond within one
                                business day.
                            </p>
                        </div>
                        <a
                            href="mailto:support@axedz.com"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                        >
                            <Mail className="h-4 w-4" />
                            support@axedz.com
                        </a>
                    </div>
                </section>
            </div>
        </section>
    );
}
