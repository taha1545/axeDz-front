'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ConsentState = 'pending' | 'accepted' | 'rejected' | null;

export function CookieConsent() {
    const [consent, setConsent] = useState<ConsentState>(null);

    useEffect(() => {
        const stored = localStorage.getItem('axe-cookies');
        if (stored === 'accepted' || stored === 'rejected') {
            setConsent(stored as ConsentState);
        } else {
            setConsent('pending');
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('axe-cookies', 'accepted');
        setConsent('accepted');
    };

    const handleReject = () => {
        localStorage.setItem('axe-cookies', 'rejected');
        setConsent('rejected');
    };

    return (
        <AnimatePresence>
            {consent === 'pending' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            'w-full max-w-2xl rounded-[2rem]  bg-card p-8    md:p-12 ',
                            'border-t-3 border-primary/60  shadow-lg shadow-primary/10'
                        )}
                    >
                        {/* Header */}
                        <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8 md:gap-4">
                            <Image
                                src="/logo.svg"
                                alt="AxeDz"
                                width={90}
                                height={28}
                                className="h-7 w-auto invert-0 dark:invert "
                            />
                            <span className="hidden h-4 w-px bg-border md:block" />
                            <h3 className="text-base font-semibold text-foreground">
                                This website uses cookies
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:mb-10">
                            We use cookies to enhance your browsing experience, serve personalized
                            content, and analyze our traffic. By clicking &quot;Accept All&quot;, you
                            consent to our use of cookies.
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end">
                            <button
                                onClick={handleAccept}
                                className={cn(
                                    ' bg-primary text-primary-foreground hover:bg-primary/90',
                                    'rounded-full border px-7 py-2.5 text-sm font-medium transition-all duration-200'
                                )}
                            >
                                Accept All
                            </button>
                            <button
                                onClick={handleAccept}
                                className={cn(
                                    'rounded-full border px-7 py-2.5 text-sm font-medium transition-all duration-200',
                                    'border-border bg-background text-foreground hover:bg-muted'
                                )}
                            >
                                Reject Optional
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}