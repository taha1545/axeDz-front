import type { ApiKey } from "./api-key";
import type { Wallet } from "./payment";

export interface Project {
    id: string;
    name: string;
    status: 'active' | 'blocked' | 'suspended';
    environment: 'production' | 'development';
    createdAt: string;
    lastActive: string;
}

export type UserPlan = 'free' | 'pro';

export interface DashboardUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    imagePath: string | null;
    role: string;
    plan: UserPlan;
    wallet?: {
        balance: string;
        currency: string;
        is_free: boolean;
    };
}


export interface DashboardState {
    user: DashboardUser | null;
    projects: Project[];
    currentProject: Project | null;
    apiKeys: ApiKey[] | null;
    wallet: Wallet | null;
    isLoading: boolean;
    error: string | null;
}

export interface CreateProjectPayload {
    name: string;
}

