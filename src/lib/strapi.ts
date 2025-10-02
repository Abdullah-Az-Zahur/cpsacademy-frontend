// src/lib/strapi.ts
import axios from "axios";
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function parseStrapiError(data: any) {
  try {
    if (!data) return null;

    // 1) direct error.message string
    if (typeof data?.error?.message === "string") return data.error.message;

    // 2) nested messages array (common)
    const maybeArray = data?.message || data?.error?.message;
    if (Array.isArray(maybeArray) && maybeArray.length > 0) {
      // e.g. [{ messages: [{ message: "Email already taken" }] }]
      const first = maybeArray[0];
      const inner = first?.messages?.[0]?.message;
      if (inner) return inner;
      if (first?.message) return first.message;
    }

    // 3) details or validation object
    if (data?.error?.details) return JSON.stringify(data.error.details);

    // 4) fallback to whole object
    return JSON.stringify(data);
  } catch (e) {
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
  } catch (err: any) {
    console.error("registerUser error full:", err);
    const responseData = err?.response?.data;
    console.error("Strapi response data:", responseData);

    // map to human message
    const serverMsg =
      parseStrapiError(responseData) || err.message || "Registration failed";

    // Helpful hint for typical connection issues
    if (err.code === "ECONNREFUSED" || err.message?.includes("connect")) {
      throw new Error(
        `Cannot connect to Strapi at ${STRAPI_URL}. Is Strapi running?`
      );
    }

    // Throw with readable message to UI
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
  } catch (err: any) {
    console.error("loginUser error full:", err);
    const responseData = err?.response?.data;
    console.error("Strapi response data:", responseData);

    // map to human message
    const serverMsg =
      parseStrapiError(responseData) || err.message || "Login failed";

    // Helpful hint for typical connection issues
    if (err.code === "ECONNREFUSED" || err.message?.includes("connect")) {
      throw new Error(
        `Cannot connect to Strapi at ${STRAPI_URL}. Is Strapi running?`
      );
    }

    // Throw with readable message to UI
    throw new Error(serverMsg);
  }
}
