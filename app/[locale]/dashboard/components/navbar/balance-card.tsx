'use client';

import { useTranslations } from 'next-intl';

interface BalanceCardProps {
    balance: number;
    currency: string;
    isProduction: boolean;
}

export function BalanceCard({
    balance,
    currency,
    isProduction,
}: BalanceCardProps) {
    const t = useTranslations('dashboard.navbar.balance');

    return (
        <div className="rounded-xl  bg-foreground/95  px-5 py-3 shadow-md transition-all duration-200 hover:shadow-xl">
            {isProduction ? (
                <div className="gap-2 flex flex-row justify-between items-center ">
                    <p className="text-base font-medium text-background">
                        {t('wallet')}
                    </p>

                    <p className="text-base font-bold tabular-nums text-background">
                        {balance.toLocaleString()} {currency}
                    </p>
                </div>
            ) : (
                <p className="text-sm font-bold text-background">
                    {t('freePlan')}
                </p>
            )}
        </div>
    );
}