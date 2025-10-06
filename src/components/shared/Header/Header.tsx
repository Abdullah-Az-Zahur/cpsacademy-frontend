"use client";
import Link from "next/link";
import React, { useState } from "react";

import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/types/nav";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import { logout, useAuth } from "@/lib/auth";
import logo from "../../../../public/images/logo/logo.png";
import login from "../../../../public/images/logo/login.png";
import Image from "next/image";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      children: [
        { label: "Web Development", href: "#" },
        { label: "App Development", href: "#" },
        { label: "UI/UX Design", href: "#" },
      ],
    },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <div>
      <header className="w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex container items-center justify-between px-4 py-3 md:py-4">
          <Link href="/" className="flex text-xl font-bold gap-2">
            <Image src={logo} alt="logo" width={30} height={30} /> CPS Academy
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger>
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 w-52">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <NavigationMenuLink asChild>
                                  <NavLink href={child.href}>
                                    {child.label}
                                  </NavLink>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <NavLink href={item.href!}> {item.label} </NavLink>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {user && (
              <Link href="/dashboard" className="px-3 py-1">
                Dashboard
              </Link>
            )}

            {user ? (
              <Button variant="destructive" size="sm" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Image src={login} alt="login" width={30} height={30} />
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t bg-white shadow-lg"
            >
              <ul className="flex flex-col p-4 space-y-2">
                {navItems.map((item) =>
                  item.children ? (
                    <MobileDropdown
                      key={item.label}
                      item={item}
                      closeMenu={() => setMobileOpen(false)}
                    />
                  ) : (
                    <li key={item.label}>
                      <NavLink
                        href={item.href!}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )
                )}

                {user && (
                  <li>
                    <NavLink
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

                {user ? (
                  <li>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Image src={login} alt="login" width={30} height={30} />
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Header;

function MobileDropdown({
  item,
  closeMenu,
}: {
  item: NavItem;
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100"
        onClick={() => setOpen((prev) => !prev)}
      >
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 flex flex-col border-l pl-2"
          >
            {item.children?.map((child) => (
              <li key={child.label}>
                <NavLink href={child.href} onClick={closeMenu}>
                  {child.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
