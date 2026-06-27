'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useApiKeyDetail } from '@/hooks/use-key';
import { useEmails } from '@/hooks/use-comn';
import { getPageNumbers } from '@/lib/pagination';
import { EMAIL_PAGE_SIZE } from '../constants';
import { useEmailsFilters } from '../hooks/use-emails-filters';
import { EmailsEmptyState } from './emails-empty-state';
import { EmailsHeader } from './emails-header';
import { EmailsPagination } from './emails-pagination';
import { EmailsTable } from './emails-table';
import { EmailsToolbar } from './emails-toolbar';

export function EmailsPage() {
    const t = useTranslations('dashboard.emails');
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);
    const [page, setPage] = useState(1);

    const { data: apiKey, isLoading: isKeyLoading } = useApiKeyDetail(numericId);
    const { data, isLoading: isEmailsLoading, isError } = useEmails(apiKey?.key ?? '', {
        limit: EMAIL_PAGE_SIZE,
        offset: (page - 1) * EMAIL_PAGE_SIZE,
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
    } = useEmailsFilters(records);

    const totalPages = Math.max(1, Math.ceil(total / EMAIL_PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * EMAIL_PAGE_SIZE;

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

    if (isKeyLoading || isEmailsLoading) return null;

    if (isError) {
        return (
            <div className="space-y-6 sm:space-y-8">
                <EmailsHeader />
                <div className="flex items-center justify-center rounded-[2rem] border border-destructive/30 bg-destructive/5 p-14">
                    <p className="text-md text-destructive">{t('loadError')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <EmailsHeader />

            {total > 0 && (
                <EmailsToolbar
                    search={search}
                    statusFilter={statusFilter}
                    resultCount={filtered.length}
                    onSearch={handleSearchChange}
                    onClearSearch={handleClearSearch}
                    onStatusFilter={handleStatusFilterChange}
                />
            )}

            {filtered.length === 0 ? (
                <EmailsEmptyState />
            ) : (
                <div className="overflow-hidden rounded-2xl border border-primary/40 bg-card/80 shadow-md shadow-primary/10">
                    <EmailsTable records={filtered} />
                    <EmailsPagination
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
