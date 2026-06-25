import { cn } from '@/lib/utils';

type XoBackgroundProps = {
    className?: string;
};

export function XoBackground({ className }: XoBackgroundProps) {
    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 overflow-hidden',
                className
            )}
            aria-hidden="true"
        >
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.035] dark:opacity-[0.055]" />

            <div className="absolute inset-0 mx-auto w-full max-w-7xl">
                <span className="absolute inset-y-0 left-1/3 w-px bg-linear-to-b from-transparent via-primary/18 to-transparent dark:via-primary/24" />
                <span className="absolute inset-y-0 left-2/3 w-px bg-linear-to-b from-transparent via-primary/18 to-transparent dark:via-primary/24" />
                <span className="absolute inset-x-0 top-1/3 h-px bg-linear-to-r from-transparent via-primary/18 to-transparent dark:via-primary/24" />
                <span className="absolute inset-x-0 top-2/3 h-px bg-linear-to-r from-transparent via-primary/18 to-transparent dark:via-primary/24" />
            </div>

            <div className="absolute inset-x-6 top-6 h-px bg-linear-to-r from-transparent via-foreground/8 to-transparent dark:via-foreground/10 sm:inset-x-10" />
            <div className="absolute inset-x-6 bottom-6 h-px bg-linear-to-r from-transparent via-foreground/8 to-transparent dark:via-foreground/10 sm:inset-x-10" />
            <div className="absolute inset-y-6 left-6 w-px bg-linear-to-b from-transparent via-foreground/8 to-transparent dark:via-foreground/10 sm:inset-y-10 sm:left-10" />
            <div className="absolute inset-y-6 right-6 w-px bg-linear-to-b from-transparent via-foreground/8 to-transparent dark:via-foreground/10 sm:inset-y-10 sm:right-10" />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_42%,var(--background)_82%)]" />
        </div>
    );
}
