"use client";
import React from "react";
import { useAuth } from "@/lib/auth";
import RoleDashboard from "@/components/Dashboard/RoleDashboard";

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user || !user.role) return <div>Please login</div>;

  const normalizedUser = {
    ...user,
    id: String(user.id),
    email: user.email ?? undefined,
    username: user.username ?? undefined,
    name: user.name ?? undefined,
    role: user.role!,
    jwt: user.jwt ?? undefined,
  };

  return <RoleDashboard role={normalizedUser.role} user={normalizedUser} />;
}
