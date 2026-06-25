import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const customButtonVariants = cva(
    'group/button relative inline-flex min-w-0 shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-lg border text-sm font-semibold transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:relative [&_svg]:z-10 [&_svg]:shrink-0',
    {
        variants: {
            color: {
                normal: '',
                primary: '',
                danger: '',
                gradient: '',
                inverse: '',
            },
            styleType: {
                solid: '',
                soft: '',
            },
            size: {
                sm: 'h-9 gap-2 px-4 text-xs [&_svg:not([class*=size-])]:size-4',
                md: 'h-11 gap-2.5 px-5 [&_svg:not([class*=size-])]:size-4',
                lg: 'h-12 gap-3 px-6 text-base [&_svg:not([class*=size-])]:size-5',
                icon: 'size-10 p-0 [&_svg:not([class*=size-])]:size-5',
            },
            fullWidth: {
                true: 'w-full',
                false: '',
            },
        },
        compoundVariants: [
            {
                color: 'normal',
                styleType: 'solid',
                className:
                    'border-border bg-background text-foreground shadow-sm shadow-black/5 hover:border-muted-foreground/25 hover:bg-muted/70 dark:bg-input/20 dark:hover:bg-input/35',
            },
            {
                color: 'normal',
                styleType: 'soft',
                className:
                    'border-transparent bg-muted text-foreground hover:bg-muted/80 dark:bg-muted/70 dark:hover:bg-muted',
            },
            {
                color: 'primary',
                styleType: 'solid',
                className:
                    'border-primary/60 bg-linear-to-r from-primary/90 to-secondary text-primary-foreground shadow-sm shadow-primary/10 hover:border-primary/80 hover:from-primary hover:to-secondary/90',
            },
            {
                color: 'primary',
                styleType: 'soft',
                className:
                    'border-primary/20 bg-linear-to-r from-primary/10 to-primary/5 text-primary hover:border-primary/35 hover:from-primary/12 hover:to-primary/8 dark:from-primary/15 dark:to-primary/10 dark:hover:from-primary/18 dark:hover:to-primary/12',
            },
            {
                color: 'danger',
                styleType: 'solid',
                className:
                    'border-destructive/70 bg-destructive text-white shadow-sm shadow-destructive/10 hover:border-destructive hover:bg-destructive/90',
            },
            {
                color: 'danger',
                styleType: 'soft',
                className:
                    'border-destructive/20 bg-destructive/10 text-destructive hover:border-destructive/35 hover:bg-destructive/15 dark:bg-destructive/15 dark:hover:bg-destructive/20',
            },
            {
                color: 'gradient',
                styleType: 'solid',
                className:
                    'border-primary/60 bg-linear-to-r from-primary/90 to-secondary text-primary-foreground shadow-sm shadow-primary/10 hover:border-primary/80 hover:from-primary hover:to-secondary/90',
            },
            {
                color: 'gradient',
                styleType: 'soft',
                className:
                    'border-primary/20 bg-linear-to-r from-primary/10 to-primary/5 text-primary hover:border-primary/35 hover:from-primary/12 hover:to-primary/8 dark:from-primary/15 dark:to-primary/10 dark:hover:from-primary/18 dark:hover:to-primary/12',
            },
            {
                color: 'inverse',
                styleType: 'solid',
                className:
                    'border-foreground/60 bg-foreground text-background shadow-sm shadow-foreground/10 hover:bg-foreground/90 hover:border-foreground',
            },
            {
                color: 'inverse',
                styleType: 'soft',
                className:
                    'border-foreground/20 bg-foreground/10 text-foreground hover:bg-foreground/20 hover:border-foreground/35',
            },
        ],
        defaultVariants: {
            color: 'normal',
            styleType: 'solid',
            size: 'md',
            fullWidth: false,
        },
    }
);

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof customButtonVariants> & {
        text?: React.ReactNode;
        iconStart?: React.ReactNode;
        iconEnd?: React.ReactNode;
        asChild?: boolean;
    };

type FocusedButtonProps = Omit<CustomButtonProps, 'color'>;

export function CustomButton({
    className,
    color,
    styleType,
    size,
    fullWidth,
    text,
    iconStart,
    iconEnd,
    children,
    asChild = false,
    ...props
}: CustomButtonProps) {
    const classes = cn(
        customButtonVariants({ color, styleType, size, fullWidth }),
        className
    );

    const innerContent = (
        <>
            {styleType === 'solid' && (
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" />
            )}
            {iconStart}
            <span className="relative z-10 truncate">{text ?? children}</span>
            {iconEnd}
        </>
    );

    if (asChild && React.isValidElement(children)) {
        const child = children as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
        }>;

        return React.cloneElement(child, {
            className: cn(classes, child.props.className),
            ...props,
            children: innerContent,
        });
    }

    return (
        <button className={classes} {...props}>
            {innerContent}
        </button>
    );
}

export function NormalButton(props: FocusedButtonProps) {
    return <CustomButton color="normal" {...props} />;
}

export function PrimaryButton(props: FocusedButtonProps) {
    return <CustomButton color="primary" {...props} />;
}

export function InverseButton(props: FocusedButtonProps) {
    return <CustomButton color="inverse" {...props} />;
}

export { customButtonVariants };