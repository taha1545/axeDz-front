'use client';

import type * as React from 'react';
import { CheckCircleIcon, InfoIcon, WarningCircleIcon, XCircleIcon } from '@phosphor-icons/react';
import { Toaster, toast, type ExternalToast, type ToasterProps } from 'sonner';
import { cn } from '@/lib/utils';

type ToastTone = 'success' | 'info' | 'warning' | 'error';

type CustomToastOptions = ExternalToast & {
    title: React.ReactNode;
    description?: React.ReactNode;
};

const toneStyles: Record<
    ToastTone,
    {
        icon: React.ReactNode;
        color: string;
        bg: string;
        border: string;
    }
> = {
    success: {
        icon: <CheckCircleIcon weight="fill" className="size-5" />,
        color: 'text-[var(--success)]',
        bg: 'bg-[var(--success)]/10',
        border: 'border-[var(--success)]/20',
    },
    info: {
        icon: <InfoIcon weight="fill" className="size-5" />,
        color: 'text-primary',
        bg: 'bg-primary/10',
        border: 'border-primary/20',
    },
    warning: {
        icon: <WarningCircleIcon weight="fill" className="size-5" />,
        color: 'text-[var(--warning)]',
        bg: 'bg-[var(--warning)]/10',
        border: 'border-[var(--warning)]/20',
    },
    error: {
        icon: <XCircleIcon weight="fill" className="size-5" />,
        color: 'text-destructive',
        bg: 'bg-destructive/10',
        border: 'border-destructive/20',
    },
};

function showToast(tone: ToastTone, { title, description, ...options }: CustomToastOptions) {
    const style = toneStyles[tone];

    return toast[tone](title, {
        icon: (
            <div className={cn('flex size-9 shrink-0 items-center justify-start   mr-2', style.color)}>
                {style.icon}
            </div>
        ),
        description,
        ...options,
    });
}

export const customToast = {
    success: (opts: CustomToastOptions) => showToast('success', opts),
    info: (opts: CustomToastOptions) => showToast('info', opts),
    warning: (opts: CustomToastOptions) => showToast('warning', opts),
    error: (opts: CustomToastOptions) => showToast('error', opts),
    dismiss: toast.dismiss,
    loading: toast.loading,
    promise: toast.promise,
};

export function CustomToaster({ className, ...props }: ToasterProps) {
    return (
        <Toaster
            closeButton
            richColors={false}
            position="top-right"
            mobileOffset={16}
            dir="auto"
            className={cn('!gap-3', className)}
            toastOptions={{
                classNames: {
                    // 1. Parent Toast Container
                    toast: cn(
                        'group relative flex w-full mt-0 items-start  gap-3.5 overflow-hidden rounded-2xl p-4 pr-11',
                        'border border-border/60 bg-popover/95 backdrop-blur-md shadow-xl dark:shadow-black/30',
                        'sm:max-w-[380px] lg:max-w-[450px] max-h-[180px]'
                    ),
                    // 2. Text Content Wrapper (Fixes text sliding underneath the icon)
                    content: 'flex flex-col items-start gap-3 min-w-0 flex-1 w-full',

                    // 3. Typography & Actions
                    title: 'text-sm font-semibold text-foreground tracking-tight break-words w-full text-left',
                    description: 'text-xs leading-relaxed text-muted-foreground break-words w-full text-left',
                    actionButton:
                        'rounded-xl bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-95',
                    cancelButton:
                        'rounded-xl border border-border bg-transparent px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',

                    // 4. Close Button (Absolute layout overrides to freeze it in place)
                    closeButton: cn(
                        '!absolute !top-3.5 !right-3.5 !left-auto !transform-none',
                        'size-5 rounded-md border border-border/40 bg-background/50 backdrop-blur-sm text-muted-foreground transition-all',
                        'hover:bg-muted hover:text-foreground flex items-center justify-center'
                    ),
                },
            }}
            {...props}
        />
    );
}