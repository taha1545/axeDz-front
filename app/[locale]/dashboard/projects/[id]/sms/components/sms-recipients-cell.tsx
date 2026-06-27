'use client';

import { CaretDown } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SmsRecipientsCellProps {
    numbers: string[];
}

export function SmsRecipientsCell({ numbers }: SmsRecipientsCellProps) {
    const t = useTranslations('dashboard.sms');

    if (numbers.length === 0) {
        return <span className="text-sm text-muted-foreground">—</span>;
    }

    if (numbers.length === 1) {
        return (
            <span className="truncate text-sm font-medium text-foreground" title={numbers[0]}>
                {numbers[0]}
            </span>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 rounded-lg px-2 text-sm font-medium text-foreground hover:bg-muted/60"
                >
                    {t('recipientCount', { count: numbers.length })}
                    <CaretDown className="size-3.5 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[12rem] rounded-xl">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {t('recipients')}
                </DropdownMenuLabel>
                {numbers.map((number) => (
                    <DropdownMenuItem key={number} className="font-mono text-sm">
                        {number}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
