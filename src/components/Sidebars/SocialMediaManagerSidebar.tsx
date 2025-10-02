import { logout } from "@/lib/auth";
import Link from "next/link";
import React from "react";

function SocialMediaManagerSidebar() {
  return (
    <aside className="w-64 bg-gray-50 min-h-screen p-4 border-r">
      <div className="mb-6">
        <h2 className="font-bold text-lg">Normal User</h2>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard/socialMediaManager">Overview</Link>
        <Link href="/dashboard/socialMediaManager">Projects</Link>
        <Link href="/dashboard/socialMediaManager">Tools</Link>
      </nav>

      <div className="mt-auto pt-6">
        <button onClick={logout} className="text-sm text-red-600">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default SocialMediaManagerSidebar;
