import { del } from "@vercel/blob";

/**
 * True when the URL points at this app's Vercel Blob store. Photos from
 * elsewhere (seed data, external URLs) are never deleted.
 */
export function isOwnedBlobUrl(url: string | null | undefined): url is string {
  const blobHostname = process.env.BLOB_HOSTNAME;
  if (!url || !blobHostname) {
    return false;
  }

  try {
    return new URL(url).hostname === blobHostname;
  } catch {
    return false;
  }
}

/**
 * Best-effort delete of a recipe photo from Blob storage. Failures are logged,
 * not thrown: an orphaned blob is preferable to failing the DB operation that
 * already succeeded.
 */
export async function deleteRecipePhoto(
  url: string | null | undefined,
): Promise<void> {
  if (!isOwnedBlobUrl(url)) {
    return;
  }

  try {
    await del(url);
  } catch (error) {
    console.error("Failed to delete recipe photo from blob storage:", error);
  }
}
