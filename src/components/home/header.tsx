"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { siteData } from "@/lib/siteData";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme/theme-toggle";
import { IoEyeSharp } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Documentation", href: "/docs" },
    { name: "Create", href: "/create" },
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="shadow-md sticky top-0 z-[999] bg-background/95 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between  items-center text-sm">
          <Link
            href="/"
            className="flex items-center space-x-2
         
          "
          >
            <IoEyeSharp className="w-8 h-8 text-primary sm:scale-100 scale-75" />
            <span className="text-lg sm:text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-t from-primary to-primary/60 ">
              ViewCounter
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-x-5 space-x-4">
            {nav.map((item) => (
              <NavLink key={item.name} href={item.href} path={path}>
                {item.name}
              </NavLink>
            ))}
            <Link
              target="_blank"
              href={`${siteData.report}${siteData.siteName}-header`}
              className="hover:text-primary transition-colors duration-200"
            >
              Report Bug
            </Link>
            <ModeToggle />
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <Button variant="ghost" size="icon" onClick={closeSheet}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {nav.map((item) => (
                    <NavLink
                      key={item.name}
                      href={item.href}
                      path={path}
                      onClick={closeSheet}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <Link
                    target="_blank"
                    href={`${siteData.report}${siteData.siteName}-header`}
                    className="hover:text-primary transition-colors duration-200"
                    onClick={closeSheet}
                  >
                    Report Bug
                  </Link>
                </nav>
                <div className="mt-auto">
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  path: string;
  onClick?: () => void;
}

function NavLink({ href, children, path, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`hover:text-primary transition-colors duration-200
      ${path === href ? "text-primary bg-secondary/70 px-3 py-2 rounded" : ""}
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
