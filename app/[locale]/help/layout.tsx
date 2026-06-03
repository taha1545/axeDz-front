import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Help Center',
    description:
        'Get help with AxeDz — FAQs, guides, troubleshooting, and contact support for SMS and email API.',
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
    return children;
}
