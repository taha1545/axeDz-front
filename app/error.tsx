"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { StatusAction, StatusScreen } from "@/components/status-screen";

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
    <StatusScreen
      badge="Error"
      title="Something went wrong"
      description="An unexpected error occurred while loading this page. You can try again or return to the homepage."
      icon={<AlertTriangle className="h-8 w-8" />}
      actions={
        <>
          <StatusAction onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Try again
          </StatusAction>
          <StatusAction href="/" variant="outline">
            <Home className="h-4 w-4" />
            Go home
          </StatusAction>
        </>
      }
    />
  );
}
