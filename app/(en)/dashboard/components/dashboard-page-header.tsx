interface DashboardPageHeaderProps {
    title: string;
    description?: string;
}

export function DashboardPageHeader({ title, description }: DashboardPageHeaderProps) {
    return (
        <header className="mb-6 space-y-1 sm:mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
            </h1>
            {description && (
                <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
            )}
        </header>
    );
}

interface DashboardCardProps {
    title: string;
    value: string;
    hint?: string;
}

export function DashboardStatCard({ title, value, hint }: DashboardCardProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}
