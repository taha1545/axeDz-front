
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading AxeDz</h2>
          <p className="text-sm text-muted-foreground">
            Preparing your dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}