'use client';

import { useParams } from 'next/navigation';
import { useApiKeyDetail, useApiKeyStats, useRotateApiKey, useUpdateApiKey } from '@/hooks/use-key';
import { useUsage } from '@/hooks/use-comn';
import { OverviewPage } from './components/overview-page';

export default function ProjectOverviewPage() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);

    const { data: apiKey, isLoading: isKeyLoading } = useApiKeyDetail(numericId);
    const { data: stats, isLoading: isStatsLoading } = useApiKeyStats(numericId);

    const { data: usageData, isLoading: isUsageLoading } = useUsage(apiKey?.key ?? '', {
        limit: 10,
        offset: 0,
    });

    const rotateMutation = useRotateApiKey();
    const updateMutation = useUpdateApiKey();

    if (isKeyLoading || isStatsLoading || isUsageLoading) return null;

    const activities = usageData?.records ?? [];

    const handleRotate = () => {
        rotateMutation.mutate(numericId);
    };

    const handleSuspend = () => {
        const newStatus = apiKey?.status === 'active' ? 'blocked' : 'active';
        updateMutation.mutate({ id: numericId, status: newStatus });
    };

    return (
        <OverviewPage
            apiKey={apiKey ?? undefined}
            activities={activities}
            stats={stats}
            onRotate={handleRotate}
            onSuspend={handleSuspend}
            isRotating={rotateMutation.isPending}
            isSuspending={updateMutation.isPending}
        />
    );
}