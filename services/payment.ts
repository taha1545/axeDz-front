import api from './api';
import type {
    InitiatePaymentData, Payment,
    PaymentHistory, Wallet
} from '@/types';


export async function getHistory(): Promise<PaymentHistory> {
    const { data } = await api.get('/payments/history');
    return {
        payments: data?.data?.payments ?? [],
        transactions: data?.data?.transactions ?? [],
    };
}

export async function initiatePayment(
    amount: number,
    currency: string = 'DZD'
): Promise<InitiatePaymentData | null> {
    const { data } = await api.post('/payments/initiate', { amount, currency });
    return data?.data ?? null;
}

export async function syncStatus(orderId: string): Promise<Payment | null> {
    const { data } = await api.post(`/payments/status/${orderId}/sync`);
    return data?.data?.payment ?? data?.payment ?? data?.data ?? null;
}

export async function getWallet(): Promise<Wallet | null> {
    const { data } = await api.get('/payments/wallet');
    return data?.data ?? null;
}

export async function switchToProduction(): Promise<void> {
    await api.post('/payments/wallet/switch-to-production');
}

export async function setAlert(threshold: number): Promise<void> {
    await api.post('/payments/wallet/alert', { threshold: String(threshold) });
}
