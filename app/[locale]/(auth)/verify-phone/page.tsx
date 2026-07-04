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
import { Loader2, AlertCircle } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { useVerifySms, useResendVerifyOtp } from '@/hooks/use-otp';
import { verifyPhoneSchema, type VerifyPhoneInput } from '@/schemas/auth';
import { getErrorMessage } from '@/lib/get-error-message';
import { Logo } from '@/components/logo';

export default function VerifyPhonePage() {
  const t = useTranslations('auth.verifyPhone');
  const router = useRouter();

  const { user, isLoading: authLoading } = useAuth();
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

  const onSubmit = async (data: VerifyPhoneInput) => {
    clearErrors('root');
    if (!user?.email) return;

    try {
      await verifyMutation.mutateAsync({
        email: user.email,
        otp_code: data.code,
      });
      router.replace('/dashboard');
    } catch (err: unknown) {
      setError('root', {
        message: getErrorMessage(err, t('verifyFailed')),
      });
    }
  };

  const onResend = async () => {
    clearErrors('root');
    if (!user?.email) return;

    try {
      await resendMutation.mutateAsync({ email: user.email });
      reset();
    } catch (err: unknown) {
      setError('root', {
        message: getErrorMessage(err, t('resendFailed')),
      });
    }
  };

  const onSkip = () => router.push('/dashboard');

  if (authLoading) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

      <div className="mb-8 sm:mb-10 lg:mb-12">
        <Logo size="lg" priority withLink />
      </div>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg flex flex-col gap-6 sm:gap-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-2xl font-bold sm:text-3xl ">
            {t('title')}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {t('description')}{' '}
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20">
              {user?.email}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 sm:gap-8"
          noValidate
        >
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
                  aria-label={t('codeRequired')}
                  aria-invalid={fieldState.invalid ? 'true' : 'false'}
                >
                  <InputOTPGroup className="gap-2 sm:gap-3">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        aria-label={`Digit ${i + 1}`}
                        className="h-12 w-12 rounded-lg text-lg border border-foreground/20 bg-background shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-14 sm:w-14 sm:text-xl lg:h-16 lg:w-16 lg:text-2xl"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.error && (
                  <p className="text-sm text-destructive sm:text-base" role="alert">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {errors.root && (
            <div className="flex items-start gap-3 rounded-xl justify-center bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>{errors.root.message}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto w-full">
            <Button
              type="submit"
              size="lg"
              className="rounded-4xl w-full sm:py-5 sm:text-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={verifyMutation.isPending}
            >
              {verifyMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" aria-hidden="true" />
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
              className="rounded-4xl w-full sm:py-5 sm:text-base transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={onResend}
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" aria-hidden="true" />
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
              className="w-full text-muted-foreground hover:bg-background sm:text-base transition-colors"
              onClick={onSkip}
            >
              {t('skip')}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}