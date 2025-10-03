// src/lib/roles.ts
export type RoleKey = "developer" | "student" | "social_media_manager" | "normal_user";

export const ROLE_LABELS: Record<RoleKey, string> = {
  developer: "Developer",
  student: "Student",
  social_media_manager: "Social Media Manager",
  normal_user: "User",
};

// map role -> module import path (used by DashboardLayout)
export const ROLE_MODULES: Record<RoleKey, () => Promise<any>> = {
  developer: () => import("@/modules/developer/index"),
  student: () => import("@/modules/student/index"),
  social_media_manager: () => import("@/modules/socialMediaManager/index"),
  normal_user: () => import("@/modules/normalUser/index"),
};