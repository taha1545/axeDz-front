'use client';

import { cn } from '@/lib/utils';

function Pulse({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-xl bg-muted-foreground/20',
                className
            )}
        />
    );
}

export function ActivationCardSkeleton() {
    return (
        <div className="space-y-6">
            <Pulse className="h-64 w-full rounded-[2rem]" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Pulse key={i} className="h-32 rounded-[2rem]" />
                ))}
            </div>
            <Pulse className="h-48 w-full rounded-[2rem]" />
        </div>
    );
}

export function WalletOverviewSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <Pulse key={i} className="h-40 rounded-[2rem]" />
            ))}
        </div>
    );
}

export function QuickActionsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <Pulse key={i} className="h-44 rounded-[2rem]" />
            ))}
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <Pulse className="h-12 w-full rounded-xl" />
            {Array.from({ length: rows }).map((_, i) => (
                <Pulse key={i} className="h-14 w-full rounded-xl" />
            ))}
        </div>
    );
}
