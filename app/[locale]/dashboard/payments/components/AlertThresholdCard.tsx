'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Bell, FloppyDisk } from '@phosphor-icons/react';

interface AlertThresholdCardProps {
    currentThreshold: string | null;
    onSave: (threshold: number) => void;
    isSaving: boolean;
}

export function AlertThresholdCard({ currentThreshold, onSave, isSaving }: AlertThresholdCardProps) {
    const t = useTranslations('dashboard.payments.quickActions');
    const [value, setValue] = useState(currentThreshold ?? '');
    const [error, setError] = useState<string | null>(null);

    const handleSave = () => {
        const num = Number(value);
        if (isNaN(num) || num <= 0) {
            setError(t('thresholdPositive'));
            return;
        }
        if (num > 100000) {
            setError(t('thresholdMax'));
            return;
        }
        setError(null);
        onSave(num);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
            className={cn(
                'flex flex-col gap-4 rounded-3xl border border-primary/50 bg-card p-6',
                'shadow-sm transition-all duration-200 hover:shadow-md'
            )}
        >
            <div className="flex items-center mx-2">
                <div>
                    <h4 className="text-base font-bold text-foreground">{t('setAlert')}</h4>
                    <p className="text-xs text-muted-foreground">{t('setAlertDesc')}</p>
                </div>
            </div>

            <div className="flex  flex-col space-y-2 mx-2 py-2">
                <label className="text-xs  mx-2 font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('thresholdLabel')}
                </label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setError(null);
                        }}
                        placeholder={t('thresholdPlaceholder')}
                        className={cn(
                            'flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none',
                            'transition-all placeholder:text-muted-foreground/60',
                            'focus:border-primary focus:ring-1 focus:ring-primary',
                            error ? 'border-red-500' : 'border-foreground/50'
                        )}
                    />
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            'inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold',
                            'bg-primary text-primary-foreground transition-all duration-200',
                            'hover:shadow-lg hover:shadow-primary/30 active:scale-95',
                            'disabled:cursor-not-allowed disabled:opacity-60'
                        )}
                    >
                        {isSaving ? t('saving') : t('save')}
                    </button>
                </div>
                {error && (
                    <p className="text-xs font-medium text-red-500">{error}</p>
                )}
            </div>
        </motion.div>
    );
}
