'use client';

import * as React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CustomButton, NormalButton } from '@/components/custom-button';
import { cn } from '@/lib/utils';

type ConfirmHandler = () => unknown | Promise<unknown>;
type CustomDialogType = 'confirmation' | 'info' | 'warning';

type CustomDialogProps = {
    type?: CustomDialogType;
    trigger?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    confirmText?: React.ReactNode;
    cancelText?: React.ReactNode;
    closeLabel?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onConfirm?: ConfirmHandler;
    isConfirmDisabled?: boolean;
    isLoading?: boolean;
    hideCancel?: boolean;
    hideActions?: boolean;
    className?: string;
    contentClassName?: string;
    footerClassName?: string;
};

const dialogTypeConfig: Record<
    CustomDialogType,
    {
        accentClassName: string;
        confirmColor: 'normal' | 'primary' | 'danger' | 'gradient';
        confirmStyleType: 'solid' | 'soft';
    }
> = {
    confirmation: {
        accentClassName: 'border-t-primary',
        confirmColor: 'primary',
        confirmStyleType: 'solid',
    },
    info: {
        accentClassName: 'border-t-primary',
        confirmColor: 'primary',
        confirmStyleType: 'solid',
    },
    warning: {
        accentClassName: 'border-t-destructive',
        confirmColor: 'danger',
        confirmStyleType: 'solid',
    },
};

export function CustomDialog({
    type = 'confirmation',
    trigger,
    title,
    description,
    children,
    confirmText,
    cancelText = 'Cancel',
    closeLabel = 'Close',
    open,
    defaultOpen,
    onOpenChange,
    onConfirm,
    isConfirmDisabled = false,
    isLoading = false,
    hideCancel = false,
    hideActions = false,
    className,
    contentClassName,
    footerClassName,
}: CustomDialogProps) {
    //
    const dialogType = dialogTypeConfig[type];

    const handleConfirm = () => {
        void onConfirm?.();
    };

    return (
        <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                closeLabel={closeLabel}
                className={cn(
                    'max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-t-4 border-border bg-popover p-0 shadow-2xl shadow-black/10 sm:max-w-lg dark:shadow-black/35',
                    dialogType.accentClassName,
                    className
                )}
            >
                <div className="grid gap-6 p-5 sm:p-6 ">
                    <DialogHeader className="gap-2 pr-8 text-center">
                        <DialogTitle className="text-balance text-xl font-semibold tracking-normal text-popover-foreground sm:text-2xl">
                            {title}
                        </DialogTitle>
                        {description && (
                            <DialogDescription className="max-w-md text-sm leading-6 text-muted-foreground">
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>

                    {children && (
                        <div className={cn('text-sm leading-6 text-popover-foreground/90', contentClassName)}>
                            {children}
                        </div>
                    )}
                </div>

                {!hideActions && (
                    <DialogFooter
                        className={cn(
                            'grid grid-cols-1 gap-2 border-t border-border bg-muted/30 p-4 sm:flex sm:items-center sm:justify-end sm:px-6 dark:bg-muted/20',
                            footerClassName
                        )}
                    >
                        {!hideCancel && (
                            <DialogClose asChild>
                                <NormalButton
                                    type="button"
                                    styleType="soft"
                                    text={cancelText}
                                    className="sm:min-w-24"
                                />
                            </DialogClose>
                        )}
                        {confirmText && (
                            <CustomButton
                                type="button"
                                color={dialogType.confirmColor}
                                styleType={dialogType.confirmStyleType}
                                text={confirmText}
                                disabled={isConfirmDisabled || isLoading}
                                onClick={handleConfirm}
                                className="sm:min-w-28"
                            />
                        )}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}

type DialogPresetProps = Omit<CustomDialogProps, 'type'>;

export function WarningDialog(props: DialogPresetProps) {
    return <CustomDialog type="warning" {...props} />;
}

export function InfoDialog(props: DialogPresetProps) {
    return <CustomDialog type="info" {...props} />;
}

export function ConfirmationDialog(props: DialogPresetProps) {
    return <CustomDialog type="confirmation" {...props} />;
}
