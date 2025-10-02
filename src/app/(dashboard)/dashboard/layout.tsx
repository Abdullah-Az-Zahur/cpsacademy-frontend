import { useAuth } from "@/lib/auth";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth;

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return null;

  switch (user.role) {
    case "developer":
      return 
      break;
  
    default:
      break;
  }

  return <div></div>;
}

export default DashboardLayout;
