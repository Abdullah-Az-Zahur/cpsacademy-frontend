"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

export default function LogoutButton() {
  return (
    <Button variant="destructive" onClick={logout}>
      Logout
    </Button>
  );
}
