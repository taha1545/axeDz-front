import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchMe,
    login,
    logout,
    signup,
    setAccessToken,
    clearAuthTokens,
} from '@/services';
import type { LoginPayload, SignupPayload } from '@/types';

const AUTH_ME_KEY = ['auth', 'me'] as const;

// Queries
export function useUser() {
    return useQuery({
        queryKey: AUTH_ME_KEY,
        queryFn: fetchMe,
        staleTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: typeof window !== 'undefined',
    });
}

// Mutations

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginPayload) => login(data),
        onSuccess: (data) => {
            if (data.accessToken) {
                setAccessToken(data.accessToken);
            }
            if (data.user) {
                queryClient.setQueryData(AUTH_ME_KEY, data.user);
            } else {
                queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY });
            }
        },
    });
}

export function useSignup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SignupPayload) => signup(data),
        onSuccess: (data) => {
            if (data.accessToken) {
                setAccessToken(data.accessToken);
            }
            if (data.user) {
                queryClient.setQueryData(AUTH_ME_KEY, data.user);
            } else {
                queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY });
            }
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            clearAuthTokens();
            queryClient.removeQueries({ queryKey: AUTH_ME_KEY });
        },
    });
}

export function useLoginWithToken() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (token: string) => {
            setAccessToken(token);
            return fetchMe();
        },
        onSuccess: (user) => {
            queryClient.setQueryData(AUTH_ME_KEY, user);
        },
        onError: () => {
            clearAuthTokens();
        },
    });
}

// Convenience Hook
export function useAuth() {
    const { data: user, isLoading } = useUser();
    const queryClient = useQueryClient();

    const loginMutation = useLogin();
    const signupMutation = useSignup();
    const logoutMutation = useLogout();
    const loginWithTokenMutation = useLoginWithToken();

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        signup: signupMutation.mutateAsync,
        isSigningUp: signupMutation.isPending,
        logout: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isPending,
        refresh: () => queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY }),
        loginWithToken: loginWithTokenMutation.mutateAsync,
        isProcessingToken: loginWithTokenMutation.isPending,
    };
}