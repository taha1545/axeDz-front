export const EMAIL_PAGE_SIZE = 15;

export const EMAIL_TABLE_GRID =
    'grid grid-cols-[minmax(5.5rem,0.72fr)_minmax(6.5rem,1fr)_minmax(0,2.2fr)_minmax(7rem,0.88fr)]';

export interface StatusConfig {
    label: string;
    bg: string;
    border: string;
    text: string;
    darkText: string;
}

export const EMAIL_STATUS_MAP: Record<string, StatusConfig> = {
    sent: {
        label: 'Sent',
        bg: 'bg-sky-500/[0.06]',
        border: 'border-sky-500/30',
        text: 'text-sky-700',
        darkText: 'dark:text-sky-400',
    },
    queued: {
        label: 'Queued',
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
};

export const EMAIL_ALL_STATUSES = Object.keys(EMAIL_STATUS_MAP);
