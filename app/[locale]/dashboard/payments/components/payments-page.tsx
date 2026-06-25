'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PaymentHeader } from './PaymentHeader';
import { ActivationCard } from './ActivationCard';
import { WalletOverview } from './WalletOverview';
import { QuickActions } from './QuickActions';
import { PaymentHistoryTable } from './PaymentHistoryTable';
import type { Payment } from '@/types';
import { customToast } from '@/components/custom-toast';

interface PaymentsPageProps {
    isProduction: boolean;
    balance: string;
    totalDeposits: string;
    totalUsage: string;
    alertThreshold: string | null;
    payments: Payment[];
    onActivate: () => Promise<void>;
    onSaveThreshold: (threshold: number) => Promise<void>;
    onAddFunds: (amount: number) => Promise<void>;
}

export function PaymentsPage({
    isProduction,
    balance,
    totalDeposits,
    totalUsage,
    alertThreshold,
    payments,
    onActivate,
    onSaveThreshold,
    onAddFunds,
}: PaymentsPageProps) {
    const [isActivating, setIsActivating] = useState(false);
    const [isSavingThreshold, setIsSavingThreshold] = useState(false);
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [fundAmount, setFundAmount] = useState('');
    const [fundError, setFundError] = useState<string | null>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    const handleActivate = useCallback(async () => {
        setIsActivating(true);
        try {
            await onActivate();
            customToast.success({ title: 'Production mode activated successfully!' });
        } catch {
            customToast.error({ title: 'Failed to activate production mode. Please try again.' });
        } finally {
            setIsActivating(false);
        }
    }, [onActivate]);

    const handleSaveThreshold = useCallback(async (threshold: number) => {
        setIsSavingThreshold(true);
        try {
            await onSaveThreshold(threshold);
            customToast.success({ title: 'Alert threshold saved successfully!' });
        } catch {
            customToast.error({ title: 'Failed to save alert threshold.' });
        } finally {
            setIsSavingThreshold(false);
        }
    }, [onSaveThreshold]);

    const handleAddFunds = useCallback(async () => {
        const amount = Number(fundAmount);
        if (isNaN(amount) || amount <= 0) {
            setFundError('Amount must be positive');
            return;
        }
        if (amount < 100) {
            setFundError('Minimum amount is 100 DZD');
            return;
        }
        setFundError(null);
        try {
            await onAddFunds(amount);
            customToast.success({ title: 'Payment initiated successfully!' });
            setShowAddFunds(false);
            setFundAmount('');
        } catch {
            customToast.error({ title: 'Failed to initiate payment.' });
        }
    }, [fundAmount, onAddFunds]);

    const handleClose = useCallback(() => {
        setShowAddFunds(false);
        setFundError(null);
        setFundAmount('');
    }, []);

    // Click outside to close
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

    const currency = 'DZD';

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

            {/* Add Funds Dialog */}
            <AnimatePresence>
                {showAddFunds && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  p-4"
                    >
                        <motion.div
                            ref={dialogRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="w-full max-w-xl rounded-[2rem] border border-foreground bg-card p-8 shadow-md shadow-primary/20 sm:p-10"
                        >
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <h3 className="text-2xl font-bold tracking-tight uppercase text-foreground">
                                    Add Funds
                                </h3>
                                <p className="mt-1.5 text-sm text-muted-foreground">
                                    Top up your wallet securely
                                </p>
                            </div>

                            {/* Input */}
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-col space-y-2.5">
                                    <label className="text-sm  mx-2  font-semibold uppercase tracking-wider text-muted-foreground">
                                        Amount
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={fundAmount}
                                            onChange={(e) => { setFundAmount(e.target.value); setFundError(null); }}
                                            placeholder="Enter amount"
                                            autoFocus
                                            className={cn(
                                                'w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none',
                                                'transition-all placeholder:text-muted-foreground/50',
                                                'focus:border-primary focus:ring-2 focus:ring-primary/20',
                                                fundError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-border'
                                            )}
                                        />
                                    </div>
                                    {fundError && (
                                        <p className="text-xs font-medium text-red-500">{fundError}</p>
                                    )}
                                    <p className="text-xs mx-2 text-muted-foreground/70">
                                        Minimum amount: 100 {currency}
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleClose}
                                        className="flex-1 rounded-xl border border-background  py-3 text-sm font-semibold text-foreground transition-all hover:border-foreground/20 hover:text-foreground active:scale-[0.98]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddFunds}
                                        className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                                    >
                                        Proceed to Payment
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