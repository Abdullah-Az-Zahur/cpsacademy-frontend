import React from "react";

function NormalUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default NormalUserLayout;
