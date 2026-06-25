'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Wallet, Coins, ArrowsDownUp, Bell } from '@phosphor-icons/react';

interface WalletOverviewProps {
    balance: string;
    totalDeposits: string;
    totalUsage: string;
    alertThreshold: string | null;
    currency: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.02 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 110, damping: 14 },
    },
};

function formatCurrency(amount: string): string {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0.00';
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function WalletOverview({ balance, totalDeposits, totalUsage, alertThreshold, currency }: WalletOverviewProps) {
    const t = useTranslations('dashboard.payments.walletOverview');
    const isZero = parseFloat(balance) <= 0;
    const thresholdNum = alertThreshold ? parseFloat(alertThreshold) : null;
    const balanceNum = parseFloat(balance);
    const isLowBalance = thresholdNum !== null && !isNaN(balanceNum) && balanceNum <= thresholdNum;

    return (
        <div className="space-y-5">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 mx-2 py-0"
            >
                {/* Current Balance */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    className={cn(
                        'group relative cursor-pointer overflow-hidden rounded-[2rem] border p-6 sm:p-8',
                        'transition-all duration-300 flex flex-col justify-between min-h-35',
                        'border-background bg-primary text-primary-foreground shadow-md shadow-foreground/50 hover:shadow-foreground'
                    )}
                >
                    <div className="relative z-10 flex items-start justify-between">
                        <span className="inline-flex w-fit rounded-xl bg-foreground/20 px-4 py-2 text-base font-bold uppercase tracking-wide backdrop-blur-sm">
                            {t('currentBalance')}
                        </span>
                        <Wallet className="size-8 text-primary-foreground" />
                    </div>
                    <div className="relative z-10 mt-auto space-y-1  left-[3%]">
                        <p className="text-3xl font-bold tracking-tight">
                            {formatCurrency(balance)} <span className="text-lg font-medium text-primary-foreground/70">{currency}</span>
                        </p>
                    </div>
                </motion.div>
                {/* Alert Threshold */}
                <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    className={cn(
                        'group relative cursor-pointer overflow-hidden rounded-[2rem] border p-6 sm:p-8',
                        'transition-all duration-300 flex flex-col justify-between min-h-40',
                        'border-primary/40 bg-card text-card-foreground shadow-md shadow-primary/20 hover:shadow-primary/50'
                    )}
                >
                    <div className="relative z-10 flex items-start justify-between">
                        <span className="inline-flex text-foreground  w-fit rounded-xl bg-primary/10 px-4 py-2 text-base font-semibold uppercase tracking-wide ">
                            {t('alertThreshold')}
                        </span>
                        <Bell className="size-8 text-foreground/70" />
                    </div>
                    <div className="relative left-[3%] z-10 mt-auto space-y-1">
                        {alertThreshold ? (
                            <p className="text-3xl font-bold tracking-tight text-foreground">
                                {formatCurrency(alertThreshold)} <span className="text-lg font-medium text-muted-foreground">{currency}</span>
                            </p>
                        ) : (
                            <p className="text-lg font-medium text-muted-foreground">
                                {t('noThreshold')}
                            </p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
