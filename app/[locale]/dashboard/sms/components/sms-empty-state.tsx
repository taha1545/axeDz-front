'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function SmsEmptyState() {
    const t = useTranslations('dashboard.sms');

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
            className="flex items-center justify-center rounded-[2rem] border border-border/60 bg-card/50 p-14"
        >
            <p className="text-md text-muted-foreground">{t('empty')}</p>
        </motion.div>
    );
}
