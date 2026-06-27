'use client';

import { useTranslations } from 'next-intl';
import { StatsOverview } from './stats-overview';
import { ApiKeySection } from './api-key-section';
import { RecentActivity } from './recent-activity';
import type { ApiKey } from '@/types/api-key';
import type { UsageRecord } from './recent-activity';
import type { ApiKeyStats } from '@/types';

interface OverviewPageProps {
    apiKey?: ApiKey;
    activities?: UsageRecord[];
    stats?: ApiKeyStats;
    onRotate?: () => void;
    onSuspend?: () => void;
    isRotating?: boolean;
    isSuspending?: boolean;
}

export function OverviewPage({
    apiKey,
    activities,
    stats,
    onRotate,
    onSuspend,
    isRotating,
    isSuspending
}: OverviewPageProps) {
    const t = useTranslations('dashboard.overview');

    if (!apiKey) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <p className="text-muted-foreground">{t('noProject')}</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-0 space-y-16 pb-20 pt-4">
            <StatsOverview stats={stats} />

            <ApiKeySection
                apiKey={apiKey}
                onRotate={onRotate}
                onSuspend={onSuspend}
                isRotating={isRotating}
                isSuspending={isSuspending}
            />

            <RecentActivity records={activities ?? []} />
        </div>
    );
}