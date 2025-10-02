// src/lib/strapi.ts
import axios from "axios";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

type NestedObject = Record<string, unknown>;

function parseStrapiError(data: unknown) {
  try {
    if (!data) return null;

    const d = data as NestedObject;

    // 1) direct error.message string
    if (
      typeof (d["error"] as NestedObject | undefined)?.["message"] === "string"
    ) {
      return (d["error"] as NestedObject).message as string;
    }

    // 2) nested messages array (common)
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

    // 3) details or validation object
    if ((d["error"] as NestedObject | undefined)?.["details"]) {
      return JSON.stringify((d["error"] as NestedObject).details);
    }

    // 4) fallback to whole object
    return JSON.stringify(d);
  } catch {
    return JSON.stringify(data);
  }
}

export async function registerUser(
  email: string,
  password: string,
  username?: string,
  roleType?: string
) {
  try {
    const resp = await axios.post(
      `${STRAPI_URL}/api/custom-register`,
      { email, password, username, ...(roleType ? { roleType } : {}) },
      { timeout: 10000 }
    );
    return resp.data;
  } catch (err: unknown) {
    console.error("registerUser error full:", err);

    let responseData: unknown;
    let serverMsg = "Registration failed";

    // Check if error is an AxiosError
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

export async function loginUser(email: string, password: string) {
  try {
    const resp = await axios.post(
      `${STRAPI_URL}/api/custom-login`,
      { email, password },
      { timeout: 10000 }
    );
    return resp.data;
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
