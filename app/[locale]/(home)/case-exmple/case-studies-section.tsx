'use client';

import { motion } from 'framer-motion';

import { useTranslations } from 'next-intl';

import { SectionHeader } from '@/components/section-header';
import { CaseStudyCard } from "./case-card";
import { cn } from '@/lib/utils';

const CASE_STUDY_IDS = ['ecommerce', 'saas', 'fintech'] as const;
type CaseStudyId = (typeof CASE_STUDY_IDS)[number];

const CASE_STUDY_HREFS: Record<CaseStudyId, string> = {
    ecommerce: '/docs?tab=ecommerce',
    saas: '/docs?tab=saas',
    fintech: '/docs?tab=fintech',
};


export function CaseStudiesSection() {
    //
    const t = useTranslations('home.caseStudies');
    //
    return (
        <section className="bg-background px-4 py-12 md:px-6 md:py-20 lg:px-8">
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
                        'relative overflow-hidden rounded-2xl border border-border bg-foreground dark:bg-card shadow-lg shadow-primary/15',
                        'px-6 py-10 sm:px-10 sm:py-18 md:px-12 lg:px-16'
                    )}
                >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                        {CASE_STUDY_IDS.map((id, index) => (
                            <CaseStudyCard
                                key={id}
                                title={t(`items.${id}.title`)}
                                description={t(`items.${id}.description`)}
                                href={CASE_STUDY_HREFS[id]}
                                learnMore={t('learnMore')}
                                index={index}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
