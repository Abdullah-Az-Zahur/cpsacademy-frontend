"use client";
import Link from "next/link";
import React from "react";

export type MenuItem = {
  id: string;
  label: string;
};

type Props = {
  title?: string;
  menu: MenuItem[];
  activeId: string;
  onSelect: (id: string) => void;
  // optional slot for footer (logout button, etc.)
  footer?: React.ReactNode;
};

export default function GenericSidebar({
  title,
  menu,
  activeId,
  onSelect,
  footer,
}: Props) {
  return (
    <aside className="w-64 bg-gray-50 min-h-screen p-4 flex flex-col border-r">
      <div className="mb-6">
        <h2 className="font-bold text-lg">{title ?? "Dashboard"}</h2>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href={'/'} className="text-left p-2 rounded transition-colors hover:bg-gray-100">Home</Link>
        {menu.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`text-left p-2 rounded transition-colors ${
              activeId === m.id
                ? "bg-blue-100 font-medium"
                : "hover:bg-gray-100"
            }`}
            aria-current={activeId === m.id ? "page" : undefined}
          >
            {m.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6">{footer}</div>
    </aside>
  );
}
