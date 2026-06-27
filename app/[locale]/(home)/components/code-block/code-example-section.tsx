'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { CodeBlock } from './code-block';
import { codeSamples, tabs, type ApiTab } from './code-examples';
import { SectionHeader } from '@/components/section-header';

type Language = 'node' | 'python';


export function CodeExampleSection() {
    //
    const t = useTranslations('home.codeExamples');
    const [activeTab, setActiveTab] = useState<ApiTab>('sms');
    const [language, setLanguage] = useState<Language>('node');

    const current = codeSamples[activeTab];

    return (
        <section
            id="use-cases"
            className="scroll-mt-24 bg-background px-4 py-16 md:px-6 md:py-24 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <SectionHeader
                    badge={t('badge')}
                    title={t('title')}
                    subtitle={t('subtitle')}
                />

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="overflow-hidden rounded-4xl border border-foreground/20  bg-card shadow-lg shadow-primary/15"
                >
                    {/* Top Bar */}
                    <div className="flex flex-col gap-4 border-b border-card-foreground/60 bg-muted/30 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-4">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-primary md:text-xl">
                                    {t('brandName')}
                                </span>
                                <span className="text-muted-foreground/60">|</span>
                                <span className="text-sm font-medium text-foreground">
                                    {t('suite')}
                                </span>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        'group inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200',
                                        activeTab === tab
                                            ? 'bg-background  text-card-foreground  shadow-md'
                                            : ' bg-muted text-foreground/80 hover:bg-card-foreground/85 hover:text-background'
                                    )}
                                >
                                    {t(`tabs.${tab}.label`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Code Panel */}
                        <div className="relative bg-[#0d1117] p-4 sm:p-5 lg:col-span-3 lg:p-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeTab}-${language}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                >
                                    <CodeBlock
                                        code={
                                            language === 'node'
                                                ? current.node
                                                : current.python
                                        }
                                        language={language}
                                        onLanguageChange={setLanguage}
                                        filename={
                                            language === 'node'
                                                ? 'index.js'
                                                : 'main.py'
                                        }
                                        labels={{
                                            node: t('codeBlock.node'),
                                            python: t('codeBlock.python'),
                                            copy: t('codeBlock.copy'),
                                            copied: t('codeBlock.copied'),
                                            copyTitle: t('codeBlock.copyTitle'),
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Info Panel */}
                        <div className="flex flex-col justify-center border-t border-border/60 bg-card p-6 sm:p-8 lg:col-span-2 lg:border-t-0 lg:border-l lg:border-border/60 lg:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="space-y-7"
                                >
                                    {/* Tab Badge */}
                                    <div className="space-y-2">
                                        <div className="flex flex-col items-center gap-2 text-center ">
                                            {/* Badge */}
                                            <div className="shrink-0 rounded-xl bg-foreground px-5 py-3 text-xl font-semibold tracking-wider text-background">
                                                {t(`tabs.${activeTab}.label`)}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl font-bold tracking-tight text-foreground ">
                                                {t('panelTitle')}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="leading-relaxed text-muted-foreground px-1 text-center text-sm md:text-base">
                                        {t(`tabs.${activeTab}.description`)}
                                    </p>

                                    {/* CTA */}
                                    <div className="pt-2 flex justify-center">
                                        <Link
                                            href="/docs"
                                            className="group inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-background transition-all duration-200  hover:shadow-lg"
                                        >
                                            {t('docs')}
                                            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}