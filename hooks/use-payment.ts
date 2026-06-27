import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getHistory,
    initiatePayment,
    syncStatus,
    getWallet,
    switchToProduction,
    setAlert,
} from '@/services';
import type { PaymentHistory, Wallet } from '@/types';


//  Query Keys 
const PAYMENT_KEY = ['payments'] as const;
const DASHBOARD_WALLET_KEY = ['dashboard', 'wallet'] as const;
const historyKey = () => [...PAYMENT_KEY, 'history'] as const;
const walletKey = () => [...PAYMENT_KEY, 'wallet'] as const;

function invalidateWalletQueries(queryClient: ReturnType<typeof useQueryClient>) {
    queryClient.invalidateQueries({ queryKey: walletKey() });
    queryClient.invalidateQueries({ queryKey: DASHBOARD_WALLET_KEY });
}


// Queries 

export function usePaymentHistory() {
    return useQuery<PaymentHistory>({
        queryKey: historyKey(),
        queryFn: getHistory,
        staleTime: 30 * 1000,
    });
}

export function useWallet() {
    return useQuery<Wallet | null>({
        queryKey: walletKey(),
        queryFn: getWallet,
        staleTime: 10 * 1000,
    });
}

//  Mutations

export function useInitiatePayment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ amount, currency }: { amount: number; currency?: string }) =>
            initiatePayment(amount, currency),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: historyKey() });
            invalidateWalletQueries(queryClient);
        },
    });
}

export function useSyncStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: syncStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: historyKey() });
            invalidateWalletQueries(queryClient);
        },
    });
}

export function useSwitchToProduction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: switchToProduction,
        onSuccess: () => {
            invalidateWalletQueries(queryClient);
        },
    });
}

export function useSetAlert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: setAlert,
        onSuccess: () => {
            invalidateWalletQueries(queryClient);
        },
    });
}
