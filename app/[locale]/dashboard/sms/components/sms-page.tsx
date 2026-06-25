'use client';

import type { SmsRecord } from '@/types';
import { useSmsFilters } from '../hooks/use-sms-filters';
import { SmsEmptyState } from './sms-empty-state';
import { SmsHeader } from './sms-header';
import { SmsPagination } from './sms-pagination';
import { SmsTable } from './sms-table';
import { SmsToolbar } from './sms-toolbar';

interface SmsPageProps {
    records: SmsRecord[];
}

export function SmsPage({ records }: SmsPageProps) {
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
    } = useSmsFilters(records);

    return (
        <div className="space-y-6 sm:space-y-8">
            <SmsHeader />

            {records.length > 0 && (
                <SmsToolbar
                    search={search}
                    statusFilter={statusFilter}
                    resultCount={filtered.length}
                    onSearch={handleSearch}
                    onClearSearch={clearSearch}
                    onStatusFilter={handleStatusFilter}
                />
            )}

            {filtered.length === 0 ? (
                <SmsEmptyState />
            ) : (
                <div className="overflow-hidden rounded-[2rem] border border-primary/40 bg-card/80 shadow-md shadow-primary/10">
                    <SmsTable records={paged} />
                    <SmsPagination
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
