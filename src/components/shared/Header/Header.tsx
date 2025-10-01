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


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div>
      <header className="w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex container items-center justify-between px-4 py-3 md:py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            🚀 Logo
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
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
          </div>

          {/* Mobile Toggle */}
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
                  ),
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
