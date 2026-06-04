'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PricingSection() {
    return (
        <section id="pricing" className="bg-background px-4 py-16 md:px-6  lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 text-center md:mb-16"
                >
                    <span className="mb-3 inline-block rounded-lg bg-foreground px-8 py-4 text-2xl font-bold tracking-wide text-background">
                        Pricing
                    </span>
                    <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
                        Choose a plan that fits your needs, whether you&apos;re just getting started or scaling a production-ready application.{' '}
                        <span className="font-semibold text-foreground">AxeDz</span> offers simple, transparent pricing with local billing in Algerian Dinars.
                    </p>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className={cn(
                        'relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-sm',
                        'p-6 sm:p-10 md:rounded-[2.5rem] md:p-12 lg:p-16'
                    )}
                >
                    {/* Subtle gradient tint */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl md:h-96 md:w-96" />

                    <div className="relative grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-12">
                        {/* Left */}
                        <div className="space-y-4 md:space-y-5">
                            <div className="flex flex-wrap items-center gap-2 text-sm md:gap-3 md:text-base">
                                <span className="font-bold text-primary">AxeDz</span>
                                <span className="hidden text-muted-foreground sm:inline">|</span>
                                <span className="font-medium text-foreground">Communication Suite</span>
                            </div>
                            <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-2xl md:text-4xl lg:text-[2.75rem]">
                                Unified API Pricing & Features
                            </h3>
                        </div>

                        {/* Right */}
                        <div className="space-y-6 lg:border-l lg:border-foreground/80 lg:pl-12">
                            <div className="space-y-2">
                                <h4 className="text-base font-semibold text-foreground md:text-lg">
                                    Price Calculator
                                </h4>
                                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                    Estimate your monthly costs based on SMS volume, email sends, and storage needs. All prices are in DZD with no hidden fees.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 md:gap-5">
                                <a
                                    href="/docs/payment"
                                    className="group inline-flex items-center gap-2  text-sm font-semibold text-foreground transition-colors hover:text-primary"
                                >
                                 Pricing Details
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a
                                    href="/pricing"
                                    className="inline-flex items-center gap-2 px-2 rounded-full bg-primary md:px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-secondary  md:py-3"
                                >
                                    Pricing Calculator
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}