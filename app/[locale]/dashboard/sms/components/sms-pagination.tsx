'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SMS_PAGE_SIZE } from '../constants';

interface SmsPaginationProps {
    safePage: number;
    totalPages: number;
    start: number;
    total: number;
    pageNumbers: (number | 'ellipsis')[];
    onPrev: () => void;
    onNext: () => void;
    onPageChange: (page: number) => void;
}

export function SmsPagination({
    safePage,
    totalPages,
    start,
    total,
    pageNumbers,
    onPrev,
    onNext,
    onPageChange,
}: SmsPaginationProps) {
    const t = useTranslations('dashboard.sms');

    return (
        <div className="flex flex-col gap-4 border-t border-foreground/10 bg-background/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="text-sm text-muted-foreground">
                {t('pagination.showing', {
                    from: start + 1,
                    to: Math.min(start + SMS_PAGE_SIZE, total),
                    total,
                })}
            </span>

            <div className="flex items-center justify-center gap-1.5">
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={onPrev}
                    disabled={safePage <= 1}
                    className="rounded-lg"
                    aria-label={t('pagination.prev')}
                >
                    <ArrowLeft className="size-4" />
                </Button>

                {pageNumbers.map((page, index) =>
                    page === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-1 text-xs text-muted-foreground">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={cn(
                                'flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-all',
                                page === safePage
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            {page}
                        </button>
                    )
                )}

                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={onNext}
                    disabled={safePage >= totalPages}
                    className="rounded-lg"
                    aria-label={t('pagination.next')}
                >
                    <ArrowRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}
