'use client';

import { useDashboardContext } from '@/providers/dashboard-provider';
import { useParams, useRouter } from 'next/navigation';
import CustomLoader from '@/components/custom-loader';
import { useEffect } from 'react';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { apiKeys, isLoading } = useDashboardContext();

    useEffect(() => {
        if (!isLoading && apiKeys && apiKeys.length > 0) {
            const exists = apiKeys.some((k) => String(k.id) === id);
            if (!exists) {
                router.replace(`/dashboard/projects/${apiKeys[0].id}`);
            }
        }
    }, [id, apiKeys, isLoading, router]);

    if (isLoading) {
        return <CustomLoader />;
    }

    return <>{children}</>;
}