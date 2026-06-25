import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken, clearAuthTokens } from './token';
import { queryClient } from './query-client';


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 40000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Attach access token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

// Refresh token logic
api.interceptors.response.use((response) => response,
    async (error: AxiosError) => {
        //
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };
        //
        const hadAuthHeader = !!originalRequest?.headers?.get('Authorization');
        //
        if (!originalRequest || originalRequest._retry || error.response?.status !== 401 || !hadAuthHeader) {
            return Promise.reject(error);
        }
        originalRequest._retry = true;
        //
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
                {},
                { withCredentials: true }
            );
            //
            setAccessToken(data.accessToken);
            originalRequest.headers.set(
                'Authorization',
                `Bearer ${data.accessToken}`
            );
            return api(originalRequest);
            //
        } catch {
            //
            clearAuthTokens();
            //
            queryClient.setQueryData(['auth', 'me'], null);
            queryClient.removeQueries({ queryKey: ['auth', 'me'] });
            //
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    }
);

export default api;