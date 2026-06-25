'use client';

import { useMemo, useState } from 'react';
import type { EmailRecord } from '@/types';
import { EMAIL_PAGE_SIZE } from '../constants';

export function useEmailsFilters(records: EmailRecord[]) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        let list = records;

        if (search.trim()) {
            const q = search.toLowerCase().trim();
            list = list.filter(
                (r) =>
                    r.to_email.some((e) => e.toLowerCase().includes(q)) ||
                    r.subject.toLowerCase().includes(q) ||
                    r.body.toLowerCase().includes(q)
            );
        }

        if (statusFilter) {
            list = list.filter((r) => r.status === statusFilter);
        }

        return list;
    }, [records, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / EMAIL_PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * EMAIL_PAGE_SIZE;
    const paged = filtered.slice(start, start + EMAIL_PAGE_SIZE);

    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        const pages: (number | 'ellipsis')[] = [1];

        if (safePage > 3) pages.push('ellipsis');

        const startPage = Math.max(2, safePage - 1);
        const endPage = Math.min(totalPages - 1, safePage + 1);

        for (let i = startPage; i <= endPage; i++) pages.push(i);

        if (safePage < totalPages - 2) pages.push('ellipsis');
        pages.push(totalPages);

        return pages;
    }, [totalPages, safePage]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const clearSearch = () => {
        setSearch('');
        setPage(1);
    };

    const handleStatusFilter = (status: string | null) => {
        setStatusFilter(status);
        setPage(1);
    };

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    return {
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
    };
}
