"use client";

import { SignupForm } from "./components/signup-form";
import SignupAside from "./components/signup-aside";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <SignupAside />

      {/* Right Side */}
      <div className="flex flex-col gap-4 md:p-10 p-6">
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
