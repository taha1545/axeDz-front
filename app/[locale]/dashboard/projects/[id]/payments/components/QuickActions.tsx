'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plus } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { AlertThresholdCard } from './AlertThresholdCard';

interface QuickActionsProps {
    onAddFunds: () => void;
    alertThreshold: string | null;
    onSaveThreshold: (threshold: number) => void;
    isSavingThreshold: boolean;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.02 },
    },
};

export function QuickActions({
    onAddFunds,
    alertThreshold,
    onSaveThreshold,
    isSavingThreshold,
}: QuickActionsProps) {
    const t = useTranslations('dashboard.payments.quickActions');

    return (
        <div className="space-y-5 mx-1">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mx-1">
                    {t('title')}
                </h2>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-8 lg:grid-cols-2 mx-1.5"
            >
                {/* Add Funds Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 110, damping: 14 }}
                    className={cn(
                        'flex flex-col gap-4 rounded-[2rem] border border-primary/50 bg-card p-6',
                        'shadow-sm transition-all duration-200 hover:shadow-md'
                    )}
                >
                    <div className="flex items-center mx-3">
                        <div>
                            <h4 className="text-base font-bold text-foreground">{t('addFunds')}</h4>
                            <p className="text-xs text-muted-foreground">{t('addFundsDesc')}</p>
                        </div>
                    </div>
                    <button
                        onClick={onAddFunds}
                        className={cn(
                            'mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold',
                            'bg-primary text-primary-foreground transition-all duration-200',
                            'hover:shadow-lg hover:shadow-primary/30 active:scale-95'
                        )}
                    >
                        <Plus className="size-4" />
                        {t('addFunds')}
                    </button>
                </motion.div>

                {/* Alert Threshold Card */}
                <AlertThresholdCard
                    currentThreshold={alertThreshold}
                    onSave={onSaveThreshold}
                    isSaving={isSavingThreshold}
                />
            </motion.div>
        </div>
    );
}
