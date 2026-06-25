import api from './api';
import type {
    EmailRecord, ListParams, ListResponse,
    SmsRecord, UsageRecord
} from '@/types';


export async function getUsage(apiKey: string, params?: ListParams): Promise<ListResponse<UsageRecord>> {
    const { data } = await api.get('/communication/usage', {
        headers: { 'x-api-key': apiKey },
        params,
    });
    return {
        records: data?.data?.records ?? [],
        pagination: data?.data?.pagination ?? { total: 0, limit: 20, offset: 0, hasMore: false },
    };
}

export async function getEmails(apiKey: string, params?: ListParams): Promise<ListResponse<EmailRecord>> {
    const { data } = await api.get('/communication/emails', {
        headers: { 'x-api-key': apiKey },
        params,
    });
    return {
        records: data?.data?.records ?? [],
        pagination: data?.data?.pagination ?? { total: 0, limit: 10, offset: 0, hasMore: false },
    };
}

export async function getSms(apiKey: string, params?: ListParams): Promise<ListResponse<SmsRecord>> {
    const { data } = await api.get('/communication/sms', {
        headers: { 'x-api-key': apiKey },
        params,
    });
    return {
        records: data?.data?.records ?? [],
        pagination: data?.data?.pagination ?? { total: 0, limit: 10, offset: 0, hasMore: false },
    };
}
