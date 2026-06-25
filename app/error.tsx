'use client';

import { StatusScreen } from '@/components/status-screen';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <StatusScreen
            code="500"
            title="Something went wrong"
            description="We could not load this page correctly. Please try again, or return home if the problem continues."
            primaryText="Try again"
            secondaryText="Back to home"
            onReset={reset}
        />
    );
}
