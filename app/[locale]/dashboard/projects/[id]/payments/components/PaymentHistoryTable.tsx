'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Payment } from '@/types';
import { PAYMENT_HISTORY_PAGE_SIZE, TRANSACTION_STATUS_MAP } from '../constants';
import { EmptyState } from './EmptyState';
import { TableSkeleton } from './LoadingSkeleton';
import { getPaymentProvider } from '../utils';

interface PaymentHistoryTableProps {
    payments: Payment[];
    isLoading?: boolean;
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) +
        ' · ' +
        d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function formatAmount(amount: string): string {
    const num = parseFloat(amount);
    if (isNaN(num)) return '—';
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const TABLE_COLUMNS = ['id', 'amount', 'status', 'paidAt'] as const;

export function PaymentHistoryTable({ payments, isLoading }: PaymentHistoryTableProps) {
    const t = useTranslations('dashboard.payments.paymentHistory');
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(payments.length / PAYMENT_HISTORY_PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAYMENT_HISTORY_PAGE_SIZE;
    const paged = payments.slice(start, start + PAYMENT_HISTORY_PAGE_SIZE);

    const pageNumbers = useMemo(() => {
        const pages: (number | 'ellipsis')[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= safePage - 1 && i <= safePage + 1)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== 'ellipsis') {
                pages.push('ellipsis');
            }
        }
        return pages;
    }, [totalPages, safePage]);

    return (
        <div className="space-y-5">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {t('title')}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                    {t('description')}
                </p>
            </div>

            {isLoading ? (
                <TableSkeleton rows={4} />
            ) : payments.length === 0 ? (
                <EmptyState title={t('empty')} description={t('emptyDesc')} />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-primary/40 bg-card/80 shadow-md shadow-primary/10">
                    {/* Table header */}
                    <div className="hidden items-center gap-4 border-b border-foreground/10 bg-primary px-9 py-7 md:grid md:grid-cols-[1fr_1.1fr_1fr_0.8fr] lg:px-10">
                        {TABLE_COLUMNS.map((key) => (
                            <span
                                key={key}
                                className={cn(
                                    'text-sm font-semibold uppercase tracking-wider text-primary-foreground',
                                    key === 'amount' && 'text-start pl-4',
                                    key === 'status' && 'text-start pl-3',
                                    key === 'paidAt' && 'text-center'
                                )}
                            >
                                {t(`table.${key}`)}
                            </span>
                        ))}
                    </div>

                    {/* Rows */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.03, delayChildren: 0.01 }}
                    >
                        {paged.map((payment, index) => {
                            const statusCfg = TRANSACTION_STATUS_MAP[payment.status];
                            return (
                                <motion.div
                                    key={payment.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                                    className={cn(
                                        'hidden items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30 md:grid md:grid-cols-[1fr_1.1fr_1fr_0.8fr] lg:px-10',
                                        index < paged.length - 1 && 'border-b border-foreground/10'
                                    )}
                                >
                                    {/* ID + Provider */}
                                    <div className="flex flex-col gap-0.5 flex-nowrap w-50">
                                        <span className="break-all text-xs font-mono text-muted-foreground">
                                            #{payment.order_id}
                                        </span>
                                        <span className="text-xs font-medium text-foreground/70">
                                            {getPaymentProvider(payment)}
                                        </span>
                                    </div>

                                    {/* Amount + Currency */}
                                    <span className="text-start text-sm font-semibold tabular-nums text-foreground">
                                        {formatAmount(payment.amount)} {payment.currency}
                                    </span>

                                    {/* Status */}
                                    <span
                                        className={cn(
                                            'inline-flex w-fit min-w-[5rem] items-center justify-center rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize',
                                            statusCfg?.bg ?? 'bg-muted/40',
                                            statusCfg?.border ?? 'border-muted-foreground/20',
                                            statusCfg?.text ?? 'text-muted-foreground',
                                            statusCfg?.darkText ?? ''
                                        )}
                                    >
                                        {payment.status}
                                    </span>

                                    {/* Date */}
                                    <span className="truncate text-center text-xs text-muted-foreground">
                                        {formatDate(payment.created_at)}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Mobile cards */}
                    <div className="divide-y divide-border/40 md:hidden">
                        {paged.map((payment) => {
                            const statusCfg = TRANSACTION_STATUS_MAP[payment.status];
                            return (
                                <div key={payment.id} className="space-y-2 px-5 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-mono text-muted-foreground">
                                                #{payment.order_id}
                                            </span>
                                            <span className="text-xs font-medium text-foreground/70">
                                                {getPaymentProvider(payment)}
                                            </span>
                                        </div>
                                        <span
                                            className={cn(
                                                'inline-flex rounded-xl border px-3 py-1 text-xs font-semibold capitalize',
                                                statusCfg?.bg ?? 'bg-muted/40',
                                                statusCfg?.border ?? 'border-muted-foreground/20',
                                                statusCfg?.text ?? 'text-muted-foreground',
                                                statusCfg?.darkText ?? ''
                                            )}
                                        >
                                            {payment.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Amount
                                        </span>
                                        <span className="text-base font-bold tabular-nums text-foreground">
                                            {formatAmount(payment.amount)} {payment.currency}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDate(payment.created_at)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col gap-4 border-t border-foreground/10 bg-background/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <span className="text-sm text-muted-foreground">
                                {t('pagination.showing', {
                                    from: start + 1,
                                    to: Math.min(start + PAYMENT_HISTORY_PAGE_SIZE, payments.length),
                                    total: payments.length,
                                })}
                            </span>
                            <div className="flex items-center justify-center gap-1.5">
                                <button
                                    onClick={() => setPage(safePage - 1)}
                                    disabled={safePage <= 1}
                                    className="flex size-8 items-center justify-center rounded-lg border border-border text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label={t('pagination.prev')}
                                >
                                    ‹
                                </button>
                                {pageNumbers.map((p, i) =>
                                    p === 'ellipsis' ? (
                                        <span key={`e-${i}`} className="px-1 text-xs text-muted-foreground">...</span>
                                    ) : (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setPage(p)}
                                            className={cn(
                                                'flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-all',
                                                p === safePage
                                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            )}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}
                                <button
                                    onClick={() => setPage(safePage + 1)}
                                    disabled={safePage >= totalPages}
                                    className="flex size-8 items-center justify-center rounded-lg border border-border text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label={t('pagination.next')}
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}