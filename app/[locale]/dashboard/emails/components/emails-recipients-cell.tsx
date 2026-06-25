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

interface EmailsRecipientsCellProps {
    emails: string[];
}

export function EmailsRecipientsCell({ emails }: EmailsRecipientsCellProps) {
    const t = useTranslations('dashboard.emails');

    if (emails.length === 0) {
        return <span className="text-sm text-muted-foreground">—</span>;
    }

    if (emails.length === 1) {
        return (
            <span className="truncate text-sm font-medium text-foreground" title={emails[0]}>
                {emails[0]}
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
                    {t('recipientCount', { count: emails.length })}
                    <CaretDown className="size-3.5 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[12rem] rounded-xl">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {t('recipients')}
                </DropdownMenuLabel>
                {emails.map((email) => (
                    <DropdownMenuItem key={email} className="text-sm">
                        {email}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
