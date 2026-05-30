import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
          <SearchX className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mb-2 text-5xl font-bold">404</h1>

        <h2 className="mb-3 text-xl font-semibold">
          Page not found
        </h2>

        <p className="mb-8 text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Button asChild>
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}