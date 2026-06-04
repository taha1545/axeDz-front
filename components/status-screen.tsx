import Link from 'next/link';
import { cn } from '@/lib/utils';

interface StatusScreenProps {
    badge: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    code?: string;
    actions?: React.ReactNode;
    className?: string;
}

export function StatusScreen({
    badge,
    title,
    description,
    icon,
    code,
    actions,
    className,
}: StatusScreenProps) {
    return (
        <section
            className={cn(
                'flex min-h-dvh items-center justify-center bg-background px-4 py-12 sm:px-6',
                className
            )}
        >
            <div className="mx-auto w-full max-w-md text-center">
                <span className="inline-block rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold tracking-wide text-background">
                    {badge}
                </span>

                {code && (
                    <p className="mt-8 font-mono text-7xl font-black tracking-tighter text-foreground/10 sm:text-8xl">
                        {code}
                    </p>
                )}

                {icon && (
                    <div
                        className={cn(
                            'mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary',
                            code ? 'mt-2' : 'mt-8'
                        )}
                    >
                        {icon}
                    </div>
                )}

                <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {title}
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {description}
                </p>

                {actions && (
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        {actions}
                    </div>
                )}
            </div>
        </section>
    );
}

interface StatusActionProps {
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'outline';
    children: React.ReactNode;
}

export function StatusAction({
    href,
    onClick,
    variant = 'primary',
    children,
}: StatusActionProps) {
    const className = cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors',
        variant === 'primary' &&
            'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'outline' &&
            'border border-border bg-background text-foreground hover:bg-muted'
    );

    if (href) {
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            {children}
        </button>
    );
}
