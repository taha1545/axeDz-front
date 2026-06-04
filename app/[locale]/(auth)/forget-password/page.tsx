"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const ForgetPasswordPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen py-2">
        <div className="absolute top-4 left-4 flex flex-col items-start">
          <span className="text-2xl text-primary font-bold">AxeDz</span>
        </div>
        <h2 className="text-2xl font-bold ">Forget Password</h2>
        <a href="/login" className="text-sm  text-primary hover:underline mb-6">
          Remember your password? Login here.
        </a>
        <form className="w-full max-w-sm flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-background"
            />
          </Field>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-4xl border-foreground "
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
