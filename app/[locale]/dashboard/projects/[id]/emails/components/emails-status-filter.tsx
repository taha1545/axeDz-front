'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, Funnel, X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EMAIL_ALL_STATUSES, EMAIL_STATUS_MAP } from '../constants';

interface EmailsStatusFilterProps {
    statusFilter: string | null;
    onStatusFilter: (status: string | null) => void;
}

export function EmailsStatusFilter({ statusFilter, onStatusFilter }: EmailsStatusFilterProps) {
    const t = useTranslations('dashboard.emails');
    const [showFilter, setShowFilter] = useState(false);

    const handleSelect = (status: string | null) => {
        onStatusFilter(status);
        setShowFilter(false);
    };

    return (
        <div className="relative flex items-center gap-1">
            <Button
                variant={statusFilter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowFilter((prev) => !prev)}
                className={cn(
                    'h-11 gap-2 rounded-xl px-5 text-sm transition-all',
                    statusFilter
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-foreground text-background hover:bg-foreground/90 hover:text-background'
                )}
            >
                <Funnel className="size-4" weight={statusFilter ? 'fill' : 'regular'} />
                <span className="capitalize">
                    {statusFilter ? (EMAIL_STATUS_MAP[statusFilter]?.label ?? statusFilter) : t('allStatus')}
                </span>
            </Button>

            {statusFilter && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={t('clearFilter')}
                    onClick={() => handleSelect(null)}
                    className="size-9 rounded-lg text-muted-foreground hover:text-foreground"
                >
                    <X className="size-4" />
                </Button>
            )}

            <AnimatePresence>
                {showFilter && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-primary/20 bg-popover shadow-xl shadow-primary/5"
                        >
                            <div className="p-2">
                                <button
                                    type="button"
                                    onClick={() => handleSelect(null)}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted',
                                        !statusFilter && 'bg-primary/10 text-primary'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex size-5 items-center justify-center rounded-md border transition-colors',
                                            !statusFilter
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-muted-foreground/30 text-muted-foreground'
                                        )}
                                    >
                                        {!statusFilter && <Check className="size-3.5" weight="bold" />}
                                    </span>
                                    {t('allStatus')}
                                </button>
                            </div>

                            <div className="mx-3 border-t" />

                            <div className="space-y-0.5 p-2">
                                {EMAIL_ALL_STATUSES.map((status) => {
                                    const cfg = EMAIL_STATUS_MAP[status];
                                    const active = statusFilter === status;

                                    return (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => handleSelect(status)}
                                            className={cn(
                                                'flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-sm transition-all',
                                                active
                                                    ? cn(cfg.bg, 'border-l-2', cfg.border)
                                                    : 'border-l-2 border-l-transparent hover:bg-muted'
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                                                    active
                                                        ? 'border-primary bg-primary text-primary-foreground'
                                                        : 'border-muted-foreground/30'
                                                )}
                                            >
                                                {active && <Check className="size-3.5" weight="bold" />}
                                            </span>
                                            <span className={cn('font-medium', active ? cfg.text : 'text-foreground')}>
                                                {cfg.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
