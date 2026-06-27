'use client';

import { useTranslations } from 'next-intl';

export function SmsHeader() {
    const t = useTranslations('dashboard.sms');

    return (
        <div className="space-y-1 pb-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t('title')}</h2>
            <p className="text-sm font-medium text-muted-foreground">{t('description')}</p>
        </div>
    );
}
