'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { NewProjectButton } from './new-project-button';
import {
    LayoutDashboard,
    MessageSquare,
    Mail,
    Cloud,
    CreditCard,
    Settings,
    BookOpen,
    HelpCircle,
    ChevronRight
} from 'lucide-react';


const mainNav = [
    { icon: LayoutDashboard, href: '/dashboard', labelKey: 'main' },
    { icon: MessageSquare, href: '/dashboard/sms', labelKey: 'sms' },
    { icon: Mail, href: '/dashboard/emails', labelKey: 'emails' },
    { icon: CreditCard, href: '/dashboard/payments', labelKey: 'payment' },
    { icon: Settings, href: '/dashboard/settings', labelKey: 'settings' },
];

const bottomNav = [
    { icon: BookOpen, href: '/docs', labelKey: 'docs', external: true },
    { icon: HelpCircle, href: '/help', labelKey: 'help', external: true },
];

export function Sidebar() {
    //
    const t = useTranslations('dashboard.sidebar');
    const pathname = usePathname();
    //
    const NavLink = ({ item, isBottom = false, }: {
        item: (typeof mainNav)[0] & { external?: boolean };
        isBottom?: boolean;
    }) => {
        const isActive = pathname === item.href;
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
                <span>{t(item.labelKey)}</span>
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
                    <div className='ml-auto'>
                        <ChevronRight className='h-5 w-5 ' />
                    </div>

                </a>
            );
        }

        return (
            <Link href={item.href} className={baseClasses}>
                {content}
            </Link>
        );
    };

    return (
        <aside className="hidden md:flex  md:w-[25%] max-w-72 flex-col border-r border-foreground/30 bg-card/20">
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
                        <NavLink key={item.href} item={item} />
                    ))}
                </div>
            </nav>

            {/* Bottom Links */}
            <div className="border-t border-foreground/30 p-3">
                <div className="space-y-1">
                    {bottomNav.map((item) => (
                        <NavLink key={item.href} item={item} isBottom />
                    ))}
                </div>
            </div>
        </aside>
    );
}