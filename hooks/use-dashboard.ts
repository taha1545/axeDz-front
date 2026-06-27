'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useAuth } from './use-auth';
import {
    listApiKeys,
    createApiKey,
    getWallet,
} from '@/services';
import type { Project, ApiKey, Wallet, CreateProjectPayload, User, ApiKeyStatus } from '@/types';

// ── Query Keys
const DASHBOARD_KEY = ['dashboard'] as const;
const apiKeysKey = () => [...DASHBOARD_KEY, 'api-keys'] as const;
const walletKey = () => [...DASHBOARD_KEY, 'wallet'] as const;

// ── Queries
export function useApiKeysList() {
    return useQuery<ApiKey[]>({
        queryKey: apiKeysKey(),
        queryFn: () => listApiKeys(),
        staleTime: 30 * 1000,
        retry: false,
    });
}

export function useWallet() {
    return useQuery<Wallet>({
        queryKey: walletKey(),
        queryFn: async () => {
            const wallet = await getWallet();
            if (!wallet) throw new Error('Wallet not found');
            return wallet;
        },
        staleTime: 10 * 1000,
        retry: false,
    });
}

// ── Mutations
export function useCreateProject() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: CreateProjectPayload) =>
            createApiKey(data.name),
        onSuccess: (newApiKey: ApiKey) => {
            queryClient.setQueryData(apiKeysKey(), (old: ApiKey[] | undefined) =>
                old ? [newApiKey, ...old] : [newApiKey]
            );
            router.push(`/dashboard/projects/${newApiKey.id}`);
        },
    });
}

// ── Dashboard Guard Hook
export function useDashboardGuard() {
    //
    const router = useRouter();
    const pathname = usePathname();
    //
    const { user, isLoading: isAuthLoading, isAuthenticated } = useAuth();
    const { data: apiKeys, isLoading: isApiKeysLoading, error: apiKeysError } = useApiKeysList();
    const { data: wallet, isLoading: isWalletLoading } = useWallet();

    const isLoading = isAuthLoading || isApiKeysLoading || isWalletLoading;
    const error = apiKeysError;

    // Not authenticated → /login
    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            const returnUrl = encodeURIComponent(pathname);
            router.replace(`/login?returnUrl=${returnUrl}`);
        }
    }, [isAuthLoading, isAuthenticated, pathname, router]);

    // Has api keys but on /dashboard → redirect to first project
    useEffect(() => {
        if (!isApiKeysLoading && apiKeys && apiKeys.length > 0) {
            const firstProject = apiKeys[0];
            if (pathname === '/dashboard' || pathname.endsWith('/dashboard')) {
                router.replace(`/dashboard/projects/${firstProject.id}`);
            }
        }
    }, [isApiKeysLoading, apiKeys, pathname, router]);

    // Unverified user can't create projects
    const canCreateProject = user?.is_verified ?? false;

    const mapStatus = (status: ApiKeyStatus): Project['status'] => {
        switch (status) {
            case 'active': return 'active';
            case 'blocked': return 'blocked';
            case 'suspended': return 'suspended';
            default: return 'suspended';
        }
    };

    const mapEnvironment = (isFree: boolean): Project['environment'] => {
        return isFree ? 'development' : 'production';
    };

    const projects: Project[] = (apiKeys ?? []).map((key) => ({
        id: String(key.id),
        name: key.project_name,
        status: mapStatus(key.status),
        environment: mapEnvironment(wallet?.is_free ?? true),
        createdAt: key.created_at,
        lastActive: key.updated_at,
    }));

    const currentProjectId = pathname.match(/\/dashboard\/projects\/([^/]+)/)?.[1];
    const currentProject = projects.find(p => p.id === currentProjectId) ?? projects[0] ?? null;

    return {
        user: user ?? null,
        projects,
        currentProject,
        apiKeys: apiKeys ?? [],
        wallet: wallet ?? null,
        isLoading,
        error,
        canCreateProject,
        isAuthenticated,
    };
}

// main
export function useDashboard() {
    //
    const queryClient = useQueryClient();
    const router = useRouter();
    //
    const guard = useDashboardGuard();
    const createProjectMutation = useCreateProject();
    //
    const refreshDashboard = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY });
    }, [queryClient]);
    //
    const setCurrentProject = useCallback((project: Project) => {
        router.push(`/dashboard/projects/${project.id}`);
    }, [router]);
    //
    return {
        ...guard,
        createProject: createProjectMutation.mutateAsync,
        isCreatingProject: createProjectMutation.isPending,
        refreshDashboard,
        setCurrentProject,
    };
}
