import { DashboardProvider } from '@/providers/dashboard-provider';
import { DashboardLayoutClient } from './dashboard-layout-client';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardProvider>
            <DashboardLayoutClient>{children}</DashboardLayoutClient>
        </DashboardProvider>
    );
}
