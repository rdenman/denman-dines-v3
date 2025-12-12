import { signIn } from "@/lib/auth.server";
import { FormLoadingButton } from "./form-loading-button";

export function SignInButton() {
  return (
    <form action={signIn}>
      <FormLoadingButton type="submit" variant="outline">
        ➜] Sign In
      </FormLoadingButton>
    </form>
  );
}
