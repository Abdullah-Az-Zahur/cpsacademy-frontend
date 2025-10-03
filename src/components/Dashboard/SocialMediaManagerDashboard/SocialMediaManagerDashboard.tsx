import CreatePost from "@/components/Dashboard/SocialMediaManagerDashboard/CreatePost";
import SMMOverview from "@/components/Dashboard/SocialMediaManagerDashboard/SMMOverview";
import { useAuth } from "@/lib/auth";
import React, { useState } from "react";

function SocialMediaManagerDashboard() {
  const { user, loading } = useAuth();
  const [activeComponent, setActiveComponent] = useState("home");

  // Map component keys to actual components
  const componentMap: Record<string, React.ReactNode> = {
    home: (
      <div>
        <h1 className="text-2xl font-bold mb-4">Social Media Manager Home</h1>
        <p className="text-gray-700">
          Welcome,{" "}
          <span className="font-medium">{user?.username ?? "Guest"}</span>.
        </p>
      </div>
    ),
    overview: <SMMOverview />,
    createPost: <CreatePost />,
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {componentMap[activeComponent] || componentMap.home}
      </main>
    </div>
  );
}

export default SocialMediaManagerDashboard;
