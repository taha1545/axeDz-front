'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { SectionHeader } from '@/components/section-header';
import { cn } from '@/lib/utils';

export function PricingSection() {
    //
    const t = useTranslations('home.pricing');
    //
    return (
        <section
            id="pricing"
            className="scroll-mt-24 px-4 py-10 md:px-6 md:py-24 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <SectionHeader
                    badge={t('badge')}
                    title={t('title')}
                    subtitle={t('subtitle')}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                        'relative overflow-hidden rounded-4xl border  border-border dark:border-border bg-card shadow-lg shadow-primary/15',
                        'p-6 sm:p-10 md:px-14 md:py-15 '
                    )}
                >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl md:h-96 md:w-96" />

                    <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                        <div className="space-y-4 md:space-y-5">
                            <div className="flex flex-wrap items-center gap-2 text-sm md:gap-3 md:text-base">
                                <span className="font-bold text-primary">AxeDz</span>
                                <span className="text-muted-foreground">|</span>
                                <span className="font-medium text-foreground">
                                    {t('card.suite')}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold leading-tight text-foreground md:text-4xl">
                                {t('card.heading')}
                            </h3>
                        </div>

                        <div className="space-y-6 lg:border-l lg:border-foreground lg:pl-12">
                            <div className="space-y-2">
                                <h4 className="text-lg font-semibold text-foreground md:text-xl">
                                    {t('card.calculatorTitle')}
                                </h4>
                                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                    {t('card.calculatorDescription')}
                                </p>
                            </div>

                            <Link
                                href="/pricing"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-background transition-opacity hover:opacity-90 lg:w-fit"
                            >
                                {t('card.cta')}
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
