export async function registerUser(
  email: string,
  password: string,
  username?: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.error?.message || data?.message || JSON.stringify(data);
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );
  }
  return data;
}

export async function strapiLogin(identifier: string, password: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.error?.message || data?.message || JSON.stringify(data);
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );
  }
  return data;
}
