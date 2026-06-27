export const TRANSACTIONS_PAGE_SIZE = 10;
export const PAYMENT_HISTORY_PAGE_SIZE = 10;

export const TRANSACTIONS_TABLE_GRID =
    'grid grid-cols-[minmax(5rem,1fr)_minmax(4.5rem,0.6fr)_minmax(5rem,0.7fr)_minmax(4.5rem,0.6fr)_minmax(5.5rem,0.72fr)_minmax(0,1.5fr)_minmax(6.5rem,0.85fr)]';

export const PAYMENT_HISTORY_TABLE_GRID =
    'grid grid-cols-[minmax(5rem,1fr)_minmax(5rem,0.8fr)_minmax(5rem,0.7fr)_minmax(4.5rem,0.6fr)_minmax(5.5rem,0.72fr)_minmax(6.5rem,0.85fr)]';

export interface StatusConfig {
    label: string;
    bg: string;
    border: string;
    text: string;
    darkText: string;
}

export const TRANSACTION_STATUS_MAP: Record<string, StatusConfig> = {
    success: {
        label: 'Success',
        bg: 'bg-emerald-500/[0.06]',
        border: 'border-emerald-500/30',
        text: 'text-emerald-700',
        darkText: 'dark:text-emerald-400',
    },
    pending: {
        label: 'Pending',
        bg: 'bg-amber-500/[0.06]',
        border: 'border-amber-500/30',
        text: 'text-amber-700',
        darkText: 'dark:text-amber-400',
    },
    failed: {
        label: 'Failed',
        bg: 'bg-red-500/[0.06]',
        border: 'border-red-500/30',
        text: 'text-red-700',
        darkText: 'dark:text-red-400',
    },
    refunded: {
        label: 'Refunded',
        bg: 'bg-sky-500/[0.06]',
        border: 'border-sky-500/30',
        text: 'text-sky-700',
        darkText: 'dark:text-sky-400',
    },
};

export const TRANSACTION_TYPE_MAP: Record<string, StatusConfig> = {
    deposit: {
        label: 'Deposit',
        bg: 'bg-emerald-500/[0.06]',
        border: 'border-emerald-500/30',
        text: 'text-emerald-700',
        darkText: 'dark:text-emerald-400',
    },
    usage: {
        label: 'Usage',
        bg: 'bg-violet-500/[0.06]',
        border: 'border-violet-500/30',
        text: 'text-violet-700',
        darkText: 'dark:text-violet-400',
    },
    refund: {
        label: 'Refund',
        bg: 'bg-sky-500/[0.06]',
        border: 'border-sky-500/30',
        text: 'text-sky-700',
        darkText: 'dark:text-sky-400',
    },
    adjustment: {
        label: 'Adjustment',
        bg: 'bg-amber-500/[0.06]',
        border: 'border-amber-500/30',
        text: 'text-amber-700',
        darkText: 'dark:text-amber-400',
    },
};

export const TRANSACTION_ALL_STATUSES = Object.keys(TRANSACTION_STATUS_MAP);
