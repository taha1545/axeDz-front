'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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

interface StatItem {
    id: string;
    title: string;
    image: string;
    value: string;
    percentage: string;
    variant: 'blue' | 'white';
    mobilevariant: 'blue' | 'white';
}

export function StatsOverview() {
    //
    const t = useTranslations('dashboard.overview');
    const isMobile = useIsMobile();
    //
    const statsData: StatItem[] = [
        {
            id: 'cloud-storage',
            title: 'Cloud Storage',
            image: '/services/storage.svg',
            value: '4.2 GB',
            percentage: '42.0%',
            variant: 'blue',
            mobilevariant: 'blue',
        },
        {
            id: 'email-marketing',
            title: 'Email Marketing',
            image: '/services/email.svg',
            value: '12,450 mail',
            percentage: '24.9%',
            variant: 'white',
            mobilevariant: 'white',
        },
        {
            id: 'sms-api',
            title: 'SMS Marketing ',
            image: '/services/sms.svg',
            value: '8,230 sms',
            percentage: '41.1%',
            variant: 'white',
            mobilevariant: 'blue',
        },
        {
            id: 'ai-tokens',
            title: 'Models Tokens',
            image: '/services/api.svg',
            value: '1.2M token',
            percentage: '24.0%',
            variant: 'blue',
            mobilevariant: 'white',
        },
    ];

    return (
        <div className="space-y-6 mx-1">
            {/* Section Header */}
            <div className="space-y-1.5">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {t('usage.title', { fallback: 'Usage Overview' })}
                </h2>
                <p className="text-sm mx-1 font-medium text-muted-foreground">
                    {t('usage.description', { fallback: 'Live metrics for your platform core systems.' })}
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-8 sm:grid-cols-2"
            >
                {statsData.map((stat, index) => {
                    const isBlue = isMobile
                        ? stat.mobilevariant === 'blue'
                        : stat.variant === 'blue';

                    return (
                        <motion.article
                            key={stat.id}
                            variants={cardVariants}
                            whileHover={{ y: -4 }}
                            className={cn(
                                'group relative cursor-pointer overflow-hidden rounded-[2rem] border p-6  sm:px-8 sm:pb-5 sm:pt-8',
                                'transition-all duration-300 flex flex-col justify-between min-h-45 sm:min-h-60',
                                isBlue
                                    ? 'border-background bg-primary text-primary-foreground shadow-md shadow-foreground/50 hover:shadow-foreground'
                                    : 'border-primary/40 shadow-md shadow-primary/20 bg-card text-card-foreground hover:shadow-primary/50'
                            )}
                        >
                            <div
                                className={cn(
                                    "pointer-events-none absolute right-5 top-5 h-30 w-40 opacity-40",
                                    "sm:right-3 sm:top-5 sm:h-32 sm:w-45 sm:opacity-40",
                                    "lg:right-[18%] lg:top-[10%] lg:h-[70%] lg:w-[40%] lg:opacity-85"
                                )}
                            >
                                <Image
                                    src={stat.image}
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Header Section — title aligned to the start */}
                            <div className="relative z-10 mb-6 sm:mb-8 max-w-[65%] sm:max-w-none">
                                <span
                                    className={cn(
                                        'inline-flex w-fit rounded-xl px-4 py-2 font-extrabold text-md sm:text-[18px] tracking-wide uppercase',
                                        isBlue
                                            ? 'bg-foreground/20 text-primary-foreground backdrop-blur-sm'
                                            : 'bg-primary-foreground/90 text-black backdrop-blur-sm'
                                    )}
                                >
                                    {stat.title}
                                </span>
                            </div>

                            {/* Metrics & Custom Progress Tracker */}
                            <div className="relative z-10 mt-auto space-y-5">
                                <div className="flex items-end justify-between gap-2">
                                    <span className="text-3xl sm:text-3xl font-medium tracking-tight leading-none">
                                        {stat.value}
                                    </span>
                                    <span className={cn(
                                        "text-xs font-bold font-mono px-2.5 py-1 rounded-md",
                                        isBlue ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                                    )}>
                                        {stat.percentage}
                                    </span>
                                </div>

                                <div className={cn(
                                    "h-1.5 w-full rounded-full overflow-hidden",
                                    isBlue ? "bg-primary-foreground/25" : "bg-muted"
                                )}>
                                    <motion.div
                                        className={cn(
                                            "h-full rounded-full",
                                            isBlue ? "bg-primary-foreground" : "bg-primary"
                                        )}
                                        initial={{ width: 0 }}
                                        animate={{ width: stat.percentage }}
                                        transition={{ duration: 0.9, delay: 0.15 + (index * 0.05), ease: "easeOut" }}
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