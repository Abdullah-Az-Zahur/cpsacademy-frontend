import NormalUserSidebar from "@/components/Sidebars/NormalUserSidebar";
import React from "react";

function NormalUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <NormalUserSidebar/>
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default NormalUserLayout;
