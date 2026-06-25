import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createApiKey,
    listApiKeys,
    updateApiKey,
    deleteApiKey,
    getApiKeyStats,
    rotateApiKey,
} from '@/services';
import type { ApiKey, ApiKeyStatus } from '@/types';

//  Query Keys 
const API_KEYS_KEY = ['api-keys'] as const;
const apiKeyDetailKey = (id: number) => [...API_KEYS_KEY, 'detail', id] as const;
const apiKeyStatsKey = (id: number) => [...apiKeyDetailKey(id), 'stats'] as const;

//  Queries 
export function useApiKeys(status?: ApiKeyStatus) {
    return useQuery({
        queryKey: status ? [...API_KEYS_KEY, { status }] : API_KEYS_KEY,
        queryFn: () => listApiKeys(status),
        staleTime: 30 * 1000,
    });
}

export function useApiKeyStats(id: number) {
    return useQuery({
        queryKey: apiKeyStatsKey(id),
        queryFn: () => getApiKeyStats(id),
        enabled: id > 0,
        staleTime: 60 * 1000,
    });
}

//  Mutations

export function useCreateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createApiKey,
        onSuccess: (newApiKey) => {
            queryClient.setQueryData<ApiKey[]>(API_KEYS_KEY, (old) =>
                old ? [newApiKey, ...old] : [newApiKey]
            );
        },
    });
}

export function useRotateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rotateApiKey,
        onSuccess: (updatedKey) => {
            queryClient.setQueryData<ApiKey[]>(API_KEYS_KEY, (old) =>
                old
                    ? old.map((k) => (k.id === updatedKey.id ? updatedKey : k))
                    : old
            );
        },
    });
}

export function useUpdateApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: ApiKeyStatus }) =>
            updateApiKey(id, status),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: apiKeyDetailKey(id) });
            queryClient.invalidateQueries({ queryKey: API_KEYS_KEY });
        },
    });
}

export function useDeleteApiKey() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteApiKey,
        onSuccess: (_, id) => {
            queryClient.removeQueries({ queryKey: apiKeyDetailKey(id) });
            queryClient.invalidateQueries({ queryKey: API_KEYS_KEY });
        },
    });
}

