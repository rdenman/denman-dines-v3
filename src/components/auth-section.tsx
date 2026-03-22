"use client";

import { UserMenu } from "@/components/user-menu";
import { useSession } from "@/lib/auth";
import { SignInButton } from "./sign-in-button";

interface AuthSectionProps {
  skeletonClassName?: string;
}

export function AuthSection({
  skeletonClassName = "h-10 w-10",
}: AuthSectionProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className={`${skeletonClassName} rounded-full bg-muted animate-pulse`} />
    );
  }

  if (session?.user) {
    return <UserMenu user={session.user} />;
  }

  return <SignInButton />
}
