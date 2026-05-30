"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="mb-2 text-3xl font-bold">
          Something went wrong
        </h1>

        <p className="mb-8 text-muted-foreground">
          An unexpected error occurred while loading this page.
        </p>

        <Button onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}