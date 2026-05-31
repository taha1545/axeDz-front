import {
    BarChart3,
    BookOpen,
    CircleHelp,
    CreditCard,
    Home,
    Settings,
    Zap,
    type LucideIcon,
} from 'lucide-react';

export interface DashboardNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

export interface DashboardProject {
    id: string;
    name: string;
    mode: 'sandbox' | 'production';
}

export const dashboardNavItems: DashboardNavItem[] = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'Stats', href: '/dashboard/stats', icon: BarChart3 },
    { label: 'Events', href: '/dashboard/events', icon: Zap },
    { label: 'Payment', href: '/dashboard/payment', icon: CreditCard },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const dashboardFooterLinks: DashboardNavItem[] = [
    { label: 'Help Center', href: '/help', icon: CircleHelp },
    { label: 'Documentation', href: '/docs', icon: BookOpen },
];

export const mockProjects: DashboardProject[] = [
    { id: '1', name: 'My App', mode: 'sandbox' },
    { id: '2', name: 'Production', mode: 'production' },
];

export function isNavActive(pathname: string, href: string) {
    return href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);
}
