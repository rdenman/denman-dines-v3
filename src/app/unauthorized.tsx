import { FormLoadingButton } from "@/components/form-loading-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <CardTitle className="text-3xl font-bold">
              401 - Unauthorized
            </CardTitle>
            <CardDescription className="text-lg">
              You need to be logged in to access this page
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Please log in to continue to your requested page.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <FormLoadingButton type="submit" variant="outline">
                  🔐 Sign In
                </FormLoadingButton>
              </form>
              <Button asChild>
                <Link href="/">🏠 Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
