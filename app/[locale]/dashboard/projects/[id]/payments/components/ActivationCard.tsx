'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
    Coins,
    Prohibit,
    Lightning,
    Rocket,
} from '@phosphor-icons/react';

interface ActivationCardProps {
    onActivate: () => void;
    isActivating: boolean;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.02 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 110, damping: 14 },
    },
};

const infoCardsData = [
    { key: 'payPerUsage', icon: Coins },
    { key: 'noSubscription', icon: Prohibit },
    { key: 'autoDeduction', icon: Lightning },
];

export function ActivationCard({ onActivate, isActivating }: ActivationCardProps) {
    const t = useTranslations('dashboard.payments');

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
        >
            {/* Hero Card */}
            <motion.div
                variants={itemVariants}
                className={cn(
                    'relative overflow-hidden rounded-[2rem] border border-foreground p-6 sm:p-10 ',
                    'bg-primary text-primary-foreground shadow-md shadow-foreground/50',
                    'flex flex-col gap-6'
                )}
            >
                <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-3 max-w-2xl">
                        <h3 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
                            {t('activationCard.title')}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-primary-foreground/80">
                            {t('activationCard.description')}
                        </p>
                    </div>
                    <button
                        onClick={onActivate}
                        disabled={isActivating}
                        className={cn(
                            'inline-flex shrink-0 items-center gap-2 rounded-full ',
                            'bg-foreground px-5 py-4 text-xs sm:text-base font-bold text-background',
                            'transition-all duration-200 hover:shadow-lg hover:shadow-foreground/30',
                            'active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
                        )}
                    >
                        <Rocket className={cn('size-5', isActivating && 'animate-pulse')} />
                        {isActivating ? t('activationCard.ctaLoading') : t('activationCard.cta')}
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.06]">
                    <Rocket className="size-60" />
                </div>
            </motion.div>

            {/* Information Grid */}
            <div className="space-y-4">
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3 px-3"
                >
                    {infoCardsData.map(({ key, icon: Icon }) => (
                        <div
                            key={key}
                            className={cn(
                                'flex items-start gap-4 rounded-[2rem] border border-primary/20 p-5',
                                'bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md'
                            )}
                        >
                            <div className="space-y-1 mx-auto px-2">
                                <p className="text-sm font-semibold text-foreground">
                                    {t(`infoCards.${key}`)}
                                </p>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    {t(`infoCards.${key}Desc`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

        </motion.div>
    );
}
