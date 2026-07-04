import { SignupForm } from "./components/signup-form";
import SignupAside from "./components/signup-aside";

import { getPageMetadata, type Locale } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getPageMetadata('/signup', locale as Locale);
}

export default function SignupPage() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen justify-center items-center">
      <SignupAside />
      <SignupForm />
    </main>
  );
}