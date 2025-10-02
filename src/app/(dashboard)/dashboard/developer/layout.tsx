import DeveloperSidebar from "@/components/Sidebars/DeveloperSidebar";
import React from "react";

function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <DeveloperSidebar />
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default DeveloperLayout;
