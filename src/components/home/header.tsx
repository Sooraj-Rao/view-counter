"use client";
import Link from "next/link";
import { Eye, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { siteData } from "@/lib/siteData";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme/theme-toggle";

export default function Header() {
  const path = usePathname();
  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Documentation", href: "/docs" },
    { name: "Create", href: "/create" },
  ];

  return (
    <header className="shadow-md sticky top-0 z-[999] bg-background/95 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center text-sm">
          <Link href="/" className="flex items-center space-x-2">
            <Eye className="w-8 h-8 " />
            <span className="text-xl font-bold ">ViewCounter</span>
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
            >
              Report Bug
            </Link>
            <ModeToggle />
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  path: string;
}

function NavLink({ href, children, path }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`hover:text-primary transition-colors duration-200
      ${path == href && " text-primary bg-secondary px-3 py-2 rounded"}
      `}
    >
      {children}
    </Link>
  );
}
