import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { EyeOff , Eye } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <form className="w-full lg:w-1/2 flex flex-col gap-4 px-6 sm:px-10 lg:px-20 py-10 border-b-2 lg:border-b-0 lg:border-r-2 border-border bg-background">
      <h1 className="text-2xl w-fit font-bold text-background bg-foreground py-1 px-2 rounded-md">
        Login
      </h1>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>

        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="h-11 rounded-4xl px-4"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>

        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Eye size={18} className="text-muted-foreground" />
          ) : (
            <EyeOff size={18} className="text-muted-foreground" />
          )}

          <span className="text-sm text-muted-foreground">
            {showPassword ? "show" : "hide"}
          </span>
        </div>
      </div>

      <Input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Enter your password"
        className="h-11 rounded-4xl px-4"
        required
      />
    </div>

      <a href="#" className="text-sm underline w-fit">
        Reset Password
      </a>

      <Button
        type="submit"
        size="lg"
        className="rounded-4xl"
      >
        Login
      </Button>

      <div className="flex items-center gap-4 my-2 text-muted-foreground text-sm">
        <div className="flex-1 border-t border-border"></div>
        OR
        <div className="flex-1 border-t border-border"></div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="rounded-4xl"
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>

      <Button
        type="button"
        size="lg"
        className="rounded-4xl bg-foreground text-muted hover:bg-foreground/90"
      >
        <FaGithub size={20} />
        Continue with GitHub
      </Button>

      <p className="text-xs text-muted-foreground mt-2">
        By continuing, you agree to the{" "}
        <span className="underline cursor-pointer">
          Terms of use
        </span>{" "}
        and{" "}
        <span className="underline cursor-pointer">
          Privacy Policy
        </span>
        .
      </p>
    </form>
  );
}