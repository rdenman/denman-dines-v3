import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/components/user-menu";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "./sign-in-button";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <div className="flex items-center space-x-4">
          <ModeToggle />

          {session?.user ? <UserMenu user={session.user} /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
}
