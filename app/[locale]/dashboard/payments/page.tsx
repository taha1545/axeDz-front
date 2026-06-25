import { getPageMetadata, type Locale } from '@/lib/metadata';
import { mockTransactions, mockPayments } from './mock-data';
import { PaymentsPage } from './components/payments-page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getPageMetadata('/dashboard', locale as Locale);
}

export default function PaymentsPageRoute() {
    const mockOnActivate = async () => {
        'use server';
        // Mock: will be replaced with real API call
        console.log('[Mock] Production mode activated');
    };

    const mockOnSaveThreshold = async (_threshold: number) => {
        'use server';
        // Mock: will be replaced with real API call
        console.log('[Mock] Alert threshold saved');
    };

    const mockOnAddFunds = async (_amount: number) => {
        'use server';
        // Mock: will be replaced with real API call
        console.log('[Mock] Add funds initiated');
    };

    const totalDeposits = mockPayments
        .filter((p) => p.status === 'success')
        .reduce((sum, p) => sum + parseFloat(p.amount), 0)
        .toString();

    const totalUsage = mockTransactions
        .filter((t) => t.type === 'usage' && t.status === 'success')
        .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0)
        .toString();


    return (
        <PaymentsPage
            isProduction={false}
            balance="0.00"
            totalDeposits={totalDeposits}
            totalUsage={totalUsage}
            alertThreshold={null}
            payments={mockPayments}
            onActivate={mockOnActivate}
            onSaveThreshold={mockOnSaveThreshold}
            onAddFunds={mockOnAddFunds}
        />
    );
}
