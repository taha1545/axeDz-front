"use client";
import { Button } from "@/components/ui/button";
export default function LoginAside() {
  return (
    <aside className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-20 py-10 flex flex-col justify-arround gap-7">
      <h1 className="text-primary font-bold text-2xl">AxeDz</h1>

      <h2 className="text-3xl font-bold">Create an account</h2>

      <ul className="list-disc list-inside text-muted-foreground py-4 space-y-3">
        <li>
          Start building with AxeDz in minutes. Create your account to access a
          unified platform for SMS, Email, and Cloud Storage APIs — all in one
          place.
        </li>

        <li>
          Set up your workspace, generate your API keys, and begin integrating
          powerful communication tools into your applications with ease.
        </li>

        <li>
          No complex setup, no external payment barriers — everything is
          designed for developers in Algeria, with local billing in DZD.
        </li>

        <li>
          Join a growing ecosystem of developers and teams building scalable,
          reliable digital products across the country.
        </li>
      </ul>

      <Button
        type="button"
        size="lg"
        className="rounded-4xl bg-foreground text-muted hover:bg-foreground/90"
      >
        Create Account
      </Button>
    </aside>
  );
}
