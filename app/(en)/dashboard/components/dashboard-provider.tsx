'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { mockProjects, type DashboardProject } from './dashboard-nav';

interface DashboardWallet {
    balance: number;
    currency: string;
    isFreePlan: boolean;
}

interface DashboardContextValue {
    projects: DashboardProject[];
    activeProject: DashboardProject;
    setActiveProjectId: (id: string) => void;
    wallet: DashboardWallet;
    notificationCount: number;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [activeProjectId, setActiveProjectId] = useState(mockProjects[0].id);

    const activeProject = useMemo(
        () => mockProjects.find((p) => p.id === activeProjectId) ?? mockProjects[0],
        [activeProjectId]
    );

    const wallet = useMemo<DashboardWallet>(
        () => ({
            balance: activeProject.mode === 'sandbox' ? 0 : 12500,
            currency: 'DZD',
            isFreePlan: activeProject.mode === 'sandbox',
        }),
        [activeProject.mode]
    );

    const value = useMemo(
        () => ({
            projects: mockProjects,
            activeProject,
            setActiveProjectId: setActiveProjectId,
            wallet,
            notificationCount: 3,
        }),
        [activeProject, wallet]
    );

    return (
        <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within DashboardProvider');
    }
    return context;
}
