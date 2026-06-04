"use client";
import { Button } from "@/components/ui/button";
export default function SignupAside() {
  return (
    <aside className="hidden lg:flex flex-col justify-center items-center border-r-foreground border-b-2 lg:border-b-0 lg:border-r-2 border-border bg-background">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold tracking-tight">
          Your platform, your communication, powered by
        </h2>

        <h1 className="text-primary font-bold text-2xl">AxeDz</h1>

        <ul className="list-disc list-inside text-muted-foreground py-4 space-y-3">
          <li>
            Activate SMS, Email, and Cloud Storage through a single unified API
            designed for developers in Algeria.
          </li>
          <li>
            Connect with your users through reliable, scalable communication
            channels in just a few steps.
          </li>
          <li>
            Start building instantly with a simple setup and no complex
            integrations.
          </li>
          <li>
            Pay locally in Algerian Dinars (DZD) and scale at your own pace with
            a flexible pay-as-you-use model.
          </li>
          <li>
            Explore AxeDz APIs or manage everything بسهولة through a clean,
            developer-friendly dashboard.
          </li>
          <li>
            Seamlessly integrate and control your communication infrastructure —
            your way.
          </li>
        </ul>

        <div className="mt-3 flex flex-col gap-4">
          <a
            href="/login"
            className="text-sm text-muted-foreground hover:underline"
          >
            Already have an account?
          </a>

          <Button
            className="rounded-4xl bg-foreground text-muted hover:bg-foreground/90"
            asChild
          >
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    </aside>
  );
}
