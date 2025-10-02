// src/app/dashboard/page.tsx
"use client";
import React from "react";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard Home</h1>
      <p>Welcome, {user?.username ?? "Guest"}.</p>
    </div>
  );
}
