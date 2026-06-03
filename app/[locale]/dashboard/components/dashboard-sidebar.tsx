'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    dashboardFooterLinks,
    dashboardNavItems,
    isNavActive,
} from './dashboard-nav';

/* ─── Helpers ─── */
function isExternalLink(href: string, label: string): boolean {
    const lowerLabel = label.toLowerCase();
    const lowerHref = href.toLowerCase();
    return (
        lowerHref.startsWith('/docs') ||
        lowerHref.startsWith('/help') ||
        lowerLabel.includes('doc') ||
        lowerLabel.includes('help')
    );
}

/* ─── Nav Links ─── */
function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <ul className="flex flex-col gap-1">
            {dashboardNavItems.map((item) => {
                const active = isNavActive(pathname, item.href);
                const Icon = item.icon;

                return (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            onClick={onNavigate}
                            className={cn(
                                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                active
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                            )}
                        >
                            {active && (
                                <span className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                            )}
                            <Icon
                                className={cn(
                                    'h-4 w-4 shrink-0',
                                    active ? 'text-primary' : 'text-foreground/50 group-hover:text-foreground'
                                )}
                            />
                            {item.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

/* ─── Footer Links ─── */
function FooterLinks({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <ul className="flex flex-col gap-1 border-t border-border pt-4">
            {dashboardFooterLinks.map((item) => {
                const Icon = item.icon;
                const external = isExternalLink(item.href, item.label);

                return (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            onClick={onNavigate}
                            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                pathname.startsWith(item.href)
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                external && 'after:ml-auto after:text-xs after:text-muted-foreground after:content-["↗"]'
                            )}
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            {item.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

/* ─── Sidebar ─── */
export function DashboardSidebar({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const close = () => onOpenChange(false);

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={close}
                    aria-hidden
                />
            )}

            <aside
                className={cn(
                    'fixed left-0 z-50 flex w-60 shrink-0 flex-col border-r border-border bg-background p-4 transition-transform duration-200',
                    'top-[12vh] h-[88vh]',
                    open ? 'translate-x-0' : '-translate-x-full',
                    'lg:relative lg:top-0 lg:z-auto lg:h-full lg:w-60 lg:translate-x-0'
                )}
            >
                {/* Create Project Button */}
                <div className="mb-4 shrink-0">
                    <button
                        type="button"
                        className={cn(
                            'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3',
                            'bg-primary text-sm font-semibold text-primary-foreground shadow-sm',
                            'transition-all duration-200 hover:bg-secondary hover:shadow-md active:scale-[0.98]'
                        )}
                    >
                        <Plus className="h-4 w-4" />
                        Create new project
                    </button>
                </div>

                {/* Scrollable nav */}
                <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                    <NavLinks onNavigate={close} />
                    <div className="mt-auto">
                        <FooterLinks onNavigate={close} />
                    </div>
                </nav>
            </aside>
        </>
    );
}