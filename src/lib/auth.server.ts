"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth.config";

export async function getSession() {
  return await auth.api.getSession({ headers: await headers() });
}

export async function signIn() {
  const { url } = await auth.api.signInSocial({
    body: { provider: "google" },
    headers: await headers(),
  });
  if (url) {
    redirect(url);
  }
}
