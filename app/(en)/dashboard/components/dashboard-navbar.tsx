'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown, Menu, LogOut, CreditCard, UserCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDashboard } from './dashboard-provider';

/* ─── Main Navbar ─── */
export function DashboardNavbar({ onMenuOpen }: { onMenuOpen: () => void }) {
    //
    const headerRef = useRef<HTMLElement>(null);
    const { projects, activeProject, setActiveProjectId, wallet } =
        useDashboard();

    useEffect(() => {
        const setHeight = () => {
            if (headerRef.current) {
                document.documentElement.style.setProperty(
                    '--dashboard-navbar-height',
                    `${headerRef.current.offsetHeight}px`
                );
            }
        };
        setHeight();
        window.addEventListener('resize', setHeight);
        return () => window.removeEventListener('resize', setHeight);
    }, []);

    return (
        <header
            ref={headerRef}
            className="fixed inset-x-0 top-0 z-40 h-[12%] border-b border-border bg-background/95 shadow-sm backdrop-blur-md"
        >
            <div className=" mx-auto flex h-full max-w-360 items-center justify-between gap-4 px-4 sm:px-6">
                {/* ── Left ── */}
                <div className="flex items-center gap-6 ">
                    <button
                        type="button"
                        onClick={onMenuOpen}
                        className="inline-flex h-9 w-9   shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
                        aria-label="Open sidebar"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <Link href="/dashboard" className="flex shrink-0 items-center">
                        <Image
                            src="/logo.svg"
                            alt="AxeDz"
                            width={100}
                            height={30}
                            className="h-7 w-auto dark:invert"
                            priority
                        />
                    </Link>

                    <div className="hidden h-6 w-px bg-border sm:block" />

                    {/* Project Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className={cn(
                                    'group flex  ml-4 items-center gap-2 rounded-sm border-1 border-primary bg-card px-3 py-2 text-sm font-medium transition-all hover:border-primary/30 hover:bg-muted',
                                    'min-w-[160px] max-w-[240px] sm:min-w-[200px] sm:max-w-[300px]'
                                )}
                            >
                                <span className="truncate">{activeProject.name}</span>
                                <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-72">
                            <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Projects
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {projects.map((project) => (
                                <DropdownMenuItem
                                    key={project.id}
                                    onClick={() => setActiveProjectId(project.id)}
                                    className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{project.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {project.mode === 'sandbox' ? 'Sandbox' : 'Production'}
                                        </span>
                                    </div>
                                    {activeProject.id === project.id && (
                                        <Check className="h-4 w-4 shrink-0 text-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* ── Right ── */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Wallet */}
                    <div
                        className={cn(
                            'flex items-center gap-2 rounded-full px-4 py-4 text-sm font-bold sm:px-4',
                            wallet.isFreePlan
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-foreground'
                        )}
                    >
                        <CreditCard className="hidden  h-4 w-4 sm:block" />
                        {wallet.isFreePlan ? (
                            'Free Plan'
                        ) : (
                            <span className="flex items-baseline gap-1 px-3">
                                <span>{wallet.balance.toLocaleString()}</span>
                                <span className="text-xs font-medium text-primary">
                                    {wallet.currency}
                                </span>
                            </span>
                        )}
                    </div>
                    <div className="hidden h-6 w-px bg-border sm:block" />

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                aria-label="Account menu"
                                className={cn(
                                    'inline-flex h-8 w-8 items-center justify-center rounded-sm border-2 border-border',
                                    'bg-card text-foreground transition-all hover:border-primary/30 hover:shadow-sm'
                                )}
                            >
                                <UserCircle className="h-full w-full" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 mt-[5%]">
                            <div className="px-3 py-2">
                                <p className="text-sm font-semibold text-foreground">My Account</p>
                                <p className="text-xs text-muted-foreground">Manage your profile</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/setting"
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2.5"
                                >
                                    <UserCircle className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/docs/sdk"
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2.5"
                                >
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Usage</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/pricing"
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2.5"
                                >
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Pricing</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/"
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2.5 text-destructive focus:text-destructive"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="text-sm">Sign out</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


            </div>
        </header>
    );
}