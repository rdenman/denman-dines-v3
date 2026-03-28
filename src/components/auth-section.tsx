"use client";

import { UserMenu } from "@/components/user-menu";
import { useSession } from "@/lib/auth";
import { SignInButton } from "./sign-in-button";

export function AuthSection() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="h-9 w-20 rounded-md bg-muted animate-pulse" />;
  }

  if (session?.user) {
    return <UserMenu user={session.user} />;
  }

  return <SignInButton />;
}
