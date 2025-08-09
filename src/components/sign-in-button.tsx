import { signIn } from "@/lib/auth";
import { FormLoadingButton } from "./form-loading-button";

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <FormLoadingButton type="submit" variant="outline">
        ➜] Sign In
      </FormLoadingButton>
    </form>
  );
}
