'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { docsNavGroups } from './docs-nav';

function isActive(pathname: string, href: string) {
    return href === '/docs' ? pathname === '/docs' : pathname.startsWith(href);
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();
    const navItems = docsNavGroups.flatMap((group) => group.items);

    return (
        <nav>
            <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                    const active = isActive(pathname, item.href);
                    const Icon = item.icon;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={onNavigate}
                                className={cn(
                                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                    active
                                        ? 'bg-primary/10 text-primary shadow-sm'
                                        : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                                )}
                            >
                                {active && (
                                    <span className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                                )}
                                <Icon
                                    className={cn(
                                        'h-4 w-4 shrink-0 transition-colors',
                                        active
                                            ? 'text-primary'
                                            : 'text-foreground/50 group-hover:text-foreground'
                                    )}
                                />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export function DocsSidebar({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
                    onClick={() => onOpenChange(false)}
                />
            )}

            <aside
                className={cn(
                    'fixed top-[var(--navbar-height)] left-0 z-50 flex h-[calc(100dvh-var(--navbar-height))] w-56 shrink-0 flex-col border-r border-border bg-background p-5 transition-transform duration-200',
                    open ? 'translate-x-0' : '-translate-x-full',
                    'lg:relative lg:top-0 lg:z-auto lg:h-full lg:translate-x-0'
                )}
            >
                <SidebarNav onNavigate={() => onOpenChange(false)} />
            </aside>
        </>
    );
}
