'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { EmailRecord } from '@/types';
import { EMAIL_TABLE_GRID } from '../constants';
import { EmailsTableRow, EmailsTableRowMobile } from './emails-table-row';

interface EmailsTableProps {
    records: EmailRecord[];
}

const TABLE_COLUMNS = ['status', 'to', 'subject', 'sentAt'] as const;

export function EmailsTable({ records }: EmailsTableProps) {
    const t = useTranslations('dashboard.emails');

    return (
        <>
            <div
                className={cn(
                    'hidden items-center gap-4 border-b border-foreground/10 bg-primary px-10 py-6 md:grid lg:px-12',
                    EMAIL_TABLE_GRID
                )}
            >
                {TABLE_COLUMNS.map((key) => (
                    <span
                        key={key}
                        className={cn(
                            'text-xs font-semibold uppercase tracking-wider text-primary-foreground sm:text-sm',
                            key === 'sentAt' && 'text-right'
                        )}
                    >
                        {t(`table.${key}`)}
                    </span>
                ))}
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.04, delayChildren: 0.02 }}
            >
                {records.map((record, index) => (
                    <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                    >
                        <EmailsTableRow record={record} isLast={index === records.length - 1} />
                        <EmailsTableRowMobile record={record} isLast={index === records.length - 1} />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}
