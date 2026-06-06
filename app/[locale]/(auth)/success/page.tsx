"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    localStorage.setItem("token", token);

    router.replace("/dashboard");
  }, [params, router]);

  return <div>Signing you in...</div>;
}
