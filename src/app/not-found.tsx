import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageContainer className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={UtensilsCrossed}
        title="Page not found"
        description="Lost in the sauce. The page you're looking for doesn't exist or may have been moved."
      >
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </EmptyState>
    </PageContainer>
  );
}
