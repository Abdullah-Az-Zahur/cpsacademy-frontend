"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-2 hover:bg-gray-100 transition-colors",
        pathname === href && "font-semibold text-primary"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
