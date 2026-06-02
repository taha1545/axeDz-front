import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <h1 className="text-2xl w-fit font-bold text-background bg-foreground py-1 px-2">
        Sign up
      </h1>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background"
          />
        </Field>
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
        <Field className="flex-row items-center gap-4">
          <Field >
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="+213 123 456 789"
            required
            className="bg-background"
          />
          
        </Field>
        <Field>
          <FieldLabel htmlFor="Code">Code</FieldLabel>
          <Input
            id="code"
            type="number"
            placeholder="123456"
            required
            className="bg-background"
          />
        </Field>
        </Field>
        
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <Button type="submit">Sign up</Button>
        </Field>
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
      </FieldGroup>
    </form>
  )
}
