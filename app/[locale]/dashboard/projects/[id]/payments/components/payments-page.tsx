'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
    useInitiatePayment,
    usePaymentHistory,
    useSetAlert,
    useSwitchToProduction,
    useWallet,
} from '@/hooks/use-payment';
import { PaymentHeader } from './PaymentHeader';
import { ActivationCard } from './ActivationCard';
import { WalletOverview } from './WalletOverview';
import { QuickActions } from './QuickActions';
import { PaymentHistoryTable } from './PaymentHistoryTable';
import { customToast } from '@/components/custom-toast';
import { getSatimRedirectUrl } from '../utils';

export function PaymentsPage() {
    const t = useTranslations('dashboard.payments');
    const { data: wallet, isLoading: isWalletLoading, isError: isWalletError } = useWallet();
    const { data: history, isLoading: isHistoryLoading, isError: isHistoryError } = usePaymentHistory();

    const switchToProduction = useSwitchToProduction();
    const setAlertMutation = useSetAlert();
    const initiatePayment = useInitiatePayment();

    const [isActivating, setIsActivating] = useState(false);
    const [isSavingThreshold, setIsSavingThreshold] = useState(false);
    const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [fundAmount, setFundAmount] = useState('');
    const [fundError, setFundError] = useState<string | null>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    const payments = history?.payments ?? [];
    const transactions = history?.transactions ?? [];

    const isProduction = wallet ? !wallet.is_free : false;
    const balance = wallet?.balance ?? '0.00';
    const currency = wallet?.currency ?? 'DZD';
    const alertThreshold = wallet?.low_balance_alert ?? null;

    const totalDeposits = useMemo(
        () =>
            payments
                .filter((p) => p.status === 'success')
                .reduce((sum, p) => sum + parseFloat(p.amount), 0)
                .toString(),
        [payments]
    );

    const totalUsage = useMemo(
        () =>
            transactions
                .filter((tx) => tx.type === 'usage' && tx.status === 'success')
                .reduce((sum, tx) => sum + Math.abs(parseFloat(tx.amount)), 0)
                .toString(),
        [transactions]
    );

    const handleActivate = useCallback(async () => {
        setIsActivating(true);
        try {
            await switchToProduction.mutateAsync();
            customToast.success({ title: t('toasts.activateSuccess') });
        } catch {
            customToast.error({ title: t('toasts.activateError') });
        } finally {
            setIsActivating(false);
        }
    }, [switchToProduction, t]);

    const handleSaveThreshold = useCallback(
        async (threshold: number) => {
            setIsSavingThreshold(true);
            try {
                await setAlertMutation.mutateAsync(threshold);
                customToast.success({ title: t('toasts.thresholdSuccess') });
            } catch {
                customToast.error({ title: t('toasts.thresholdError') });
            } finally {
                setIsSavingThreshold(false);
            }
        },
        [setAlertMutation, t]
    );

    const handleAddFunds = useCallback(async () => {
        const amount = Number(fundAmount);
        if (isNaN(amount) || amount <= 0) {
            setFundError(t('quickActions.thresholdPositive'));
            return;
        }
        if (amount < 100) {
            setFundError(t('addFundsMin', { currency }));
            return;
        }
        setFundError(null);
        setIsInitiatingPayment(true);
        try {
            const result = await initiatePayment.mutateAsync({ amount, currency });
            const redirectUrl = getSatimRedirectUrl(result?.satim);
            if (redirectUrl) {
                window.location.href = redirectUrl;
                return;
            }
            customToast.success({ title: t('toasts.paymentInitiated') });
            setShowAddFunds(false);
            setFundAmount('');
        } catch {
            customToast.error({ title: t('toasts.paymentError') });
        } finally {
            setIsInitiatingPayment(false);
        }
    }, [fundAmount, currency, initiatePayment, t]);

    const handleClose = useCallback(() => {
        setShowAddFunds(false);
        setFundError(null);
        setFundAmount('');
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                handleClose();
            }
        };
        if (showAddFunds) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showAddFunds, handleClose]);

    if (isWalletLoading || isHistoryLoading) return null;

    if (isWalletError || isHistoryError) {
        return (
            <div className="mx-auto max-w-6xl space-y-12 pb-20 pt-1">
                <PaymentHeader isProduction={isProduction} />
                <div className="flex items-center justify-center rounded-[2rem] border border-destructive/30 bg-destructive/5 p-14">
                    <p className="text-md text-destructive">{t('loadError')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-12 pb-20 pt-1">
            <PaymentHeader isProduction={isProduction} />

            {!isProduction && (
                <ActivationCard onActivate={handleActivate} isActivating={isActivating} />
            )}

            {isProduction && (
                <>
                    <WalletOverview
                        balance={balance}
                        totalDeposits={totalDeposits}
                        totalUsage={totalUsage}
                        alertThreshold={alertThreshold}
                        currency={currency}
                    />

                    <QuickActions
                        onAddFunds={() => setShowAddFunds(true)}
                        alertThreshold={alertThreshold}
                        onSaveThreshold={handleSaveThreshold}
                        isSavingThreshold={isSavingThreshold}
                    />
                </>
            )}

            <PaymentHistoryTable payments={payments} />

            <AnimatePresence>
                {showAddFunds && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    >
                        <motion.div
                            ref={dialogRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="w-full max-w-xl rounded-[2rem] border border-foreground bg-card p-8 shadow-md shadow-primary/20 sm:p-10"
                        >
                            <div className="mb-8 text-center">
                                <h3 className="text-2xl font-bold tracking-tight uppercase text-foreground">
                                    {t('quickActions.addFunds')}
                                </h3>
                                <p className="mt-1.5 text-sm text-muted-foreground">
                                    {t('quickActions.addFundsDesc')}
                                </p>
                            </div>

                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-col space-y-2.5">
                                    <label className="mx-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                        {t('addFundsAmount')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={fundAmount}
                                            onChange={(e) => {
                                                setFundAmount(e.target.value);
                                                setFundError(null);
                                            }}
                                            placeholder={t('addFundsPlaceholder')}
                                            autoFocus
                                            className={cn(
                                                'w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none',
                                                'transition-all placeholder:text-muted-foreground/50',
                                                'focus:border-primary focus:ring-2 focus:ring-primary/20',
                                                fundError
                                                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                                                    : 'border-border'
                                            )}
                                        />
                                    </div>
                                    {fundError && (
                                        <p className="text-xs font-medium text-red-500">{fundError}</p>
                                    )}
                                    <p className="mx-2 text-xs text-muted-foreground/70">
                                        {t('addFundsMin', { currency })}
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleClose}
                                        disabled={isInitiatingPayment}
                                        className="flex-1 rounded-xl border border-background py-3 text-sm font-semibold text-foreground transition-all hover:border-foreground/20 hover:text-foreground active:scale-[0.98] disabled:opacity-60"
                                    >
                                        {t('addFundsCancel')}
                                    </button>
                                    <button
                                        onClick={handleAddFunds}
                                        disabled={isInitiatingPayment}
                                        className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-60"
                                    >
                                        {isInitiatingPayment ? t('addFundsProcessing') : t('addFundsProceed')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
