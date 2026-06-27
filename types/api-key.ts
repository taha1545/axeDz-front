export type ApiKeyStatus = 'active' | 'blocked' | 'suspended';

export interface ApiKey {
    id: number;
    project_name: string;
    key: string;
    status: ApiKeyStatus;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface ApiKeyStats {
    smsCount: number;
    emailCount: number;
    totalCost: number;
}
