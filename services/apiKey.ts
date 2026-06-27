import api from './api';
import type { ApiKey, ApiKeyStats, ApiKeyStatus } from '@/types';


export async function createApiKey(projectName: string): Promise<ApiKey> {
    const { data } = await api.post('/api-keys', { project_name: projectName });
    return data?.apiKey;
}

export async function getApiKey(id: number): Promise<ApiKey> {
    const { data } = await api.get(`/api-keys/${id}`);
    return data?.apiKey ?? data?.data;
}

export async function listApiKeys(status?: ApiKeyStatus): Promise<ApiKey[]> {
    const { data } = await api.get('/api-keys', {
        params: status ? { status } : undefined,
    });
    const keys = data?.apiKeys ?? data?.data?.apiKeys ?? data?.data;
    return Array.isArray(keys) ? keys : [];
}

export async function updateApiKey(id: number, status: ApiKeyStatus): Promise<void> {
    await api.put(`/api-keys/${id}`, { status });
}
// 
export async function updateApiKeyName(
    id: number,
    project_name: string
): Promise<void> {
    await api.put(`/api-keys/${id}`, { project_name });
}

export async function deleteApiKey(id: number): Promise<void> {
    await api.delete(`/api-keys/${id}`);
}

export async function getApiKeyStats(id: number): Promise<ApiKeyStats> {
    const { data } = await api.get(`/api-keys/${id}/stats`);
    return data?.data;
}

export async function rotateApiKey(id: number): Promise<ApiKey> {
    const { data } = await api.patch(`/api-keys/${id}/rotate`);
    return data?.apiKey;
}
