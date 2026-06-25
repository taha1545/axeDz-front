'use client';

import { motion } from 'framer-motion';
import { Wallet } from '@phosphor-icons/react';

interface EmptyStateProps {
    title: string;
    description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
            className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-border/60 bg-card/50 p-14 text-center"
        >
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <Wallet className="size-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">{title}</p>
            {description && (
                <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
            )}
        </motion.div>
    );
}
