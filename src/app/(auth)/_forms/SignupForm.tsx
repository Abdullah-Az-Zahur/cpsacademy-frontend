"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser, registerUser } from "@/lib/strapi";

const ROLE_OPTIONS = [
  { label: "Normal User", value: "normal_user" },
  { label: "Student", value: "student" },
  { label: "Developer", value: "developer" },
  { label: "Social Media Manager", value: "social_media_manager" },
];

function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleType, setRoleType] = useState(ROLE_OPTIONS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const safeUsername = username.trim() || email.split("@")[0];

    setLoading(true);

    try {
      // registerUser should send roleType in the payload
      await registerUser(email, password, safeUsername, roleType);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // reg may already include jwt/user but we call login to be consistent
      const { user, jwt } = await loginUser(email, password);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", jwt);

      if (result?.ok) {
        router.push("/");
      } else {
        setError(
          "Registered but automatic login failed. Please login manually."
        );
        // router.push("/login");
      }
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Login failed");
  }
    } finally {
      setLoading(false);
    }

    console.log(email, password, username, roleType);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Sign up to your account
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="userName"> Username</Label>
              <Input
                id="userName"
                type="text"
                placeholder="Please enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="roleType">Role</Label>
              <select
                id="roleType"
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="border rounded-md p-2"
                required
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 mt-5">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}

export default SignupForm;
