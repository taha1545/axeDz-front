import { StatusScreen } from '@/components/status-screen';

export default function NotFound() {
    return (
        <StatusScreen
            code="404"
            title="Page not found"
            description="The page you are looking for does not exist, was moved, or is no longer available."
            primaryText="Back to home"
        />
    );
}
