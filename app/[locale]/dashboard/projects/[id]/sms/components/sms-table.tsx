'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { SmsRecord } from '@/types';
import { SMS_TABLE_GRID } from '../constants';
import { SmsTableRow, SmsTableRowMobile } from './sms-table-row';

interface SmsTableProps {
    records: SmsRecord[];
}

const TABLE_COLUMNS = ['status', 'to', 'message', 'sentAt', 'createdAt'] as const;

export function SmsTable({ records }: SmsTableProps) {
    const t = useTranslations('dashboard.sms');

    return (
        <>
            <div
                className={cn(
                    'hidden items-center gap-4 border-b border-foreground/10 bg-primary px-6 py-6 md:grid lg:px-10',
                    SMS_TABLE_GRID
                )}
            >
                {TABLE_COLUMNS.map((key) => (
                    <span
                        key={key}
                        className={cn(
                            'text-xs font-semibold uppercase tracking-wider text-primary-foreground sm:text-sm',
                            (key === 'sentAt' || key === 'createdAt') && 'text-right'
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
                        <SmsTableRow record={record} isLast={index === records.length - 1} />
                        <SmsTableRowMobile record={record} isLast={index === records.length - 1} />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}
