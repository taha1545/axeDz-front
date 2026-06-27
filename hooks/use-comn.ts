import { useQuery } from '@tanstack/react-query';
import {
    getUsage,
    getEmails,
    getSms,
} from '@/services';
import type { EmailRecord, ListParams, ListResponse, SmsRecord, UsageRecord } from '@/types';

//  Query Keys 
const COMM_KEY = ['communication'] as const;
const usageKey = (apiKey: string, params?: ListParams) =>
    [...COMM_KEY, 'usage', apiKey, params ?? {}] as const;
const emailsKey = (apiKey: string, params?: ListParams) =>
    [...COMM_KEY, 'emails', apiKey, params ?? {}] as const;
const smsKey = (apiKey: string, params?: ListParams) =>
    [...COMM_KEY, 'sms', apiKey, params ?? {}] as const;


//  Queries
export function useUsage(apiKey: string, params?: ListParams) {
    return useQuery<ListResponse<UsageRecord>>({
        queryKey: usageKey(apiKey, params),
        queryFn: () => getUsage(apiKey, params),
        enabled: !!apiKey,
        staleTime: 30 * 1000,
    });
}

export function useEmails(apiKey: string, params?: ListParams) {
    return useQuery<ListResponse<EmailRecord>>({
        queryKey: emailsKey(apiKey, params),
        queryFn: () => getEmails(apiKey, params),
        enabled: !!apiKey,
        staleTime: 30 * 1000,
    });
}

export function useSms(apiKey: string, params?: ListParams) {
    return useQuery<ListResponse<SmsRecord>>({
        queryKey: smsKey(apiKey, params),
        queryFn: () => getSms(apiKey, params),
        enabled: !!apiKey,
        staleTime: 30 * 1000,
    });
}
