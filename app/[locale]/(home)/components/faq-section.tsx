'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SectionHeader } from '@/components/section-header';
import { cn } from '@/lib/utils';

const FAQ_IDS = ['services', 'builtFor', 'billing', 'test'] as const;
type FaqId = (typeof FAQ_IDS)[number];

export function FAQSection() {
    //
    const t = useTranslations('home.faq');
    const [openId, setOpenId] = useState<FaqId>('services');

    return (
        <section className="bg-background px-4 py-16 md:px-6 md:py-24 lg:px-8">
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
                    transition={{ delay: 0.15 }}
                    className="flex flex-col gap-4"
                >
                    {FAQ_IDS.map((id) => {
                        const isOpen = openId === id;

                        return (
                            <div key={id} className="flex flex-col">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenId((prev) => (prev === id ? '' : id) as FaqId)
                                    }
                                    className={cn(
                                        'flex w-full items-center justify-between gap-4 rounded-full px-6 py-5 text-left transition-all duration-300 md:px-8',
                                        isOpen
                                            ? 'bg-foreground text-background shadow-lg '
                                            : 'bg-primary/90 text-primary-foreground hover:brightness-110'
                                    )}
                                >
                                    <span className="text-base font-semibold md:text-lg">
                                        {t(`items.${id}.question`)}
                                    </span>
                                    <span className="shrink-0">
                                        {isOpen ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 py-6 md:px-8">
                                                <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">
                                                    {t(`items.${id}.answer`)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}