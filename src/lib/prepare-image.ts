const MAX_DIMENSION = 2048;
const JPEG_QUALITY = 0.85;

export class UnsupportedImageError extends Error {
  constructor() {
    super(
      "Unsupported image format. Please use JPEG, PNG, WebP, GIF, or HEIC.",
    );
    this.name = "UnsupportedImageError";
  }
}

async function decodeImage(file: File): Promise<ImageBitmap> {
  const { isHeic, heicTo } = await import("heic-to/next");
  try {
    if (await isHeic(file)) {
      return await heicTo({ blob: file, type: "bitmap" });
    }
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new UnsupportedImageError();
  }
}

function toJpegName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "") || "photo";
  return `${base}.jpg`;
}

/**
 * Converts HEIC/HEIF to JPEG and downscales large photos so uploads stay
 * small and display in every browser. GIFs pass through to keep animation.
 */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (file.type === "image/gif") {
    return file;
  }

  const bitmap = await decodeImage(file);
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
  );
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not supported");
  }
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
  );
  if (!blob) {
    throw new Error("Failed to encode image");
  }

  return new File([blob], toJpegName(file.name), { type: "image/jpeg" });
}
