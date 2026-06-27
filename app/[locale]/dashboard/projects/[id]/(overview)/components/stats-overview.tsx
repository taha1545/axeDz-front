'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import type { ApiKeyStats } from '@/types';
import { CostIllustration } from './illustrations/CostIllustration';
import { EmailIllustration } from './illustrations/EmailIllustration';
import { SmsIllustration } from './illustrations/SmsIllustration';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.02,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 110,
            damping: 14,
        },
    },
};

interface StatsOverviewProps {
    stats?: ApiKeyStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
    const t = useTranslations('dashboard.overview');
    const isMobile = useIsMobile();

    const cards = [
        {
            id: 'cost',
            title: t('totalCost'),
            illustration: <CostIllustration />,
            value: stats?.totalCost?.toFixed(2) ?? '0.00',
            label: 'DZD',
            percent: stats ? Math.min((stats.totalCost / 1000) * 100, 100) : 0,
            limitLabel: 'of 1k',
            variant: 'blue' as const,
            mobileVariant: 'white' as const,
        },
        {
            id: 'email',
            title: t('emailMarketing'),
            illustration: <EmailIllustration />,
            value: stats?.emailCount?.toLocaleString() ?? '0',
            label: 'mail',
            percent: stats ? Math.min((stats.emailCount / 50000) * 100, 100) : 0,
            limitLabel: 'of 50k',
            variant: 'white' as const,
            mobileVariant: 'blue' as const,
        },
        {
            id: 'sms',
            title: t('smsMarketing'),
            illustration: <SmsIllustration />,
            value: stats?.smsCount?.toLocaleString() ?? '0',
            label: 'sms',
            percent: stats ? Math.min((stats.smsCount / 20000) * 100, 100) : 0,
            limitLabel: 'of 20k',
            variant: 'blue' as const,
            mobileVariant: 'white' as const,
        },
    ];

    return (
        <div className="space-y-6 mx-1">
            <div className="space-y-1.5">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {t('usage.title')}
                </h2>
                <p className="text-sm mx-1 font-medium text-muted-foreground">
                    {t('usage.description')}
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
                {cards.map((card, index) => {
                    const isBlue = isMobile
                        ? card.mobileVariant === 'blue'
                        : card.variant === 'blue';

                    return (
                        <motion.article
                            key={card.id}
                            variants={cardVariants}
                            whileHover={{ y: -4 }}
                            className={cn(
                                'group relative cursor-pointer overflow-hidden rounded-[22px] p-6 flex flex-col min-h-[190px]',
                                'transition-shadow duration-300',
                                isBlue
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-foreground/40 hover:shadow-foreground/60'
                                    : 'border border-primary/30 bg-card text-card-foreground shadow-md shadow-primary/15 hover:shadow-primary/40'
                            )}
                        >
                            {card.illustration}

                            {/* Badge label */}
                            <div className="relative z-10">
                                <span
                                    className={cn(
                                        'inline-block rounded-xl px-3.5 py-1.5 text-xs font-bold tracking-wide mb-5 uppercase',
                                        isBlue
                                            ? 'bg-white/20 text-black text-base'
                                            : 'bg-blue-50 text-black  text-base'
                                    )}
                                >
                                    {card.title}
                                </span>
                            </div>


                            <div className="relative z-10 mt-auto space-y-3">
                                {/* Value */}
                                <p
                                    className={cn(
                                        'text-5xl font-semibold leading-none tracking-tight',
                                        isBlue ? 'text-white' : 'text-foreground'
                                    )}
                                >
                                    {card.value}
                                </p>
                                {/* Unit + percentage row */}
                                <div className="flex items-center justify-between gap-2">
                                    <span
                                        className={cn(
                                            'text-sm font-bold font-mono tracking-widest px-2.5 py-1 rounded-lg',
                                            isBlue
                                                ? 'bg-white/20 text-white'
                                                : 'bg-blue-100 text-blue-800'
                                        )}
                                    >
                                        {card.label}
                                    </span>
                                    <span
                                        className={cn(
                                            'text-sm font-medium',
                                            isBlue ? 'text-white/60' : 'text-muted-foreground'
                                        )}
                                    >
                                        {Math.round(card.percent)}% {card.limitLabel}
                                    </span>
                                </div>
                                {/* Progress bar */}
                                <div
                                    className={cn(
                                        'h-[3px] w-full rounded-full overflow-hidden',
                                        isBlue ? 'bg-white/20' : 'bg-blue-100'
                                    )}
                                >
                                    <motion.div
                                        className={cn(
                                            'h-full rounded-full',
                                            isBlue ? 'bg-white/90' : 'bg-primary'
                                        )}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${card.percent}%` }}
                                        transition={{
                                            duration: 0.9,
                                            delay: 0.15 + index * 0.08,
                                            ease: 'easeOut',
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </motion.div>
        </div>
    );
}
