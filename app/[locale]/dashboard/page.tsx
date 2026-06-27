'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FolderOpen, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
    const t = useTranslations('dashboard.empty');

    return (
        <div className="flex h-full items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex max-w-md flex-col items-center gap-6 text-center"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10"
                >
                    <FolderOpen className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        {t('title')}
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {t('description')}
                    </p>
                </div>

                {/* Verify CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex w-full flex-col items-center gap-3 rounded-2xl border border-amber-200/50 bg-card/60 p-5 dark:border-amber-900/30 dark:bg-amber-950/20"
                >
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                        <span className="text-sm font-semibold">{t('verify.title')}</span>
                    </div>
                    <Link
                        href="/setting"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline "
                    >
                        {t('verify.link')}
                        <ArrowRight className="h-3 w-3" />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}