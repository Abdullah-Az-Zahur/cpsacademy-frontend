import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      DashboardLayout
    </div>
  );
}

export default DashboardLayout;
