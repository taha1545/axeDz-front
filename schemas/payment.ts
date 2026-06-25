import { z } from 'zod';

export const initiatePaymentSchema = z.object({
    amount: z
        .number()
        .positive('Amount must be positive')
        .min(100, 'Minimum amount is 100 DZD'),
    currency: z.string().default('DZD'),
});

export const walletAlertSchema = z.object({
    threshold: z
        .number()
        .positive('Threshold must be positive')
        .max(100000, 'Threshold too high'),
});

export const syncPaymentSchema = z.object({
    orderId: z.string().min(1, 'Order ID is required'),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;
export type WalletAlertInput = z.infer<typeof walletAlertSchema>;
export type SyncPaymentInput = z.infer<typeof syncPaymentSchema>;