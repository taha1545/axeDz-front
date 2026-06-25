import type { Transaction, Payment } from '@/types';

export const mockTransactions: Transaction[] = [
    {
        id: 1, user_id: 42, wallet_id: 7,
        type: 'deposit', amount: '50000.00', status: 'success',
        reference_id: 'DEP-2026-0001', created_at: '2026-06-22T09:15:00Z', updated_at: '2026-06-22T09:15:00Z',
    },
    {
        id: 2, user_id: 42, wallet_id: 7,
        type: 'usage', amount: '1250.00', status: 'success',
        reference_id: 'USG-2026-0001', created_at: '2026-06-22T10:30:00Z', updated_at: '2026-06-22T10:30:00Z',
    },
    {
        id: 3, user_id: 42, wallet_id: 7,
        type: 'usage', amount: '3400.00', status: 'success',
        reference_id: 'USG-2026-0002', created_at: '2026-06-22T14:45:00Z', updated_at: '2026-06-22T14:45:00Z',
    },
    {
        id: 4, user_id: 42, wallet_id: 7,
        type: 'refund', amount: '200.00', status: 'success',
        reference_id: 'REF-2026-0001', created_at: '2026-06-23T08:00:00Z', updated_at: '2026-06-23T08:00:00Z',
    },
    {
        id: 5, user_id: 42, wallet_id: 7,
        type: 'deposit', amount: '25000.00', status: 'success',
        reference_id: 'DEP-2026-0002', created_at: '2026-06-23T11:20:00Z', updated_at: '2026-06-23T11:20:00Z',
    },
    {
        id: 6, user_id: 42, wallet_id: 7,
        type: 'usage', amount: '7800.00', status: 'pending',
        reference_id: 'USG-2026-0003', created_at: '2026-06-23T16:10:00Z', updated_at: '2026-06-23T16:10:00Z',
    },
    {
        id: 7, user_id: 42, wallet_id: 7,
        type: 'adjustment', amount: '500.00', status: 'success',
        reference_id: 'ADJ-2026-0001', created_at: '2026-06-23T17:55:00Z', updated_at: '2026-06-23T17:55:00Z',
    },
    {
        id: 8, user_id: 42, wallet_id: 7,
        type: 'usage', amount: '150.00', status: 'failed',
        reference_id: 'USG-2026-0004', created_at: '2026-06-24T06:30:00Z', updated_at: '2026-06-24T06:30:00Z',
    },
    {
        id: 9, user_id: 42, wallet_id: 7,
        type: 'deposit', amount: '100000.00', status: 'success',
        reference_id: 'DEP-2026-0003', created_at: '2026-06-24T08:00:00Z', updated_at: '2026-06-24T08:00:00Z',
    },
    {
        id: 10, user_id: 42, wallet_id: 7,
        type: 'usage', amount: '2200.00', status: 'success',
        reference_id: 'USG-2026-0005', created_at: '2026-06-24T10:15:00Z', updated_at: '2026-06-24T10:15:00Z',
    },
    {
        id: 11, user_id: 42, wallet_id: 7,
        type: 'refund', amount: '450.00', status: 'pending',
        reference_id: 'REF-2026-0002', created_at: '2026-06-24T12:40:00Z', updated_at: '2026-06-24T12:40:00Z',
    },
    {
        id: 12, user_id: 42, wallet_id: 7,
        type: 'usage', amount: '5600.00', status: 'success',
        reference_id: 'USG-2026-0006', created_at: '2026-06-24T14:00:00Z', updated_at: '2026-06-24T14:00:00Z',
    },
    {
        id: 13, user_id: 42, wallet_id: 7,
        type: 'adjustment', amount: '-300.00', status: 'success',
        reference_id: 'ADJ-2026-0002', created_at: '2026-06-24T15:30:00Z', updated_at: '2026-06-24T15:30:00Z',
    },
    {
        id: 14, user_id: 42, wallet_id: 7,
        type: 'deposit', amount: '15000.00', status: 'pending',
        reference_id: 'DEP-2026-0004', created_at: '2026-06-24T16:45:00Z', updated_at: '2026-06-24T16:45:00Z',
    },
    {
        id: 15, user_id: 42, wallet_id: 7,
        type: 'usage', amount: '890.00', status: 'success',
        reference_id: 'USG-2026-0007', created_at: '2026-06-24T18:20:00Z', updated_at: '2026-06-24T18:20:00Z',
    },
];

export const mockPayments: Payment[] = [
    {
        id: 1, user_id: 42, amount: '50000.00', currency: 'DZD', status: 'success',
        order_id: 'ORD-2026-0001', raw_response: null, created_at: '2026-06-22T09:15:00Z', updated_at: '2026-06-22T09:16:00Z',
    },
    {
        id: 2, user_id: 42, amount: '25000.00', currency: 'DZD', status: 'success',
        order_id: 'ORD-2026-0002', raw_response: null, created_at: '2026-06-23T11:20:00Z', updated_at: '2026-06-23T11:21:00Z',
    },
    {
        id: 3, user_id: 42, amount: '100000.00', currency: 'DZD', status: 'pending',
        order_id: 'ORD-2026-0003', raw_response: null, created_at: '2026-06-24T08:00:00Z', updated_at: '2026-06-24T08:00:00Z',
    },
    {
        id: 4, user_id: 42, amount: '15000.00', currency: 'DZD', status: 'success',
        order_id: 'ORD-2026-0004', raw_response: null, created_at: '2026-06-24T16:45:00Z', updated_at: '2026-06-24T16:46:00Z',
    },
    {
        id: 5, user_id: 42, amount: '75000.00', currency: 'DZD', status: 'failed',
        order_id: 'ORD-2026-0005', raw_response: null, created_at: '2026-06-20T14:00:00Z', updated_at: '2026-06-20T14:01:00Z',
    },
    {
        id: 6, user_id: 42, amount: '30000.00', currency: 'DZD', status: 'success',
        order_id: 'ORD-2026-0006', raw_response: null, created_at: '2026-06-19T10:30:00Z', updated_at: '2026-06-19T10:31:00Z',
    },
    {
        id: 7, user_id: 42, amount: '120000.00', currency: 'DZD', status: 'success',
        order_id: 'ORD-2026-0007', raw_response: null, created_at: '2026-06-18T09:00:00Z', updated_at: '2026-06-18T09:01:00Z',
    },
    {
        id: 8, user_id: 42, amount: '5000.00', currency: 'DZD', status: 'refunded',
        order_id: 'ORD-2026-0008', raw_response: null, created_at: '2026-06-17T15:20:00Z', updated_at: '2026-06-17T15:21:00Z',
    },
    {
        id: 9, user_id: 42, amount: '20000.00', currency: 'DZD', status: 'success',
        order_id: 'ORD-2026-0009', raw_response: null, created_at: '2026-06-16T12:00:00Z', updated_at: '2026-06-16T12:01:00Z',
    },
    {
        id: 10, user_id: 42, amount: '45000.00', currency: 'DZD', status: 'pending',
        order_id: 'ORD-2026-0010', raw_response: null, created_at: '2026-06-25T07:30:00Z', updated_at: '2026-06-25T07:30:00Z',
    },
];
