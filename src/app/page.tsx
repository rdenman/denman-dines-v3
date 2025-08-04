import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h1>Denman Dines</h1>

      {session?.user ? (
        <p>Welcome {session.user.name}!</p>
      ) : (
        <p>You should login!</p>
      )}
    </>
  );
}
