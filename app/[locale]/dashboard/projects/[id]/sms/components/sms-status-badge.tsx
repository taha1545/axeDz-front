'use client';

import { cn } from '@/lib/utils';
import { SMS_STATUS_MAP } from '../constants';

interface SmsStatusBadgeProps {
    status: string;
}

export function SmsStatusBadge({ status }: SmsStatusBadgeProps) {
    const cfg = SMS_STATUS_MAP[status];

    if (!cfg) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-muted-foreground/20 bg-muted/40 px-3 py-1.5 text-xs font-semibold capitalize text-muted-foreground">
                {status}
            </span>
        );
    }

    return (
        <span
            className={cn(
                'inline-flex min-w-[5rem] items-center justify-center rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize',
                cfg.bg,
                cfg.border,
                cfg.text,
                cfg.darkText
            )}
        >
            {cfg.label}
        </span>
    );
}
