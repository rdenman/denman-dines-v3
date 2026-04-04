import { LogIn } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageContainer } from "@/components/page-container";
import { SignInButton } from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <PageContainer className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={LogIn}
        title="Sign in required"
        description="You need to be logged in to access this page."
      >
        <SignInButton />
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </EmptyState>
    </PageContainer>
  );
}
