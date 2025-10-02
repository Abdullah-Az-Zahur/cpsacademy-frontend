// src/app/dashboard/layout.tsx
"use client";
import React from "react";
import { useAuth } from "@/lib/auth";
import DeveloperLayout from "./developer/layout";
import StudentLayout from "./student/layout";
import SocialMediaManagerLayout from "./socialMediaManager/layout"; 
import NormalUserLayout from "./normalUser/layout"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // CALL the hook!
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return null; // useAuth likely redirected to /login

  switch (user.role) {
    case "developer":
      return <DeveloperLayout>{children}</DeveloperLayout>;
    case "student":
      return <StudentLayout>{children}</StudentLayout>;
    case "social_media_manager":
      return <SocialMediaManagerLayout>{children}</SocialMediaManagerLayout>;
    case "normal_user":
    default:
      return <NormalUserLayout>{children}</NormalUserLayout>;
  }
}
