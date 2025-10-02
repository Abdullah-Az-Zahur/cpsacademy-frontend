import SessionProviderClient from "@/providers/SessionProviderClient";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderClient>
      <div>
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4">Sidebar here</aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SessionProviderClient>
  );
}

export default DashboardLayout;
