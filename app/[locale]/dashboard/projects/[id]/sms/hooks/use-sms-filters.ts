'use client';

import { useMemo, useState } from 'react';
import type { SmsRecord } from '@/types';

export function useSmsFilters(records: SmsRecord[]) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let list = records;

        if (search.trim()) {
            const q = search.toLowerCase().trim();
            list = list.filter(
                (r) =>
                    r.to_number.some((n) => n.toLowerCase().includes(q)) ||
                    r.message.toLowerCase().includes(q) ||
                    r.provider.toLowerCase().includes(q)
            );
        }

        if (statusFilter) {
            list = list.filter((r) => r.status === statusFilter);
        }

        return list;
    }, [records, search, statusFilter]);

    const handleSearch = (value: string) => setSearch(value);

    const clearSearch = () => setSearch('');

    const handleStatusFilter = (status: string | null) => setStatusFilter(status);

    return {
        search,
        statusFilter,
        filtered,
        handleSearch,
        clearSearch,
        handleStatusFilter,
    };
}
