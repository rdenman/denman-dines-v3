import { LogIn } from "lucide-react";
import { signIn } from "@/lib/auth.server";
import { FormLoadingButton } from "./form-loading-button";

export function SignInButton() {
  return (
    <form action={signIn}>
      <FormLoadingButton type="submit" variant="outline" size="sm">
        <LogIn className="size-4" />
        Sign In
      </FormLoadingButton>
    </form>
  );
}
