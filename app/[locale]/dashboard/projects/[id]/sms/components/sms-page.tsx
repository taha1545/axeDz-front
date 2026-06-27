'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useApiKeyDetail } from '@/hooks/use-key';
import { useSms } from '@/hooks/use-comn';
import { getPageNumbers } from '@/lib/pagination';
import { SMS_PAGE_SIZE } from '../constants';
import { useSmsFilters } from '../hooks/use-sms-filters';
import { SmsEmptyState } from './sms-empty-state';
import { SmsHeader } from './sms-header';
import { SmsPagination } from './sms-pagination';
import { SmsTable } from './sms-table';
import { SmsToolbar } from './sms-toolbar';

export function SmsPage() {
    const t = useTranslations('dashboard.sms');
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);
    const [page, setPage] = useState(1);

    const { data: apiKey, isLoading: isKeyLoading } = useApiKeyDetail(numericId);
    const { data, isLoading: isSmsLoading, isError } = useSms(apiKey?.key ?? '', {
        limit: SMS_PAGE_SIZE,
        offset: (page - 1) * SMS_PAGE_SIZE,
    });

    const records = data?.records ?? [];
    const total = data?.pagination?.total ?? 0;

    const {
        search,
        statusFilter,
        filtered,
        handleSearch,
        clearSearch,
        handleStatusFilter,
    } = useSmsFilters(records);

    const totalPages = Math.max(1, Math.ceil(total / SMS_PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * SMS_PAGE_SIZE;

    const pageNumbers = useMemo(
        () => getPageNumbers(totalPages, safePage),
        [totalPages, safePage]
    );

    const handleSearchChange = (value: string) => {
        handleSearch(value);
        setPage(1);
    };

    const handleClearSearch = () => {
        clearSearch();
        setPage(1);
    };

    const handleStatusFilterChange = (status: string | null) => {
        handleStatusFilter(status);
        setPage(1);
    };

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    if (isKeyLoading || isSmsLoading) return null;

    if (isError) {
        return (
            <div className="space-y-6 sm:space-y-8">
                <SmsHeader />
                <div className="flex items-center justify-center rounded-[2rem] border border-destructive/30 bg-destructive/5 p-14">
                    <p className="text-md text-destructive">{t('loadError')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <SmsHeader />

            {total > 0 && (
                <SmsToolbar
                    search={search}
                    statusFilter={statusFilter}
                    resultCount={filtered.length}
                    onSearch={handleSearchChange}
                    onClearSearch={handleClearSearch}
                    onStatusFilter={handleStatusFilterChange}
                />
            )}

            {filtered.length === 0 ? (
                <SmsEmptyState />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-primary/40 bg-card/80 shadow-md shadow-primary/10">
                    <SmsTable records={filtered} />
                    <SmsPagination
                        safePage={safePage}
                        totalPages={totalPages}
                        start={start}
                        total={total}
                        pageNumbers={pageNumbers}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}
