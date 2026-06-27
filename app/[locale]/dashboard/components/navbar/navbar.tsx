'use client';

import { useTranslations } from 'next-intl';
import { ProjectSelectTrigger } from './project-select-trigger';
import { BalanceCard } from './balance-card';
import { UserMenu } from './user-menu';
import type { Project, DashboardUser } from '@/types/dashboard';

interface NavbarProps {
    user?: DashboardUser | null;
    projects: Project[];
    currentProject?: Project;
    onOpenProjectModal: () => void;
}

export function Navbar({ user, currentProject, onOpenProjectModal, }: NavbarProps) {
    //
    const t = useTranslations('dashboard.navbar');
    //
    const isFree = !user?.wallet || user.wallet.is_free;
    const balance = user?.wallet ? parseFloat(user.wallet.balance) : 0;
    const currency = user?.wallet?.currency ?? 'DZD';

    return (
        <header className="sticky top-0 z-30 hidden md:flex h-20 bg-card/30 items-center gap-4 border-b border-foreground/30 backdrop-blur-xl px-4 sm:px-6">
            <ProjectSelectTrigger
                currentProject={currentProject}
                onClick={onOpenProjectModal}
            />

            <div className="flex-1" />

            <div className="flex items-center gap-2">
                <BalanceCard
                    balance={balance}
                    currency={currency}
                    isProduction={!isFree}
                />

                <div className="h-6 w-px bg-border hidden sm:block" />

                <UserMenu user={user} />
            </div>
        </header>
    );
}