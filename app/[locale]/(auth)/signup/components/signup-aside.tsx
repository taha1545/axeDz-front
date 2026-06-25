'use client';

import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SignupAside() {
  const t = useTranslations('auth.signup');

  const features = [
    'feature1',
    'feature2',
    'feature3',
    'feature4',
  ] as const;

  return (
    <aside className="hidden lg:flex flex-col h-[90vh] my-auto relative md:py-12 justify-center items-center border-r-foreground border-b-2 lg:border-b-0 lg:border-r-2 border-border bg-background">
      <div className="max-w-2xl w-full px-12 space-y-8">
        <h1 className="text-2xl font-bold text-primary">AxeDz</h1>

        <h2 className="text-3xl font-bold tracking-tight">
          {t('asideTitle')}
        </h2>

        <ul className="list-disc list-inside text-muted-foreground space-y-10">
          {features.map((key) => (
            <li key={key}>{t(`features.${key}`)}</li>
          ))}
        </ul>

        <Link
          href="/login"
          className="block rounded-3xl bg-foreground py-3 text-center text-base font-bold text-background transition-colors hover:bg-foreground/90"
        >
          {t('login')}
        </Link>
      </div>
    </aside>
  );
}