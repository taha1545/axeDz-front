import { BookOpen, Home } from 'lucide-react';
import { StatusAction, StatusScreen } from '@/components/status-screen';

export function NotFoundPage() {
    return (
        <StatusScreen
            badge="Not found"
            code="404"
            title="Page not found"
            description="The page you are looking for may have been moved, deleted, or never existed."
            actions={
                <>
                    <StatusAction href="/">
                        <Home className="h-4 w-4" />
                        Go home
                    </StatusAction>
                    <StatusAction href="/docs" variant="outline">
                        <BookOpen className="h-4 w-4" />
                        View docs
                    </StatusAction>
                </>
            }
        />
    );
}
