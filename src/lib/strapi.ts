// lib/strapi.ts
import axios from "axios";
import { Body, ContentBlock, NestedObject, UploadResult } from "@/types/strapi";

/**
 * Normalize STRAPI_URL (no trailing slash)
 */
export const STRAPI_URL: string = (
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
).replace(/\/$/, "");

/**
 * Parse Strapi-style error payloads into a readable string.
 * Keeps using NestedObject for flexible JSON shapes.
 */
export function parseStrapiError(data: unknown): string | null {
  try {
    if (!data) return null;

    const d = data as NestedObject;

    if (
      typeof (d["error"] as NestedObject | undefined)?.["message"] === "string"
    ) {
      return (d["error"] as NestedObject).message as string;
    }

    const maybeArray =
      d["message"] ?? (d["error"] as NestedObject | undefined)?.["message"];
    if (Array.isArray(maybeArray) && maybeArray.length > 0) {
      const first = maybeArray[0] as NestedObject;
      const inner = (first["messages"] as NestedObject[] | undefined)?.[0]?.[
        "message"
      ] as string | undefined;
      if (inner) return inner;
      if (first["message"] && typeof first["message"] === "string")
        return first["message"];
    }

    if ((d["error"] as NestedObject | undefined)?.["details"]) {
      return JSON.stringify((d["error"] as NestedObject).details);
    }

    return JSON.stringify(d);
  } catch {
    return JSON.stringify(data);
  }
}

/**
 * Axios client configured to include credentials (cookies) for cross-site auth
 */
export const axiosClient = axios.create({
  baseURL: STRAPI_URL,
  timeout: 10000,
  withCredentials: true,
});

/**
 * Type guard: is this value an UploadResult-like object?
 * We check for common fields returned by Strapi upload items (id, url or formats).
 */
function isUploadResult(value: unknown): value is UploadResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  // check for either an 'id' and 'url' or 'formats' property
  return (
    (typeof v["id"] === "number" || typeof v["id"] === "string") &&
    (typeof v["url"] === "string" || typeof v["formats"] === "object")
  );
}

/**
 * Normalize an individual media path or absolute URL to an absolute URL.
 * Accepts relative URL ("/uploads/xxx.png") or absolute ("https://...").
 */
function normalizeMediaUrl(url: string): string {
  // If already absolute (http(s) or protocol-relative), return as-is
  if (/^(https?:)?\/\//i.test(url)) return url;

  // Ensure path begins with a single slash
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${STRAPI_URL}${path}`;
}

/**
 * Convert a Strapi media object or a raw string into an absolute URL.
 *
 * media: string | UploadResult | null
 * preferredFormats: Order to try when picking a format from media.formats
 *
 * Returns: absolute url string or null when not available
 */
export function getStrapiMediaUrl(
  media?: string | UploadResult | null,
  preferredFormats: string[] = ["medium", "large", "small", "thumbnail"]
): string | null {
  if (!media) return null;

  // if passed a raw string (maybe already a URL or a relative path)
  if (typeof media === "string") {
    return normalizeMediaUrl(media);
  }

  // now media is UploadResult-like; use type guard to be safe
  if (!isUploadResult(media)) return null;

  // Try preferred formats in order (safe access)
  const formats = (
    media as UploadResult & { formats?: Record<string, { url?: string }> }
  ).formats;
  if (formats && typeof formats === "object") {
    for (const fmt of preferredFormats) {
      const fmtEntry = (formats as Record<string, { url?: string }>)[fmt];
      if (fmtEntry && typeof fmtEntry.url === "string") {
        return normalizeMediaUrl(fmtEntry.url);
      }
    }
  }

  // Fallback to top-level url
  if (typeof (media as UploadResult).url === "string") {
    return normalizeMediaUrl((media as UploadResult).url as string);
  }

  return null;
}

/**
 * Upload an image using axios (Strapi v4 style).
 * Returns the first UploadResult from the array that Strapi returns.
 */
export async function uploadImageAxios(
  file: File,
  jwt?: string
): Promise<UploadResult> {
  const form = new FormData();
  // Strapi's upload endpoint typically accepts "files" (plural) as the field name.
  form.append("files", file);

  try {
    const resp = await axiosClient.post("/api/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      },
      withCredentials: true,
    });

    // Strapi returns an array of uploaded items
    const data = resp.data;
    if (Array.isArray(data) && data.length > 0 && isUploadResult(data[0])) {
      return data[0] as UploadResult;
    }

    // If it's a single object and matches UploadResult, return it
    if (isUploadResult(data)) {
      return data as UploadResult;
    }

    // Otherwise throw a helpful error
    throw new Error("Unexpected upload response from Strapi");
  } catch (err: unknown) {
    let msg = "Image upload failed";
    if (axios.isAxiosError(err)) {
      msg = parseStrapiError(err.response?.data) || err.message;
    } else if (err instanceof Error) {
      msg = err.message;
    }
    throw new Error(msg);
  }
}

/**
 * Existing functions: registerUser, loginUser, createPost, etc.
 * (I keep the same shapes you already had but type them with safer types.)
 */

/** Register user */
export async function registerUser(
  email: string,
  password: string,
  username?: string,
  roleType?: string
): Promise<Record<string, unknown>> {
  try {
    const resp = await axiosClient.post(`/api/custom-register`, {
      email,
      password,
      username,
      ...(roleType ? { roleType } : {}),
    });
    return resp.data as Record<string, unknown>;
  } catch (err: unknown) {
    console.error("registerUser error full:", err);

    let responseData: unknown;
    let serverMsg = "Registration failed";

    if (axios.isAxiosError(err)) {
      responseData = err.response?.data;
      serverMsg = parseStrapiError(responseData) || err.message;
      if (err.code === "ECONNREFUSED" || err.message.includes("connect")) {
        throw new Error(
          `Cannot connect to Strapi at ${STRAPI_URL}. Is Strapi running?`
        );
      }
    } else if (err instanceof Error) {
      serverMsg = err.message;
    }

    throw new Error(serverMsg);
  }
}

/** Login user */
export async function loginUser(
  email: string,
  password: string
): Promise<Record<string, unknown>> {
  try {
    const resp = await axiosClient.post(`/api/custom-login`, {
      email,
      password,
    });
    return resp.data as Record<string, unknown>;
  } catch (err: unknown) {
    console.error("loginUser error full:", err);

    let responseData: unknown;
    let serverMsg = "Login failed";

    if (axios.isAxiosError(err)) {
      responseData = err.response?.data;
      serverMsg = parseStrapiError(responseData) || err.message;
      if (err.code === "ECONNREFUSED" || err.message.includes("connect")) {
        throw new Error(
          `Cannot connect to Strapi at ${STRAPI_URL}. Is Strapi running?`
        );
      }
    } else if (err instanceof Error) {
      serverMsg = err.message;
    }

    throw new Error(serverMsg);
  }
}

/** Upload using fetch (keeps your original behavior as an alternative) */
export async function uploadImageFetch(
  file: File,
  jwt?: string
): Promise<UploadResult> {
  const form = new FormData();
  form.append("files", file);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    credentials: "include",
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image upload failed: ${res.status} ${text}`);
  }

  const json = await res.json().catch(() => null);
  if (Array.isArray(json) && json.length > 0 && isUploadResult(json[0])) {
    return json[0] as UploadResult;
  }
  if (json && isUploadResult(json)) {
    return json as UploadResult;
  }

  throw new Error("Unexpected upload response from Strapi");
}

/** Create a post in Strapi */
export async function createPost(
  {
    title,
    contentBlocks,
    mediaId,
  }: {
    title: string;
    contentBlocks: ContentBlock[];
    mediaId: number | null;
  },
  jwt?: string
): Promise<Record<string, unknown>> {
  const body: Body = { data: { title, content: contentBlocks } };

  if (mediaId) {
    body.data.media = mediaId;
  }

  const res = await fetch(`${STRAPI_URL}/api/posts`, {
    method: "POST",
    credentials: "include", // include cookies when creating posts
    headers: {
      "Content-Type": "application/json",
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(
      `Create post failed: ${res.status} ${JSON.stringify(err ?? null)}`
    );
  }

  return (await res.json()) as Record<string, unknown>;
}
