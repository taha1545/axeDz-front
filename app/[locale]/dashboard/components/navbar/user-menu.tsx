'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useDashboardContext } from '@/providers/dashboard-provider';
import type { DashboardUser } from '@/types/dashboard';

interface UserMenuProps {
    user?: DashboardUser | null;
}

export function UserMenu({ user }: UserMenuProps) {
    const t = useTranslations('dashboard.navbar.user');
    const router = useRouter();
    const { logout } = useAuth();
    const { currentProject } = useDashboardContext();
    const [open, setOpen] = useState(false);

    const initials = user?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'U';

    const settingsHref = currentProject
        ? `/dashboard/projects/${currentProject.id}/settings`
        : '/dashboard/settings';

    const menuItems = [
        { icon: User, label: t('profile'), href: '/setting' },
        ...(currentProject ? [{ icon: Settings, label: t('settings'), href: settingsHref }] : []),
    ];

    const handleLogout = async () => {
        await logout();
        router.push('/');
        router.refresh();
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                className={cn(
                    'flex items-center gap-2.5 rounded-2xl h-11 px-3 transition-colors',
                    open ? 'bg-muted' : 'hover:bg-muted'
                )}
                onClick={() => setOpen(!open)}
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold ring-2 ring-primary/20">
                    {initials}
                </div>
                <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground leading-tight">
                        {user?.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-tight">
                        {user?.email}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform duration-200',
                        open && 'rotate-180'
                    )}
                />
            </Button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-16 z-50 w-64 rounded-xl border border-foreground/40 p-2 shadow-xl bg-card">
                        <div className="px-3 py-2.5">
                            <p className="text-sm font-semibold text-foreground truncate">
                                {user?.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {user?.email}
                            </p>
                        </div>

                        <div className="h-px bg-foreground/50 my-1" />

                        <div className="space-y-0.5">
                            {menuItems.map((item) => (
                                <button
                                    key={item.label}
                                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                                    onClick={() => {
                                        router.push(item.href);
                                        setOpen(false);
                                    }}
                                >
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="h-px bg-foreground/50 my-1" />

                        <button
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            {t('logout')}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}