export interface Project {
    id: string;
    name: string;
    status: 'active' | 'inactive' | 'suspended';
    environment: 'production' | 'development' | 'staging';
    createdAt: string;
    lastActive: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
    createdAt: string;
}

export type UserPlan = 'free' | 'pro' | 'enterprise';

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