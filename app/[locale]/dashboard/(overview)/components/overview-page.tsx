'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { StatsOverview } from './stats-overview';
import { ApiKeySection } from './api-key-section';
import { RecentActivity } from './recent-activity';
import type { ApiKey } from '@/types/api-key';
import type { User } from '@/types';
import type { UsageRecord } from './recent-activity';

export interface Wallet {
    id: number;
    balance: string;
    currency: string;
    status: 'active' | 'frozen' | 'suspended';
    user_id: number;
}

interface OverviewPageProps {
    apiKey?: ApiKey;
    user?: User;
    wallet?: Wallet;
    activities?: UsageRecord[];
}


// ── Mock Data ───────────────────────────────
const mockApiKey: ApiKey = {
    id: 1,
    project_name: 'AxeDz Production',
    key: 'ak_live_51Hx9v2LmN3kQpZr8WdTf9jYg7Uc4Ei0BoAqRs5MnKl2P',
    status: 'active',
    user_id: 42,
    created_at: '2026-06-20T10:00:00Z',
    updated_at: '2026-06-23T14:30:00Z',
};

const mockUser: User = {
    id: 42,
    name: 'John Doe',
    email: 'john@axedz.com',
    phone: '+1 555 019 2834',
    is_verified: true,
    created_at: '2026-01-15T08:00:00Z',
    imagePath: null,
    role: 'admin',
};

const mockWallet: Wallet = {
    id: 7,
    balance: '1,240.50',
    currency: 'USD',
    status: 'active',
    user_id: 42,
};

const mockActivities: UsageRecord[] = [
    {
        id: 101,
        api_key_id: 1,
        service_type: 'email',
        unit_cost: '$0.002',
        quantity: 12450,
        total_cost: '$24.90',
        reference_id: 'ref_email_001',
        created_at: '2026-06-23T18:45:00Z',
        updated_at: '2026-06-23T18:45:00Z',
    },
    {
        id: 102,
        api_key_id: 1,
        service_type: 'sms',
        unit_cost: '$0.005',
        quantity: 8230,
        total_cost: '$41.15',
        reference_id: 'ref_sms_042',
        created_at: '2026-06-23T17:20:00Z',
        updated_at: '2026-06-23T17:20:00Z',
    },
    {
        id: 103,
        api_key_id: 1,
        service_type: 'storage',
        unit_cost: '$0.10/GB',
        quantity: 42,
        total_cost: '$4.20',
        reference_id: 'ref_storage_007',
        created_at: '2026-06-23T16:00:00Z',
        updated_at: '2026-06-23T16:00:00Z',
    },
    {
        id: 104,
        api_key_id: 1,
        service_type: 'ai',
        unit_cost: '$0.001/token',
        quantity: 1200000,
        total_cost: '$1,200.00',
        reference_id: 'ref_ai_099',
        created_at: '2026-06-23T14:10:00Z',
        updated_at: '2026-06-23T14:10:00Z',
    },
    {
        id: 105,
        api_key_id: 1,
        service_type: 'email',
        unit_cost: '$0.002',
        quantity: 5600,
        total_cost: '$11.20',
        reference_id: 'ref_email_002',
        created_at: '2026-06-23T12:30:00Z',
        updated_at: '2026-06-23T12:30:00Z',
    },
];

export function OverviewPage({ apiKey, user, wallet, activities }: OverviewPageProps) {
    const t = useTranslations('dashboard.overview');
    //
    const activeApiKey = apiKey ?? mockApiKey;
    const activeUser = user ?? mockUser;
    const activeWallet = wallet ?? mockWallet;
    const activeActivities =  mockActivities;

    return (
        <div className="mx-auto max-w-6xl px-0 space-y-16 pb-20 pt-4">

            <StatsOverview />

            <ApiKeySection
                apiKey={activeApiKey}
                onRotate={() => console.log('Rotate key:', activeApiKey.id)}
                onSuspend={() => console.log('Suspend key:', activeApiKey.id)}
            />

            <RecentActivity records={activeActivities} />
        </div>
    );
}