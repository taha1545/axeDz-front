import { SignupForm } from "./components/signup-form";
import SignupAside from "./components/signup-aside";

import { getPageMetadata, type Locale } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('/signup', locale as Locale);
}

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:h-screen lg:grid-cols-2 w-full">
      <SignupAside />

      {/* Right Side */}
      <div className="flex w-full h-full justify-center items-start lg:items-center overflow-auto p-4 sm:p-6">
        <div className="w-full max-w-xl py-6 lg:py-0">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}