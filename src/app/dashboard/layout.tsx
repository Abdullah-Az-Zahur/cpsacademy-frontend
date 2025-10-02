"use client";
import React from "react";
import { useAuth } from "@/lib/auth";
import DeveloperDashboard from "@/components/Dashboard/DeveloperDashboard/DeveloperDashboard";
import StudentDashboard from "@/components/Dashboard/StudentDashboard/StudentDashboard";
import SocialMediaManagerDashboard from "@/components/Dashboard/SocialMediaManagerDashboard/SocialMediaManagerDashboard";
import NormalUserDashboard from "@/components/Dashboard/NormalUserDashboard/NormalUserDashboard";

// Role layouts with sidebar

// Role content components

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  // Render role-specific layout with role-specific content
  switch (user.role) {
    case "developer":
      return <DeveloperDashboard />;

    case "student":
      return <StudentDashboard />;
    case "social_media_manager":
      return <SocialMediaManagerDashboard />;
    case "normal_user":
    default:
      return <NormalUserDashboard />;
  }
}
