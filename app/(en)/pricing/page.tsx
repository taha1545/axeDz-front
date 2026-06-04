'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard } from 'lucide-react';

interface PricingItem {
    id: string;
    label: string;
    unit: string;
    pricePerUnit: number;
    max: number;
    step: number;
}

const pricingItems: PricingItem[] = [
    {
        id: 'sms',
        label: 'SMS Messages',
        unit: 'SMS',
        pricePerUnit: 2,
        max: 20000,
        step: 100,
    },
    {
        id: 'email',
        label: 'Transactional Emails',
        unit: 'Emails',
        pricePerUnit: 0.4,
        max: 50000,
        step: 500,
    },
    {
        id: 'storage',
        label: 'Cloud Storage',
        unit: 'GB',
        pricePerUnit: 50,
        max: 100,
        step: 1,
    },
    {
        id: 'tokens',
        label: 'AI Model Tokens',
        unit: 'Tokens',
        pricePerUnit: 0.005,
        max: 3000000,
        step: 10000,
    },
];

export default function PricingPage() {
    const router = useRouter();

    const [values, setValues] = useState<Record<string, number>>(() => {
        const initial: Record<string, number> = {};
        pricingItems.forEach((item) => (initial[item.id] = 0));
        return initial;
    });

    const total = useMemo(() => {
        return pricingItems.reduce((sum, item) => {
            return sum + values[item.id] * item.pricePerUnit;
        }, 0);
    }, [values]);

    const handleChange = (id: string, value: number) => {
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <section className="flex min-h-dvh flex-col bg-background px-4 py-6 md:px-6 md:py-12 lg:px-8">
            <div className="mx-auto w-full max-w-7xl flex-1">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 md:mb-8"
                >
                    <button
                        onClick={() => router.back()}
                        className={cn(
                            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                            'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Return back
                    </button>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 md:mb-14"
                >
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5 ">
                        <span className="inline-block w-fit rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold tracking-wide text-background sm:px-4 sm:py-4 sm:text-sm md:text-xl">
                            Pricing
                        </span>
                        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
                            <span className="font-semibold text-foreground">AxeDz</span> offers
                            simple, transparent pay-as-you-go pricing with local billing in Algerian
                            Dinars.
                        </p>
                    </div>
                </motion.div>

                {/* Info Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
                >
                    {/* Free Tier */}
                    <div className="rounded-2xl border-1 border-primary bg-card p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
                        <h3 className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                            Free Tier
                        </h3>
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            Access all APIs in sandbox mode. Test SMS, Email, Storage,
                            and AI with zero cost. No real messages are sent responses
                            are simulated for development.
                        </p>
                    </div>

                    {/* Production */}
                    <div className="rounded-2xl border-1 border-primary bg-card p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6">
                        <h3 className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                            Production
                        </h3>
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            Switch to production for live delivery. Real SMS, real emails, and
                            actual cloud storage. Usage is deducted from your wallet automatically.
                        </p>
                    </div>

                    {/* Wallet */}
                    <div className="rounded-2xl border-1 border-primary bg-card p-5 shadow-sm sm:rounded-[1.5rem] sm:p-6 sm:col-span-2 lg:col-span-1">
                        <h3 className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                            Wallet System
                        </h3>
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            Add funds via local DZD payment methods. Every API call
                            consumes balance in realtime. Track spending and top up
                            instantly from your dashboard.
                        </p>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-12">
                    {/* Left — Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="rounded-2xl border-border  bg-card p-5 shadow-sm sm:rounded-[2rem] sm:p-8 md:p-10 lg:col-span-3"
                    >
                        <div className="mb-2 flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold text-foreground sm:text-xl md:text-2xl">
                                Price Calculator
                            </h3>
                        </div>
                        <p className="mb-6 text-xs text-muted-foreground sm:mb-8 sm:text-sm">
                            Estimate your monthly costs based on expected usage.
                        </p>

                        <div className="space-y-6 sm:space-y-8">
                            {pricingItems.map((item) => (
                                <div key={item.id} className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-medium text-foreground sm:text-sm">
                                            {item.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {values[item.id].toLocaleString()} {item.unit}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <input
                                            type="range"
                                            min={0}
                                            max={item.max}
                                            step={item.step}
                                            value={values[item.id]}
                                            onChange={(e) =>
                                                handleChange(item.id, Number(e.target.value))
                                            }
                                            className={cn(
                                                'h-3 w-full cursor-pointer appearance-none rounded-full bg-card-foreground/10 accent-primary sm:h-2',
                                                '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md sm:[&::-webkit-slider-thumb]:h-4 sm:[&::-webkit-slider-thumb]:w-4',
                                                '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md sm:[&::-moz-range-thumb]:h-4 sm:[&::-moz-range-thumb]:w-4'
                                            )}
                                        />
                                        <span className="w-16 shrink-0 text-right text-xs font-semibold text-foreground sm:w-20 sm:text-sm">
                                            {Math.round(
                                                values[item.id] * item.pricePerUnit
                                            ).toLocaleString()}{' '}
                                            DZD
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-5 sm:mt-10 sm:flex-row sm:items-center sm:pt-6">
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground sm:text-sm">
                                    Estimated Total
                                </span>
                                <p className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                                    {total.toLocaleString()} DZD
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Services Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-5 sm:space-y-6 lg:col-span-2"
                    >
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-foreground sm:text-base">
                                SMS Utility Services
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                Send OTPs, alerts, and marketing messages to any Algerian number.
                                Charged per successful delivery.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-foreground sm:text-base">
                                Transactional Email
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                High-deliverability SMTP and API for notifications, welcomes, and
                                invoices. Track opens and bounces in real-time.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-foreground sm:text-base">
                                Cloud Storage
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                Scalable object storage for media, logs, and backups. Pay only for
                                what you use with no minimum commitment.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-foreground sm:text-base">
                                AI Model Tokens
                            </h4>
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                Access LLM and embedding APIs for chatbots, summarization, and
                                classification. Billed per token consumed.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:rounded-[1.5rem] sm:p-6">
                            <h4 className="mb-1.5 text-sm font-semibold text-foreground">
                                Need a custom plan?
                            </h4>
                            <p className="mb-4 text-xs text-muted-foreground sm:text-sm">
                                For high-volume enterprises or resellers, we offer committed-use
                                discounts and dedicated support.
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
                            >
                                Contact sales
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}