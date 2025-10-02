import StudentSidebar from "@/components/Sidebars/StudentSidebar";
import React from "react";

function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <StudentSidebar/>
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default StudentLayout;
