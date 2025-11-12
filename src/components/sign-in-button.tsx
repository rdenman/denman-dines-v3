"use client";

import { signIn } from "@/lib/auth";
import { FormLoadingButton } from "./form-loading-button";

export function SignInButton() {
  async function handleSignIn() {
    await signIn.social({
      provider: "google",
    });
  }

  return (
    <form onSubmit={handleSignIn}>
      <FormLoadingButton type="submit" variant="outline">
        ➜] Sign In
      </FormLoadingButton>
    </form>
  );
}
