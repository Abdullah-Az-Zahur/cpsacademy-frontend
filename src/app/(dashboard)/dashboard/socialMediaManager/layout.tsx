import SocialMediaManagerSidebar from "@/components/Sidebars/SocialMediaManagerSidebar";
import React from "react";

function SocialMediaManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <SocialMediaManagerSidebar/>
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default SocialMediaManagerLayout;
