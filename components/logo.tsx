import Image from 'next/image';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type LogoSize = 'sm' | 'md' | 'lg';

type LogoProps = {
    href?: ComponentProps<typeof Link>['href'];
    size?: LogoSize;
    label?: string;
    withLink?: boolean;
    priority?: boolean;
    className?: string;
    imageClassName?: string;
};

const logoSizes: Record<LogoSize, string> = {
    sm: 'h-6 w-[84px] sm:h-7 sm:w-[96px]',
    md: 'h-7 w-[98px] sm:h-8 sm:w-[112px]',
    lg: 'h-8 w-[112px] sm:h-10 sm:w-[139px]',
};

export function Logo({
    href = '/',
    size = 'md',
    label = 'AxeDz',
    withLink = true,
    priority = false,
    className,
    imageClassName,
}: LogoProps) {

    const logo = (
        <Image
            src="/logo.svg"
            alt={label}
            width={132}
            height={38}
            priority={priority}
            className={cn(
                'h-full w-full object-contain transition-opacity dark:invert',
                imageClassName
            )}
        />
    );

    const wrapperClassName = cn(
        'inline-flex shrink-0 items-center justify-center',
        logoSizes[size],
        className
    );

    if (!withLink) {
        return <span className={wrapperClassName}>{logo}</span>;
    }

    return (
        <Link
            href={href}
            aria-label={label}
            className={cn(
                wrapperClassName,
                'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
        >
            {logo}
        </Link>
    );
}
