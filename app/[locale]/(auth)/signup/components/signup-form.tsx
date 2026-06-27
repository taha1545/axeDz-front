'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaArrowLeft } from 'react-icons/fa';
import { EyeOff, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { signupSchema, type SignupInput } from '@/schemas/auth';

export function SignupForm() {
  const t = useTranslations('auth.signup');

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { signup, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupInput) => {
    clearErrors('root');
    try {
      await signup(data);
      router.push('/verify-phone');
      router.refresh();
    } catch (err: unknown) {
      let message = t('signupFailed');
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
        const res = err.response.data;
        //
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
        }
        // 
        else if (
          'message' in res &&
          typeof res.message === 'string'
        ) {
          message = res.message;
        }
      }

      setError('root', { message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 sm:gap-5"
    >
      <div className="lg:hidden flex items-center justify-between mb-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          <FaArrowLeft />
          {t('home')}
        </Link>
        <span className="text-xl font-bold text-primary">AxeDz</span>
      </div>

      <h1 className="mx-auto mb-2 rounded-xl bg-foreground px-5 py-3 text-xl sm:text-2xl font-bold text-background">
        {t('title')}
      </h1>

      {errors.root && (
        <p className="rounded-lg  text-center bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errors.root.message}
        </p>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className="px-3 text-sm text-foreground">{t('fullName')}</Label>
          <Input
            type="text"
            placeholder={t('fullNamePlaceholder')}
            className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
            disabled={isSigningUp}
            {...register('name')}
          />
          {errors.name && (
            <p className="px-3 text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="px-3 text-sm text-foreground">{t('email')}</Label>
          <Input
            type="email"
            placeholder={t('emailPlaceholder')}
            className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
            disabled={isSigningUp}
            {...register('email')}
          />
          {errors.email && (
            <p className="px-3 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <Label className="px-3 text-sm text-foreground">{t('phone')}</Label>
        <div className="flex">
          <span className="inline-flex h-11 items-center rounded-l-4xl border border-r-0 border-foreground/80 bg-muted px-4 sm:px-6 text-sm font-medium text-muted-foreground">
            +213
          </span>
          <Input
            type="tel"
            placeholder={t('phonePlaceholder')}
            className="h-11 flex-1 rounded-l-none rounded-r-4xl border-foreground/80 px-6 text-muted-foreground"
            disabled={isSigningUp}
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <p className="px-3 text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-3">
          <Label className="text-sm text-foreground">{t('password')}</Label>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-muted-foreground"
            onClick={() => setShowPassword((p) => !p)}
            disabled={isSigningUp}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            {showPassword ? t('hide') : t('show')}
          </button>
        </div>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={t('passwordPlaceholder')}
          className="h-11 rounded-4xl border-foreground/80 px-6 text-muted-foreground"
          disabled={isSigningUp}
          {...register('password')}
        />
        {errors.password && (
          <p className="px-3 text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <p className="px-3 text-xs text-muted-foreground">
        {t('agreement')}{' '}
        <Link href="/privacy" className="underline">
          {t('privacyPolicy')}
        </Link>{' '}
        {t('and')}{' '}
        <Link href="/terms" className="underline">
          {t('termsOfService')}
        </Link>
        .
      </p>

      <Button
        type="submit"
        size="lg"
        className="rounded-3xl py-5 sm:py-6 text-base"
        disabled={isSigningUp}
      >
        {isSigningUp ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('signingUp')}
          </span>
        ) : (
          t('signupButton')
        )}
      </Button>

      <div className="my-1 sm:my-2 flex items-center gap-1 text-sm text-muted-foreground">
        <div className="flex-1 border-t border-border" />
        {t('or')}
        <div className="flex-1 border-t border-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="rounded-3xl py-4 sm:py-5 text-base"
        disabled={isSigningUp}
        onClick={() =>
          (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google`)
        }
      >
        <FcGoogle size={20} />
        {t('continueGoogle')}
      </Button>

      <Button
        type="button"
        size="lg"
        className="rounded-3xl bg-foreground py-4 sm:py-5 text-base text-muted hover:bg-foreground/90"
        disabled={isSigningUp}
        onClick={() =>
          (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/github`)
        }
      >
        <FaGithub size={20} />
        {t('continueGithub')}
      </Button>
    </form>
  );
}