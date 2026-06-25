import Link from 'next/link';
import { PrimaryButton, customButtonVariants } from '@/components/custom-button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

type StatusScreenProps = {
    code: string;
    title: string;
    description: string;
    primaryText?: string;
    secondaryText?: string;
    onReset?: () => void;
};

export function StatusScreen({
    code,
    title,
    description,
    primaryText = 'Go home',
    secondaryText,
    onReset,
}: StatusScreenProps) {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
            <section className="relative z-10 grid w-full max-w-lg justify-items-center gap-7 text-center">
                <Logo size="md" priority withLink={false} />

                <div className="grid justify-items-center gap-4">
                    <p className="text-6xl font-bold leading-none tracking-normal text-primary sm:text-7xl md:text-8xl">
                        {code}
                    </p>
                    <div className="h-px w-12 bg-primary/45" />
                </div>

                <div className="grid max-w-md gap-3">
                    <h1 className="text-balance text-2xl font-semibold tracking-normal sm:text-3xl">
                        {title}
                    </h1>
                    <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                        {description}
                    </p>
                </div>

                <div className="flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
                    {onReset ? (
                        <PrimaryButton type="button" text={primaryText} onClick={onReset} />
                    ) : (
                        <Link
                            href="/"
                            className={cn(customButtonVariants({ color: 'primary', styleType: 'solid' }))}
                        >
                            <span className="relative z-10 truncate">{primaryText}</span>
                        </Link>
                    )}

                    {secondaryText && (
                        <Link
                            href="/"
                            className={cn(customButtonVariants({ color: 'normal', styleType: 'soft' }))}
                        >
                            <span className="relative z-10 truncate">{secondaryText}</span>
                        </Link>
                    )}
                </div>
            </section>
        </main>
    );
}
