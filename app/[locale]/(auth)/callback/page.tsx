'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/logo';

export default function AuthCallbackPage() {
    const t = useTranslations('auth.callback');
    //
    const router = useRouter();
    const searchParams = useSearchParams();
    //
    const { loginWithToken, isProcessingToken } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        //
        if (!token) {
            router.replace('/login');
            return;
        }
        //
        loginWithToken(token)
            .then(() => router.replace('/dashboard'))
            .catch(() => router.replace('/login'));
    }, [searchParams, router, loginWithToken]);

    // safe redirect
    useEffect(() => {
        if (!isProcessingToken) {
            const timer = setTimeout(() => router.replace('/login'), 3000);
            return () => clearTimeout(timer);
        }
    }, [isProcessingToken, router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
            <Logo size="lg" priority />
            <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-base">{t('signingIn')}</span>
            </div>
        </div>
    );
}