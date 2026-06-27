'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { Logo } from '@/components/logo';
import { NewProjectButton } from './new-project-button';
import { NavLink, type NavItem } from './nav-links';
import { useDashboardContext } from '@/providers/dashboard-provider';
import { LayoutDashboard, MessageSquare, Mail, CreditCard, Settings, BookOpen, HelpCircle, } from 'lucide-react';

const bottomNav: NavItem[] = [
    { icon: BookOpen, href: '/docs', labelKey: 'docs', external: true },
    { icon: HelpCircle, href: '/help', labelKey: 'help', external: true },
];

export function Sidebar() {
    //
    const t = useTranslations('dashboard.sidebar');
    const pathname = usePathname();
    const { currentProject } = useDashboardContext();
    //
    const mainNav: NavItem[] = currentProject
        ? [
            { icon: LayoutDashboard, href: `/dashboard/projects/${currentProject.id}`, labelKey: 'main' },
            { icon: MessageSquare, href: `/dashboard/projects/${currentProject.id}/sms`, labelKey: 'sms' },
            { icon: Mail, href: `/dashboard/projects/${currentProject.id}/emails`, labelKey: 'emails' },
            { icon: CreditCard, href: `/dashboard/projects/${currentProject.id}/payments`, labelKey: 'payment' },
            { icon: Settings, href: `/dashboard/projects/${currentProject.id}/settings`, labelKey: 'settings' },
        ]
        : [
            { icon: LayoutDashboard, href: '/dashboard', labelKey: 'projects' },
        ];

    return (
        <aside className="hidden md:flex md:w-[25%] max-w-72 flex-col border-r border-foreground/30 bg-card/20">
            {/* Logo */}
            <div className="flex h-20 items-center justify-center border-b border-foreground/30">
                <Logo size="lg" priority withLink />
            </div>

            {/* New Project Button */}
            <div className="px-4 pt-4">
                <NewProjectButton />
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-auto px-3 py-4">
                <div className="space-y-1">
                    {mainNav.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            isActive={pathname === item.href}
                            label={t(item.labelKey)}
                        />
                    ))}
                </div>
            </nav>

            {/* Bottom Links */}
            <div className="border-t border-foreground/30 p-3">
                <div className="space-y-1">
                    {bottomNav.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            isActive={pathname === item.href}
                            isBottom
                            label={t(item.labelKey)}
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
}