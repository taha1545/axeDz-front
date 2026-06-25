import { getPageMetadata, type Locale } from '@/lib/metadata';
import { OverviewPage } from './components/overview-page';
import type { ApiKey, UsageRecord, EmailRecord, SmsRecord } from '@/types';
import type { User, Wallet } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getPageMetadata('/dashboard', locale as Locale);
}

/* ─── Mock Data ─── */
const mockApiKey: ApiKey = {
    id: 1,
    project_name: 'My App Production',
    key: 'sk_live_AbCdEfGhIjKlMnOpQrStUvWxYz123456',
    status: 'active',
    user_id: 1,
    created_at: '2024-01-15',
    updated_at: '2024-06-01',
};

const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '0555123456',
    is_verified: true,
    created_at: '2024-01-10',
    imagePath: null,
    role: 'user',
};

const mockWallet: Wallet = {
    id: 1,
    user_id: 1,
    balance: '0.00',
    currency: 'DZD',
    is_free: true,
    free_expires_at: '2024-12-31',
};

const mockActivities = [
    { id: '1', text: 'Email campaign delivered to 1,200 recipients', time: '5m ago' },
    { id: '2', text: 'API key rotated successfully', time: '1h ago' },
    { id: '3', text: 'Storage usage reached 80% of limit', time: '3h ago' },
    { id: '4', text: 'SMS batch sent to 5,000 numbers', time: '1d ago' },
];

export default function DashboardPage() {
    return (
        <OverviewPage
            apiKey={mockApiKey}
            user={mockUser}
        />
    );
}