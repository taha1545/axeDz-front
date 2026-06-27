'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

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

interface RecentActivityProps {
    records?: UsageRecord[];
}

const SERVICE_CONFIG: Record<string, { label: string; dot: string }> = {
    email: { label: 'Email', dot: 'bg-sky-400' },
    sms: { label: 'SMS', dot: 'bg-violet-400' },
    storage: { label: 'Storage', dot: 'bg-emerald-400' },
    ai: { label: 'AI tokens', dot: 'bg-amber-400' },
};

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return (
        d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
        ' · ' +
        d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    );
}

function formatQuantity(qty: number | undefined | null): string {
    if (qty == null || Number.isNaN(qty)) return '—';
    return qty.toLocaleString();
}

function sumTotal(records: UsageRecord[]): string {
    const total = records.reduce((acc, r) => {
        const n = parseFloat(r.total_cost.replace(/[^0-9.]/g, ''));
        return acc + (isNaN(n) ? 0 : n);
    }, 0);
    return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function RecentActivity({ records = [] }: RecentActivityProps) {
    const t = useTranslations('dashboard.overview.recentActivity');

    const validRecords = records.filter(
        (r) => r && typeof r.id === 'number' && r.service_type
    );

    return (
        <div className="space-y-5 mx-1">
            {/* Header */}
            <div className="space-y-1 mx-1">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {t('title', { fallback: 'Recent activity' })}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                    {t('description', { fallback: 'Latest usage records across your services.' })}
                </p>
            </div>

            {validRecords.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 110, damping: 14 }}
                    className="flex items-center justify-center rounded-4xl border border-border/60 bg-card p-14"
                >
                    <p className="text-sm text-muted-foreground">
                        {t('empty', { fallback: 'No recent activity yet.' })}
                    </p>
                </motion.div>
            ) : (
                <div className="rounded-2xl border border-primary/60 bg-card/80 overflow-hidden">
                    {/* Column headers */}
                    <div className="grid grid-cols-[1fr_100px_100px_1fr] sm:grid-cols-4 items-center px-6 sm:px-10 py-5 sm:py-6 bg-primary border-b border-foreground">
                        <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-primary-foreground">
                            Service
                        </span>
                        <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-primary-foreground text-center">
                            Quantity
                        </span>
                        <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-primary-foreground text-center">
                            Unit cost
                        </span>
                        <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-primary-foreground text-right">
                            Total
                        </span>
                    </div>

                    {/* Rows */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.04, delayChildren: 0.02 }}
                    >
                        {validRecords.map((record, index) => {
                            const svc = SERVICE_CONFIG[record.service_type] ?? {
                                label: record.service_type,
                                dot: 'bg-muted-foreground',
                            };

                            return (
                                <motion.div
                                    key={record.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                                    className={cn(
                                        'grid grid-cols-[1fr_100px_100px_1fr] sm:grid-cols-4 items-center',
                                        'px-6 sm:px-10 py-4 sm:py-5',
                                        'cursor-default transition-colors duration-150 hover:bg-muted/30',
                                        index < validRecords.length - 1 && 'border-b border-foreground/10'
                                    )}
                                >
                                    {/* Service */}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={cn('h-2 w-2 rounded-full shrink-0', svc.dot)} />
                                            <span className="text-sm font-medium text-foreground truncate">
                                                {svc.label}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-muted-foreground mt-1 block pl-4">
                                            {formatDate(record.created_at)}
                                        </span>
                                    </div>

                                    {/* Quantity */}
                                    <span className="text-sm font-medium text-foreground text-center">
                                        {formatQuantity(record.quantity)}
                                    </span>

                                    {/* Unit cost */}
                                    <span className="text-sm text-muted-foreground text-center truncate px-1">
                                        {record.unit_cost}
                                    </span>

                                    {/* Total */}
                                    <div className="text-right min-w-0">
                                        <span className="text-sm font-medium text-foreground truncate block">
                                            {record.total_cost}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Footer summary */}
                    <div className="flex items-center justify-between px-6 sm:px-10 py-4 border-t border-foreground/10 bg-background/20">
                        <span className="text-sm text-muted-foreground">
                            {validRecords.length} record{validRecords.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-base font-semibold text-foreground">
                            {sumTotal(validRecords)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}