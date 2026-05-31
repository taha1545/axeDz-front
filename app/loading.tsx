import { Loader2 } from 'lucide-react';
import { StatusScreen } from '@/components/status-screen';

export default function Loading() {
    return (
        <StatusScreen
            badge="Loading"
            title="Loading AxeDz"
            description="Please wait while we prepare your page."
            icon={<Loader2 className="h-8 w-8 animate-spin" />}
        />
    );
}
