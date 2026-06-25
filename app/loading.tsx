
import { XoBackground } from '@/components/xo-background';
import { Logo } from '@/components/logo';

export default function Loading() {
    return (
        <main className="loader-wrapper relative min-h-screen overflow-hidden bg-background">
            <XoBackground />
            <section className="relative z-10 grid justify-items-center gap-8">
                <Logo size="md" priority withLink={false} />
                <div className="loader" aria-label="Loading" role="status" />
                <p className="text-sm font-medium text-muted-foreground">Loading</p>
            </section>
        </main>
    );
}
