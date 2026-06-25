'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/hooks/use-auth';
import { useVerifySms, useResendVerifyOtp } from '@/hooks/use-otp';
import { verifyPhoneSchema, type VerifyPhoneInput } from '@/schemas/auth';
import { Logo } from '@/components/logo';

export default function VerifyPhonePage() {
  const t = useTranslations('auth.verifyPhone');
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();
  const verifyMutation = useVerifySms();
  const resendMutation = useResendVerifyOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<VerifyPhoneInput>({
    resolver: zodResolver(verifyPhoneSchema),
    defaultValues: { code: '' },
  });

  /* Auth guards */
  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user?.is_verified) router.replace('/dashboard');
  }, [user, router]);

  const getMessage = (err: unknown): string | undefined => {
    const res =
      err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object'
        ? err.response.data
        : null;

    if (!res) return undefined;

    if (
      'errors' in res &&
      Array.isArray(res.errors) &&
      res.errors[0] &&
      typeof res.errors[0] === 'object' &&
      'message' in res.errors[0] &&
      typeof res.errors[0].message === 'string'
    ) {
      return res.errors[0].message;
    }

    if ('message' in res && typeof res.message === 'string') {
      return res.message;
    }

    return undefined;
  };

  const onSubmit = async (data: VerifyPhoneInput) => {
    clearErrors('root');

    try {
      await verifyMutation.mutateAsync({
        email: user?.email,
        otp_code: data.code,
      });
      router.replace('/dashboard');
    } catch (err: unknown) {
      setError('root', { message: getMessage(err) || t('verifyFailed') });
    }
  };

  const onResend = async () => {
    clearErrors('root');

    try {
      await resendMutation.mutateAsync({ email: user?.email });
      reset();
    } catch (err: unknown) {
      setError('root', { message: getMessage(err) || t('resendFailed') });
    }
  };

  const onSkip = () => router.push('/dashboard');

  if (authLoading) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/login"
        className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors sm:top-6 sm:left-6"
      >
        <ArrowLeft size={16} />
        {t('backToLogin')}
      </Link>

      {/* Logo */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <Logo size="lg" priority withLink />
      </div>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg flex flex-col gap-6 sm:gap-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            {t('title')}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {t('description')}{' '}
            <span className="font-medium text-foreground">{user?.email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 sm:gap-8">
          {/* OTP */}
          <Controller
            name="code"
            control={control}
            rules={{
              required: t('codeRequired'),
              minLength: { value: 6, message: t('codeLength') },
            }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col items-center gap-3">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={verifyMutation.isPending}
                >
                  <InputOTPGroup className="gap-2 sm:gap-3">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-12 w-12 text-lg border-foreground/80 sm:h-14 sm:w-14 sm:text-xl lg:h-16 lg:w-16 lg:text-2xl"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.error && (
                  <p className="text-sm text-destructive sm:text-base">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Alerts */}
          {errors.root && (
            <p className="text-sm text-center text-destructive bg-destructive/10 px-4 py-3 rounded-lg sm:text-base">
              {errors.root.message}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto w-full">
            <Button
              type="submit"
              size="lg"
              className="rounded-4xl w-full sm:py-6 sm:text-lg"
              disabled={verifyMutation.isPending}
            >
              {verifyMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                  {t('verifying')}
                </span>
              ) : (
                t('verify')
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-4xl w-full sm:py-6 sm:text-lg"
              onClick={onResend}
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                  {t('sending')}
                </span>
              ) : (
                t('resendCode')
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:bg-background sm:text-base"
              onClick={onSkip}
            >
              {t('skip')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}