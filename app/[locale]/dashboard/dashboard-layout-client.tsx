'use client';

import type { ReactNode } from 'react';
import { useDashboardContext } from '@/providers/dashboard-provider';
import { DashboardShell } from './components/dashboard-shell';
import { usePathname } from "@/i18n/routing";
import CustomLoader from '@/components/custom-loader';
import type { DashboardUser } from '@/types';

export function DashboardLayoutClient({ children }: { children: ReactNode }) {
    //
    const { user, projects, currentProject, wallet, isLoading } = useDashboardContext();
    //
    const pathname = usePathname();
    const isRootDashboard = pathname === '/dashboard';
    const shouldRedirect = !isLoading && projects.length > 0 && isRootDashboard;

    if (isLoading || shouldRedirect) {
        return <CustomLoader />;
    }

    const dashboardUser: DashboardUser | null = user
        ? {
            ...user,
            plan: (wallet?.is_free ? 'free' : 'pro') as 'free' | 'pro',
            wallet: wallet
                ? {
                    balance: wallet.balance,
                    currency: wallet.currency,
                    is_free: wallet.is_free,
                }
                : undefined,
        }
        : null;

    return (
        <DashboardShell
            user={dashboardUser}
            projects={projects}
            initialProject={currentProject ?? undefined}
        >
            {children}
        </DashboardShell>
    );
}