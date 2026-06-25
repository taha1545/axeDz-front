export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    created_at: string;
    imagePath: string | null;
    role: string;
};

export interface SignupPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
    image?: null;
}

export interface SignupResponse {
    accessToken?: string;
    user?: User;
}

export interface LoginPayload {
    identifier: string;
    password: string;
}

export interface LoginResponse {
    accessToken?: string;
    user?: User;
}
