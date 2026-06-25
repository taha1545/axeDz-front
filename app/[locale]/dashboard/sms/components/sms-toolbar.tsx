'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { Input } from '@/components/ui/input';
import { SmsStatusFilter } from './sms-status-filter';

interface SmsToolbarProps {
    search: string;
    statusFilter: string | null;
    resultCount: number;
    onSearch: (value: string) => void;
    onClearSearch: () => void;
    onStatusFilter: (status: string | null) => void;
}

export function SmsToolbar({
    search,
    statusFilter,
    resultCount,
    onSearch,
    onClearSearch,
    onStatusFilter,
}: SmsToolbarProps) {
    const t = useTranslations('dashboard.sms');

    return (
        <div className="flex flex-col gap-3 rounded-[2rem] border border-primary/20 bg-card/60 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6">
            <div className="relative min-w-0 flex-1 sm:max-w-sm">
                <MagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder={t('searchPlaceholder')}
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    className="h-11 rounded-xl border border-primary/40 bg-background/50 pl-10 pr-10 text-sm focus-visible:ring-primary/30"
                />
                <AnimatePresence>
                    {search && (
                        <motion.button
                            type="button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={onClearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <X className="size-4" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <div className="hidden h-6 w-px bg-border sm:block" />

            <SmsStatusFilter statusFilter={statusFilter} onStatusFilter={onStatusFilter} />

            <span className="text-sm text-muted-foreground sm:ml-auto">
                {t('resultCount', { count: resultCount })}
            </span>
        </div>
    );
}
