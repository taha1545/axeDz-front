export interface Pagination {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}

export interface UsageRecord {
    id: number;
    api_key_id: number;
    service_type: string;
    unit_cost: string;
    quantity: number;
    total_cost: string;
    reference_id: string;
    created_at: string;
    updated_at: string;
}

export interface EmailRecord {
    id: number;
    api_key_id: number;
    to_email: string[];
    subject: string;
    body: string;
    body_type: string;
    callback_url: string | null;
    callback_data: Record<string, unknown> | null;
    status_code: number | null;
    status: string;
    retry_count: number;
    sent_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface SmsRecord {
    id: number;
    api_key_id: number;
    to_number: string[];
    message: string;
    provider: string;
    callback_url: string | null;
    callback_data: Record<string, unknown> | null;
    status_code: number | null;
    status: string;
    retry_count: number;
    sent_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface ListResponse<T> {
    records: T[];
    pagination: Pagination;
}

export interface ListParams {
    limit?: number;
    offset?: number;
}
