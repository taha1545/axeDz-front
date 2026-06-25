

export interface Payment {
    id: number;
    user_id: number;
    amount: string;
    currency: string;
    status: string;
    order_id: string;
    raw_response: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    user_id: number;
    wallet_id: number;
    type: string;
    amount: string;
    status: string;
    reference_id: string;
    created_at: string;
    updated_at: string;
}

export interface Wallet {
    id: number;
    user_id: number;
    balance: string;
    currency: string;
    is_free: boolean;
    free_expires_at: string;
}

export interface PaymentHistory {
    payments: Payment[];
    transactions: Transaction[];
}

export interface InitiatePaymentData {
    payment: Payment;
    satim: Record<string, unknown>;
}
