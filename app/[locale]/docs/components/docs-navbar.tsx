'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DOCS_VERSION } from './docs-nav';

export function DocsNavbar({ onMenuOpen }: { onMenuOpen: () => void }) {
    const headerRef = useRef<HTMLElement>(null);

    const version = DOCS_VERSION;

    useEffect(() => {
        const setHeight = () => {
            if (headerRef.current) {
                document.documentElement.style.setProperty(
                    '--navbar-height',
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
            className="fixed top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm"
        >
            <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-6 xl:max-w-[1400px] xl:px-10">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.svg"
                        alt="AxeDz"
                        width={100}
                        height={28}
                        className="h-7 w-auto dark:invert"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onMenuOpen}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
                        aria-label="Open sidebar"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <Button variant="outline" size="lg" className="rounded-full" asChild>
                        <p>{version}</p>
                    </Button>
                </div>
            </div>
        </header>
    );
}
