'use client';

import { useState } from 'react';
import { DocsNavbar } from './docs-navbar';
import { DocsSidebar } from './docs-sidebar';

export function DocsShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-dvh overflow-hidden bg-background pt-[var(--navbar-height,4rem)] [--navbar-height:4rem]">
            <DocsNavbar onMenuOpen={() => setSidebarOpen(true)} />
            <div className="mx-auto flex h-[calc(100dvh-var(--navbar-height))] w-full max-w-7xl overflow-hidden xl:max-w-[1400px]">
                <DocsSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
                <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 lg:px-10 lg:py-10">
                    <article className="mx-auto w-full max-w-3xl space-y-10 lg:max-w-none">
                        {children}
                    </article>
                </main>
            </div>
        </div>
    );
}
