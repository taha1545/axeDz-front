import { QueryClient } from '@tanstack/react-query';

// i think this is better for user experience samed
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minute
            gcTime: 10 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});