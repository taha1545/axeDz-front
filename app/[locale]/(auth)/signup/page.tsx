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
    <main className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side */}
      <div className="flex w-full items-center justify-center px-[8%] lg:w-1/2">
        <SignupForm />
      </div>

      {/* Right Side */}
      <SignupAside />
    </main>
  );
}