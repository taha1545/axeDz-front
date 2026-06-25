'use client';

import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { SmsRecord } from '@/types';
import { SMS_TABLE_GRID } from '../constants';
import { SmsRecipientsCell } from './sms-recipients-cell';
import { SmsStatusBadge } from './sms-status-badge';

interface SmsTableRowProps {
    record: SmsRecord;
    isLast: boolean;
}

function formatSentAt(sentAt: string | null) {
    return sentAt ? format(new Date(sentAt), 'MMM d, yyyy HH:mm') : '—';
}

export function SmsTableRow({ record, isLast }: SmsTableRowProps) {
    const sentAt = formatSentAt(record.sent_at);

    return (
        <div
            className={cn(
                'hidden items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/20 md:grid lg:px-8',
                SMS_TABLE_GRID,
                !isLast && 'border-b border-foreground/5'
            )}
        >
            <div className="min-w-0">
                <SmsStatusBadge status={record.status} />
            </div>

            <div className="min-w-0">
                <SmsRecipientsCell numbers={record.to_number} />
            </div>

            <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground" title={record.message}>
                    {record.message}
                </p>
            </div>

            <span className="text-right text-sm tabular-nums text-muted-foreground">{sentAt}</span>
        </div>
    );
}

export function SmsTableRowMobile({ record, isLast }: SmsTableRowProps) {
    const t = useTranslations('dashboard.sms');
    const sentAt = formatSentAt(record.sent_at);

    return (
        <div
            className={cn(
                'space-y-3 px-4 py-4 md:hidden',
                !isLast && 'border-b border-foreground/5'
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <SmsStatusBadge status={record.status} />
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{sentAt}</span>
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t('table.to')}
                </p>
                <SmsRecipientsCell numbers={record.to_number} />
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t('table.message')}
                </p>
                <p className="line-clamp-2 text-sm text-muted-foreground">{record.message}</p>
            </div>
        </div>
    );
}
