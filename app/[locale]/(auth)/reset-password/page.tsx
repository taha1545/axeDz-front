'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useResetPassword } from '@/hooks/use-otp';
import { resetPasswordSchema, type ResetPasswordInput } from '@/schemas/auth';
import { Logo } from '@/components/logo';

export default function ResetPasswordPage() {
    //
    const t = useTranslations('auth.resetPassword');
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    //
    const resetPassword = useResetPassword();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            otp_code: '',
            password: '',
            confirmPassword: '',
        },
    });

    const password = watch('password');

    // Guard: no email param
    useEffect(() => {
        if (!email) {
            router.replace('/forgot-password');
        }
    }, [email, router]);

    const onSubmit = async (data: ResetPasswordInput) => {
        clearErrors('root');
        try {
            await resetPassword.mutateAsync({
                email,
                otp_code: data.otp_code,
                password: data.password,
            });
            router.replace('/login');
        } catch (err: unknown) {
            let message = t('resetFailed');

            if (
                err &&
                typeof err === 'object' &&
                'response' in err &&
                err.response &&
                typeof err.response === 'object' &&
                'data' in err.response &&
                err.response.data &&
                typeof err.response.data === 'object'
            ) {
                const res = err.response.data as Record<string, unknown>;
                if (
                    'errors' in res &&
                    Array.isArray(res.errors) &&
                    res.errors.length > 0 &&
                    res.errors[0] &&
                    typeof res.errors[0] === 'object' &&
                    'message' in res.errors[0] &&
                    typeof res.errors[0].message === 'string'
                ) {
                    message = res.errors[0].message;
                } else if ('message' in res && typeof res.message === 'string') {
                    message = res.message;
                }
            }
            setError('root', { message });
        }
    };
    //
    if (!email) return null;
    //

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <Logo size="lg" priority withLink />
            </div>

            <div className="w-full max-w-sm sm:max-w-md flex flex-col gap-6 sm:gap-8">
                <div className="text-center space-y-2 sm:space-y-3">
                    <h1 className="text-2xl font-bold sm:text-3xl">{t('title')}</h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        {t('description')}{' '}
                        <span className="font-medium text-foreground">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">
                    {errors.root && (
                        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive text-center">
                            {errors.root.message}
                        </p>
                    )}

                    {/* OTP */}
                    <div className="flex flex-col gap-2">
                        <Label className="px-3 text-sm text-foreground">{t('code')}</Label>
                        <Controller
                            name="otp_code"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col items-center gap-2">
                                    <InputOTP
                                        maxLength={6}
                                        pattern={REGEXP_ONLY_DIGITS}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={resetPassword.isPending}
                                    >
                                        <InputOTPGroup className="gap-2 sm:gap-3">
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <InputOTPSlot
                                                    key={i}
                                                    index={i}
                                                    className="h-12 w-12 text-lg border-foreground/80 sm:h-14 sm:w-14 sm:text-xl"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                    {fieldState.error && (
                                        <p className="text-xs text-destructive">{fieldState.error.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-3">
                            <Label className="text-sm text-foreground">{t('password')}</Label>
                            <button
                                type="button"
                                className="flex items-center gap-1 text-sm text-muted-foreground"
                                onClick={() => setShowPassword((p) => !p)}
                                disabled={resetPassword.isPending}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                {showPassword ? t('hide') : t('show')}
                            </button>
                        </div>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('passwordPlaceholder')}
                            className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
                            disabled={resetPassword.isPending}
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="px-3 text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-3">
                            <Label className="text-sm text-foreground">{t('confirmPassword')}</Label>
                            <button
                                type="button"
                                className="flex items-center gap-1 text-sm text-muted-foreground"
                                onClick={() => setShowConfirm((p) => !p)}
                                disabled={resetPassword.isPending}
                            >
                                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                                {showConfirm ? t('hide') : t('show')}
                            </button>
                        </div>
                        <Input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder={t('confirmPasswordPlaceholder')}
                            className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
                            disabled={resetPassword.isPending}
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className="px-3 text-xs text-destructive">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="rounded-4xl w-full sm:py-6 sm:text-lg"
                        disabled={resetPassword.isPending}
                    >
                        {resetPassword.isPending ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                                {t('resetting')}
                            </span>
                        ) : (
                            t('resetButton')
                        )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        {t('noCode')}{' '}
                        <Link href="/forget-password" className="underline text-primary">
                            {t('tryAgain')}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}