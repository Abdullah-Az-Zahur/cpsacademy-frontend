"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import GenericSidebar, { MenuItem } from "../Sidebars/Dashboard/GenericSidebar";
import { logout } from "@/lib/auth";
import { Props, Role } from "@/types/user";

// lazy imports for heavy components
const CreatePost = dynamic(
  () => import("@/components/Dashboard/SocialMediaManagerDashboard/CreatePost")
);
const SMMOverview = dynamic(
  () => import("@/components/Dashboard/SocialMediaManagerDashboard/SMMOverview")
);
const Projects = dynamic(
  () => import("@/components/Dashboard/DeveloperDashboard/Projects")
);
const Tools = dynamic(
  () => import("@/components/Dashboard/DeveloperDashboard/Tools")
);
const DevConsole = dynamic(
  () => import("@/components/Dashboard/DeveloperDashboard/DevConsole")
);
const StudentCourses = dynamic(
  () => import("@/components/Dashboard/StudentDashboard/StudentCourses")
);
const StudentOverview = dynamic(
  () => import("@/components/Dashboard/StudentDashboard/StudentOverview")
);
const UserOverview = dynamic(
  () => import("@/components/Dashboard/NormalUserDashboard/UserOverview")
);


type MenuItemWithComponent = {
  id: string;
  label: string;
  Component: React.ComponentType<Record<string, unknown>> | null;
};

const menus: Record<Role, MenuItemWithComponent[]> = {
  social_media_manager: [
    { id: "smmOverview", label: "Overview", Component: SMMOverview },
    { id: "createPost", label: "Create Post", Component: CreatePost },
  ],
  developer: [
    { id: "devconsole", label: "Dev Console", Component: DevConsole },
    { id: "projects", label: "Projects", Component: Projects },
    { id: "tools", label: "Tools", Component: Tools },
  ],
  student: [
    { id: "courses", label: "Courses", Component: StudentCourses },
    {
      id: "studentOverview",
      label: "StudentOverview",
      Component: StudentOverview,
    },
  ],
  normal_user: [
    { id: "userOverview", label: "UserOverview", Component: UserOverview },
    { id: "tools", label: "Tools", Component: Tools },
  ],
};

export default function RoleDashboard({ role, user }: Props) {
  const roleMenu = menus[role] ?? [];
  const defaultActive = roleMenu[0]?.id ?? "";

  // active state: which menu item is selected
  const [activeId, setActiveId] = useState<string>(defaultActive);

  // transform for GenericSidebar (strip Component)
  const sidebarMenu: MenuItem[] = roleMenu.map(({ id, label }) => ({
    id,
    label,
  }));

  const activeEntry = roleMenu.find((m) => m.id === activeId) ?? roleMenu[0];
  const ActiveComponent = activeEntry?.Component;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <GenericSidebar
        title={role.replace(/_/g, " ").toUpperCase()}
        menu={sidebarMenu}
        activeId={activeId}
        onSelect={setActiveId}
        footer={
          <div>
            <button onClick={logout} className="text-sm text-red-600">
              Logout
            </button>
          </div>
        }
      />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{activeEntry?.label}</h1>

        <div className="bg-white rounded shadow-sm p-4">
          {ActiveComponent ? (
            <ActiveComponent user={user} />
          ) : (
            <div>Nothing to display</div>
          )}
        </div>
      </main>
    </div>
  );
}
