import DeveloperSidebar from "@/components/Sidebars/DeveloperSidebar";
import { useAuth } from "@/lib/auth";
import React from "react";

function DeveloperDashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <DeveloperSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
        <p className="text-gray-700">
          Welcome,{" "}
          <span className="font-medium">{user?.username ?? "Guest"}</span>.
        </p>
      </main>
    </div>
  );
}

export default DeveloperDashboard;
