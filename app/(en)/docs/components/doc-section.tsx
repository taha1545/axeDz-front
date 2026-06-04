import { cn } from '@/lib/utils';

interface DocHeadingProps {
    title: string;
    description?: string;
}

export function DocHeading({ title, description }: DocHeadingProps) {
    return (
        <header className="space-y-4 border-b border-border pb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
            </h1>
            {description && (
                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {description}
                </p>
            )}
        </header>
    );
}

interface DocSectionProps {
    id?: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function DocSection({ id, title, children, className }: DocSectionProps) {
    return (
        <section id={id} className={cn('scroll-mt-24 space-y-4', className)}>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <div className="space-y-4 text-muted-foreground">{children}</div>
        </section>
    );
}

export function DocSubSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

export function DocList({ items }: { items: string[] }) {
    return (
        <ul className="list-disc space-y-2 pl-5">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

export function DocTable({
    headers,
    rows,
}: {
    headers: string[];
    rows: string[][];
}) {
    return (
        <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-border bg-muted/50">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className="px-4 py-3 font-medium text-foreground"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-3 text-muted-foreground">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function DocCallout({
    title,
    children,
    variant = 'info',
}: {
    title?: string;
    children: React.ReactNode;
    variant?: 'info' | 'warning';
}) {
    return (
        <div
            className={cn(
                'rounded-xl border p-4',
                variant === 'info' && 'border-primary/20 bg-primary/5',
                variant === 'warning' && 'border-[var(--warning)]/30 bg-[var(--warning)]/5'
            )}
        >
            {title && <p className="mb-1 font-medium text-foreground">{title}</p>}
            <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
        </div>
    );
}
