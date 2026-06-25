'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Logo } from "@/components/logo";
import { cn } from '@/lib/utils';

const NAV_KEYS = ['about', 'services', 'useCases', 'pricing', 'contact'] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
    about: '#about',
    services: '#services',
    useCases: '#use-cases',
    pricing: '#pricing',
    contact: '#contact',
};

const SOCIALS = [
    { src: '/media/linkedin.svg', href: 'https://linkedin.com/in/taha-mohamed-mansouri-15a99924b', label: 'LinkedIn' },
    { src: '/media/instgram.svg', href: 'https://www.instagram.com/axedz213', label: 'Instagram' },
    { src: '/media/youtube.svg', href: 'https://www.youtube.com/@axedz', label: 'YouTube' },
];

export function FooterSection() {
    //
    const t = useTranslations('home.footer');
    const tNav = useTranslations('home.navbar');
    //
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    //
    const handleSubscribe = (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
    };
    //
    return (
        <footer className="mt-10  p-10 rounded-t-3xl w-full md:w-[90%] mx-auto  bg-foreground dark:bg-card text-background dark:text-foreground shadow-lg shadow-primary/10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mx-auto max-w-7xl px-4 pt-6 pb-6 md:px-6 lg:px-8"
            >
                {/* Top */}
                <div className="mb-10 flex flex-col items-start justify-between gap-8 md:mb-16 lg:flex-row lg:items-center">
                    <Logo size="lg" priority withLink={true}  className=' invert dark:invert-0'/>

                    <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
                        {NAV_KEYS.map((key) => (
                            <Link key={key} href={NAV_HREFS[key]} className="text-sm text-background/70 dark:text-muted-foreground transition-colors hover:text-background dark:hover:text-foreground">
                                {tNav(key)}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {SOCIALS.map((s) => (
                            <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-background/20 dark:border-border bg-background/10 dark:bg-background text-background/80 dark:text-muted-foreground transition-colors hover:border-background/40 dark:hover:border-foreground/20 hover:text-background dark:hover:text-foreground">
                                <Image src={s.src} alt={s.label} width={18} height={18} className="invert" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Middle */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="space-y-6">
                        {[
                            { label: t('emailLabel'), value: 'support@axedz.com', href: 'mailto:support@axedz.com' },
                            { label: t('phoneLabel'), value: '+213 673442786' },
                        ].map((item) => (
                            <div key={item.label}>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-background/60 dark:text-muted-foreground">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-sm text-background dark:text-foreground transition-colors hover:text-background/80 dark:hover:text-muted-foreground md:text-base">{item.value}</a>
                                ) : (
                                    <p className="text-sm text-background dark:text-foreground md:text-base">{item.value}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-background/70 dark:text-muted-foreground">{t('newsletter')}</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('emailPlaceholder')}
                                required
                                className={cn(
                                    'min-w-0  max-w-85 flex-1 rounded-full border border-background/20 dark:border-border bg-background/10 dark:bg-background px-5 py-2.5 text-sm text-background dark:text-foreground',
                                    'placeholder:text-background/50 dark:placeholder:text-muted-foreground',
                                    'focus:border-background/40 dark:focus:border-ring focus:outline-none focus:ring-2 focus:ring-background/10 dark:focus:ring-ring/20'
                                )}
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-full bg-background dark:bg-foreground px-6 py-2.5 text-sm font-semibold text-foreground dark:text-background transition-opacity hover:opacity-90"
                            >
                                {subscribed ? t('subscribed') : t('subscribe')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="my-8 border-t border-background/20 dark:border-border" />
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-xs text-background/60 dark:text-muted-foreground md:text-sm">{t('copyright')}</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {(['helpCenter', 'privacy', 'terms'] as const).map((key) => (
                            <Link key={key} href={`/${key === 'helpCenter' ? 'help' : key}`} target="_blank" rel="noopener noreferrer"
                                className="text-xs text-background/60 dark:text-muted-foreground transition-colors hover:text-background dark:hover:text-foreground">
                                {t(key)}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}