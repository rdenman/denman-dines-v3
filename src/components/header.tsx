import { ModeToggle } from "@/components/mode-toggle";
import { RecipeSearch } from "@/components/recipe-search";
import { UserMenu } from "@/components/user-menu";
import { getSession } from "@/lib/auth.server";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "./sign-in-button";

export async function Header() {
  const session = await getSession();

  console.log(session);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile layout: stacked */}
        <div className="flex flex-col space-y-3 py-3 md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-6 w-6">
                <Image
                  src="/logo.webp"
                  alt="Denman Dines Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="24px"
                />
              </div>
              <span className="text-lg font-bold whitespace-nowrap">
                Denman Dines
              </span>
            </Link>

            <div className="flex items-center space-x-2">
              <ModeToggle />
              {session?.user ? (
                <UserMenu user={session.user} />
              ) : (
                <SignInButton />
              )}
            </div>
          </div>

          {/* Mobile search */}
          <div className="w-full">
            <RecipeSearch placeholder="Search recipes..." className="w-full" />
          </div>
        </div>

        {/* Desktop layout: horizontal */}
        <div className="hidden md:flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.webp"
                  alt="Denman Dines Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="32px"
                />
              </div>
              <span className="text-xl font-bold whitespace-nowrap">
                Denman Dines
              </span>
            </Link>
          </div>

          {/* Desktop search */}
          <div className="flex-1 max-w-md mx-8">
            <RecipeSearch placeholder="Search recipes..." className="w-full" />
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
