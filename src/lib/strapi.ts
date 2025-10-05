import axios from "axios";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

type NestedObject = Record<string, unknown>;

/** Small, flexible content block shape — extend if your CMS uses richer blocks */
export type TextNode = { type: "text"; text: string };
export type ContentBlock = { type: string; children: TextNode[] };

/** Upload result from Strapi (shape may vary; this covers common fields) */
export type UploadResult = Record<string, unknown> & {
  id?: number;
  url?: string;
};

function parseStrapiError(data: unknown): string | null {
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

// Axios client configured to include credentials (cookies) for cross-site auth
const axiosClient = axios.create({
  baseURL: STRAPI_URL,
  timeout: 10000,
  withCredentials: true,
});

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

/** Upload an image file to Strapi */
export async function uploadImage(
  file: File,
  jwt?: string
): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    credentials: "include", // ensure cookies are sent/received
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Image upload failed: ${res.status} ${text}`);
  }

  const json = await res.json().catch(() => null);
  if (Array.isArray(json)) {
    return (json[0] ?? {}) as UploadResult;
  }
  return (json ?? {}) as UploadResult;
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
  type Body = { data: Record<string, unknown> };
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
