import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  const users = await prisma.user.count();

  return (
    <>
      <h1>Denman Dines</h1>

      <p>Total users: {users}</p>

      {session?.user ? (
        <>
          <p>Welcome {session.user.name}!</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Signout</button>
          </form>
        </>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      )}
    </>
  );
}
