'use client';

import type { EmailRecord } from '@/types';
import { useEmailsFilters } from '../hooks/use-emails-filters';
import { EmailsEmptyState } from './emails-empty-state';
import { EmailsHeader } from './emails-header';
import { EmailsPagination } from './emails-pagination';
import { EmailsTable } from './emails-table';
import { EmailsToolbar } from './emails-toolbar';

interface EmailsPageProps {
    records: EmailRecord[];
}

export function EmailsPage({ records }: EmailsPageProps) {
    const {
        search,
        statusFilter,
        filtered,
        paged,
        safePage,
        totalPages,
        start,
        pageNumbers,
        handleSearch,
        clearSearch,
        handleStatusFilter,
        handlePrev,
        handleNext,
        setPage,
    } = useEmailsFilters(records);

    return (
        <div className="space-y-6 sm:space-y-8">
            <EmailsHeader />

            {records.length > 0 && (
                <EmailsToolbar
                    search={search}
                    statusFilter={statusFilter}
                    resultCount={filtered.length}
                    onSearch={handleSearch}
                    onClearSearch={clearSearch}
                    onStatusFilter={handleStatusFilter}
                />
            )}

            {filtered.length === 0 ? (
                <EmailsEmptyState />
            ) : (
                <div className="overflow-hidden rounded-[2rem] border border-primary/40 bg-card/80 shadow-md shadow-primary/10">
                    <EmailsTable records={paged} />
                    <EmailsPagination
                        safePage={safePage}
                        totalPages={totalPages}
                        start={start}
                        total={filtered.length}
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
