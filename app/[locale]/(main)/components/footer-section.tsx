'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
];

const socialLinks = [
    { src: '/linkedin.svg', href: 'https://linkedin.com/in/taha-mohamed-mansouri-15a99924b', label: 'LinkedIn' },
    { src: '/facebook.svg', href: '#', label: 'Facebook' },
    { src: '/twitter.svg', href: '#', label: 'Twitter' },
];

export function FooterSection() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <footer className="bg-card w-full mt-10 rounded-t-[2rem] max-w-7xl border-t-4 border-primary/20 mx-auto px-1 pt-6 md:px-2 lg:px-4 shadow-lg shadow-primary/40">
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={cn(
                        'relative overflow-hidden rounded-t-[2rem] md:rounded-t-[2.5rem]',
                        'bg-card text-card-foreground',
                        'px-6 py-10 sm:px-10 md:px-14 md:py-7 lg:px-16'
                    )}
                >
                    {/* Top bar */}
                    <div className="relative mb-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center md:mb-14 lg:gap-12">

                        {/* Logo */}
                        <Link href="#" className="relative h-8 w-28 md:h-9 md:w-32">
                            <Image
                                src="/logo.svg"
                                alt="AxeDz"
                                fill
                                className="object-contain invert-0 dark:invert"
                            />
                        </Link>

                        {/* Nav */}
                        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="relative text-sm text-card-foreground/80 transition-colors duration-200 hover:text-card-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Socials */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    aria-label={social.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/10 text-background/80 transition-all duration-300 hover:scale-110 hover:border-background/40 hover:bg-background/20 hover:text-background"
                                >
                                    <Image
                                        src={social.src}
                                        alt={social.label}
                                        width={18}
                                        height={18}
                                        className="invert"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Middle */}
                    <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">

                        {/* Contact info */}
                        <div className="space-y-6">
                            <div className="space-y-6">

                                <div>
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-card-foreground/60">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:support@axedz.com"
                                        className="text-sm text-card-foreground transition-colors hover:text-card-foreground/80 md:text-base"
                                    >
                                        support@axedz.com
                                    </a>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-card-foreground/60">
                                        Phone
                                    </p>
                                    <p className="text-sm text-card-foreground md:text-base">
                                        +213 673442786
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="flex flex-col mt-4 items-start lg:text-left">

                            <p className="mb-4 px-2 hidden text-sm text-card-foreground/60 lg:block">
                                Subscribe to our newsletter for updates.
                            </p>

                            <form
                                onSubmit={handleSubscribe}
                                className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-end"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className={cn(
                                        'min-w-0 flex-1 rounded-full border bg-transparent px-6 py-3.5 text-sm text-card-foreground transition-all duration-200',
                                        'border-card-foreground/30 placeholder:text-card-foreground/50',
                                        'focus:border-card-foreground/60 focus:outline-none focus:ring-2 focus:ring-card-foreground/10',
                                        'lg:w-72 lg:flex-initial'
                                    )}
                                />
                                <button
                                    type="submit"
                                    className={cn(
                                        'shrink-0 rounded-full px-8 py-3.5 text-sm font-semibold',
                                        'bg-foreground text-background',
                                        'transition-all duration-200 hover:bg-foreground/90 active:scale-[0.97]'
                                    )}
                                >
                                    {subscribed ? 'Subscribed!' : 'Subscribe'}
                                </button>
                            </form>

                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-2 border-t border-foreground/20 md:my-8" />

                    {/* Bottom */}
                    <div className="relative flex flex-col items-center justify-between gap-4 sm:flex-row">

                        <p className="  text-xs text-card-foreground/60 md:text-sm">
                            © 2026 AxeDz. All rights reserved.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">

                            <Link href="/help"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-card-foreground/60 transition-colors hover:text-card-foreground">
                                Help Center
                            </Link>

                            <Link href="/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-card-foreground/60 transition-colors hover:text-card-foreground">
                                Privacy Policy
                            </Link>

                            <Link href="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-card-foreground/60 transition-colors hover:text-card-foreground">
                                Terms of Service
                            </Link>

                        </div>

                    </div>
                </motion.div>
            </div>
        </footer>
    );
}