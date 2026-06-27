import type { Payment } from '@/types';

export function getPaymentProvider(payment: Payment): string {
    const provider = payment.raw_response?.provider;
    if (typeof provider === 'string' && provider.length > 0) return provider;
    return 'SATIM';
}

export function getSatimRedirectUrl(satim: Record<string, unknown> | undefined): string | null {
    if (!satim) return null;

    for (const key of ['formUrl', 'form_url', 'url', 'paymentUrl', 'payment_url']) {
        const value = satim[key];
        if (typeof value === 'string' && value.length > 0) return value;
    }

    return null;
}
