'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    labelKey: string;
    external?: boolean;
}

interface NavLinkProps {
    item: NavItem;
    isActive: boolean;
    isBottom?: boolean;
    label: string;
}

export function NavLink({ item, isActive, label }: NavLinkProps) {
    const baseClasses = cn(
        'flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 group',
        isActive
            ? 'bg-primary/95 text-white shadow-sm'
            : 'text-foreground hover:bg-muted hover:text-foreground'
    );

    const content = (
        <>
            <item.icon
                className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                )}
            />
            <span>{label}</span>
            {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
            )}
        </>
    );

    if (item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseClasses}
            >
                {content}
                <div className="ml-auto">
                    <ChevronRight className="h-5 w-5" />
                </div>
            </a>
        );
    }

    return (
        <Link href={item.href} className={baseClasses}>
            {content}
        </Link>
    );
}