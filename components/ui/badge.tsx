import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-primary/10 text-primary',
                secondary: 'bg-muted text-muted-foreground',
                destructive: 'bg-destructive/10 text-destructive',
                outline: 'border border-border text-foreground',
                success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
                warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
                danger: 'bg-red-500/10 text-red-700 dark:text-red-400',
                purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
                sky: 'bg-sky-500/10 text-sky-700 dark:text-sky-400',
                slate: 'bg-slate-500/10 text-slate-700 dark:text-slate-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
