'use client';

import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { EmailRecord } from '@/types';
import { EMAIL_TABLE_GRID } from '../constants';
import { EmailsRecipientsCell } from './emails-recipients-cell';
import { EmailsStatusBadge } from './emails-status-badge';

interface EmailsTableRowProps {
    record: EmailRecord;
    isLast: boolean;
}

function formatDateTime(value: string | null) {
    return value ? format(new Date(value), 'MMM d, yyyy HH:mm') : '—';
}

export function EmailsTableRow({ record, isLast }: EmailsTableRowProps) {
    const sentAt = formatDateTime(record.sent_at);
    const createdAt = formatDateTime(record.created_at);

    return (
        <div
            className={cn(
                'hidden items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/20 md:grid lg:px-8',
                EMAIL_TABLE_GRID,
                !isLast && 'border-b border-foreground/5'
            )}
        >
            <div className="min-w-0">
                <EmailsStatusBadge status={record.status} />
            </div>

            <div className="min-w-0">
                <EmailsRecipientsCell emails={record.to_email} />
            </div>

            <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground" title={record.subject}>
                    {record.subject}
                </p>
            </div>

            <span className="text-right text-sm tabular-nums text-muted-foreground">{sentAt}</span>
            <span className="text-right text-sm tabular-nums text-muted-foreground">{createdAt}</span>
        </div>
    );
}

export function EmailsTableRowMobile({ record, isLast }: EmailsTableRowProps) {
    const t = useTranslations('dashboard.emails');
    const sentAt = formatDateTime(record.sent_at);
    const createdAt = formatDateTime(record.created_at);

    return (
        <div
            className={cn(
                'space-y-3 px-4 py-4 md:hidden',
                !isLast && 'border-b border-foreground/5'
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <EmailsStatusBadge status={record.status} />
                <div className="shrink-0 space-y-0.5 text-right text-xs tabular-nums text-muted-foreground">
                    <p>
                        <span className="font-semibold uppercase tracking-wide">{t('table.sentAt')}: </span>
                        {sentAt}
                    </p>
                    <p>
                        <span className="font-semibold uppercase tracking-wide">{t('table.createdAt')}: </span>
                        {createdAt}
                    </p>
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t('table.to')}
                </p>
                <EmailsRecipientsCell emails={record.to_email} />
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t('table.subject')}
                </p>
                <p className="line-clamp-2 text-sm text-muted-foreground">{record.subject}</p>
            </div>
        </div>
    );
}
