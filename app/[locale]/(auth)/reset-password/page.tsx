'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
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
import { getErrorMessage } from '@/lib/get-error-message';
import { Logo } from '@/components/logo';

export default function ResetPasswordPage() {
    const t = useTranslations('auth.resetPassword');
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const resetPassword = useResetPassword();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        control,
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
            setError('root', {
                message: getErrorMessage(err, t('resetFailed')),
            });
        }
    };

    if (!email) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <Logo size="lg" priority withLink />
            </div>

            <div className="w-full max-w-sm sm:max-w-md flex flex-col gap-6 sm:gap-8">
                <div className="text-center space-y-3 sm:space-y-4">
                    <h1 className="text-2xl font-bold sm:text-3xl">{t('title')}</h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        {t('description')}{' '}
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20">
                            {email}
                        </span>
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 sm:gap-6"
                    noValidate
                >
                    {errors.root && (
                        <div className="flex items-start gap-3 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            <p>{errors.root.message}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="otp_code" className="px-3 text-sm font-medium text-foreground">
                            {t('code')}
                        </Label>
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
                                        aria-label={t('code')}
                                        aria-invalid={fieldState.invalid ? 'true' : 'false'}
                                    >
                                        <InputOTPGroup className="gap-2 sm:gap-3">
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <InputOTPSlot
                                                    key={i}
                                                    index={i}
                                                    aria-label={`Digit ${i + 1}`}
                                                    className="h-12 w-12 rounded-lg text-lg border border-foreground/20 bg-background shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-14 sm:w-14 sm:text-xl"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                    {fieldState.error && (
                                        <p className="text-xs text-destructive" role="alert">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-3">
                            <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                {t('password')}
                            </Label>
                            <button
                                type="button"
                                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 py-0.5"
                                onClick={() => setShowPassword((p) => !p)}
                                disabled={resetPassword.isPending}
                                aria-pressed={showPassword}
                                aria-label={showPassword ? t('hide') : t('show')}
                            >
                                {showPassword ? <Eye size={18} aria-hidden="true" /> : <EyeOff size={18} aria-hidden="true" />}
                                {showPassword ? t('hide') : t('show')}
                            </button>
                        </div>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('passwordPlaceholder')}
                            className="h-11 rounded-4xl border-foreground/20 px-6 text-muted-foreground transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={resetPassword.isPending}
                            aria-invalid={errors.password ? 'true' : 'false'}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                            autoComplete="new-password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p id="password-error" className="px-3 text-xs text-destructive" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-3">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                                {t('confirmPassword')}
                            </Label>
                            <button
                                type="button"
                                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 py-0.5"
                                onClick={() => setShowConfirm((p) => !p)}
                                disabled={resetPassword.isPending}
                                aria-pressed={showConfirm}
                                aria-label={showConfirm ? t('hide') : t('show')}
                            >
                                {showConfirm ? <Eye size={18} aria-hidden="true" /> : <EyeOff size={18} aria-hidden="true" />}
                                {showConfirm ? t('hide') : t('show')}
                            </button>
                        </div>
                        <Input
                            id="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder={t('confirmPasswordPlaceholder')}
                            className="h-11 rounded-4xl border-foreground/20 px-6 text-muted-foreground transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={resetPassword.isPending}
                            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                            autoComplete="new-password"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p id="confirm-password-error" className="px-3 text-xs text-destructive" role="alert">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="rounded-4xl w-full sm:py-6 sm:text-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={resetPassword.isPending}
                    >
                        {resetPassword.isPending ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" aria-hidden="true" />
                                {t('resetting')}
                            </span>
                        ) : (
                            t('resetButton')
                        )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        {t('noCode')}{' '}
                        <Link
                            href="/forget-password"
                            className="underline underline-offset-4 text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                            {t('tryAgain')}
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}