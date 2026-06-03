import {
    BookOpen,
    CreditCard,
    KeyRound,
    Layers,
    Rocket,
    Terminal,
    AlertCircle,
    type LucideIcon,
} from 'lucide-react';

export const DOCS_VERSION = 'v1.0';

export interface DocsNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

export interface DocsNavGroup {
    title: string;
    items: DocsNavItem[];
}

export const docsNavGroups: DocsNavGroup[] = [
    {
        title: 'Getting started',
        items: [
            { label: 'Overview', href: '/docs', icon: BookOpen },
            { label: 'Quickstart', href: '/docs/quickstart', icon: Rocket },
            { label: 'SDK', href: '/docs/sdk', icon: Terminal },
        ],
    },
    {
        title: 'Platform',
        items: [
            { label: 'Authentication', href: '/docs/authentication', icon: KeyRound },
            { label: 'Payment', href: '/docs/payment', icon: CreditCard },
        ],
    },
    {
        title: 'Reference',
        items: [
            { label: 'API Reference', href: '/docs/api-reference', icon: Layers },
            { label: 'Errors', href: '/docs/errors', icon: AlertCircle },
        ],
    },
];

export const PRICING = {
    sms: { label: 'SMS', price: 2, unit: 'per message' },
    email: { label: 'Email', price: 0.4, unit: 'per email' },
    storage: { label: 'Cloud Storage', price: 50, unit: 'per GB' },
    tokens: { label: 'AI Tokens', price: 0.005, unit: 'per token' },
} as const;
