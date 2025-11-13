import { auth } from "@/lib/auth.server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FormLoadingButton } from "./form-loading-button";

export function SignInButton() {
  async function handleSignIn() {
    "use server";
    const { url } = await auth.api.signInSocial({
      body: { provider: "google" },
      headers: await headers(),
    });
    if (url) {
      redirect(url);
    }
  }

  return (
    <form action={handleSignIn}>
      <FormLoadingButton type="submit" variant="outline">
        ➜] Sign In
      </FormLoadingButton>
    </form>
  );
}
