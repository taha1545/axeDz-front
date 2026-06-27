'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface PaymentHeaderProps {
    isProduction: boolean;
}

export function PaymentHeader({ isProduction }: PaymentHeaderProps) {
    const t = useTranslations('dashboard.payments');

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between ">
            <div className="space-y-1 pb-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {t('title')}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                    {t('description')}
                </p>
            </div>
            <span
                className={cn(
                    'inline-flex w-fit shrink-0 gap-2 my-2  items-center rounded-xl border px-6 py-3  mx-3 text-sm font-bold uppercase tracking-wide',
                    'bg-foreground text-background'
                )}
            >
                <span
                    className={cn(
                        'h-2 w-2 rounded-full',
                        isProduction ? 'bg-emerald-500' : 'bg-amber-500'
                    )}
                />
                {isProduction ? t('productionBadge') : t('sandboxBadge')}
            </span>
        </div >
    );
}
