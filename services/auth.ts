import api from './api';
import { getAccessToken } from './token';
import type {
    LoginPayload,
    LoginResponse,
    SignupPayload,
    SignupResponse,
    User,
} from '@/types';

export async function signup(data: SignupPayload): Promise<SignupResponse> {
    const { data: res } = await api.post('/auth/signup', data);
    return res;
}

export async function login(data: LoginPayload): Promise<LoginResponse> {
    const { data: res } = await api.post('/auth/login', data);
    return res;
}

export async function logout(): Promise<void> {
    await api.post('/auth/logout');
}

export async function fetchMe(): Promise<User | null> {
    const token = getAccessToken();
    if (!token) return null;

    try {
        const { data } = await api.get('/auth/me');
        return data.user ?? null;
    } catch {
        return null;
    }
}