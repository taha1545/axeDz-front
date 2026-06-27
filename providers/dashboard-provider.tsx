'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useDashboardGuard, useCreateProject } from '@/hooks/use-dashboard';
import type { Project, ApiKey, Wallet, User } from '@/types';
import CustomLoader from '@/components/custom-loader';

interface DashboardContextType {
    user: User | null;
    projects: Project[];
    currentProject: Project | null;
    apiKeys: ApiKey[] | null;
    wallet: Wallet | null;
    isLoading: boolean;
    error: string | null;
    canCreateProject: boolean;
    createProject: (data: { name: string }) => Promise<void>;
    isCreatingProject: boolean;
    setCurrentProject: (project: Project) => void;
    refresh: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboardContext() {
    const context = useContext(DashboardContext);
    if (!context) throw new Error('useDashboardContext must be used within DashboardProvider');
    return context;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
    //
    const router = useRouter();
    const guard = useDashboardGuard();
    const createProjectMutation = useCreateProject();
    //
    const handleCreateProject = async (data: { name: string }) => {
        if (!guard.canCreateProject) throw new Error('User must be verified to create projects');
        await createProjectMutation.mutateAsync(data);
    };

    const value: DashboardContextType = {
        user: guard.user,
        projects: guard.projects,
        currentProject: guard.currentProject,
        apiKeys: guard.apiKeys,
        wallet: guard.wallet,
        isLoading: guard.isLoading,
        error: guard.error ? String(guard.error) : null,
        canCreateProject: guard.canCreateProject,
        createProject: handleCreateProject,
        isCreatingProject: createProjectMutation.isPending,
        setCurrentProject: (project) => router.push(`/dashboard/projects/${project.id}`),
        refresh: () => window.location.reload(),
    };

    if (guard.isLoading) {
        return <CustomLoader />;
    }

    if (!guard.isAuthenticated) return null;

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}
