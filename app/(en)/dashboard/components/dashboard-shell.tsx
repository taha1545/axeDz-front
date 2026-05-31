'use client';

import { useState } from 'react';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardProvider } from './dashboard-provider';
import { DashboardSidebar } from './dashboard-sidebar';

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <DashboardProvider>
            <div className="flex h-dvh flex-col overflow-hidden bg-background pt-[12vh]">
                <DashboardNavbar onMenuOpen={() => setSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
                    <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </DashboardProvider>
    );
}