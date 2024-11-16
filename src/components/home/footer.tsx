/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [link, setlink] = useState("");
  const bgColor = theme === "dark" ? "rgb(12, 10, 9)" : "white";
  const textColor = "rgb(249, 128, 44)";
  useEffect(
    () =>
      setlink(
        `https://viewcount.soorajrao.in/api//sooraj-view-counter?text=Site+Views&colorStyle=5&iconSize=23&bgColor=${bgColor}&textColor=${textColor}&iconColor=${textColor}&viewsBgColor=${bgColor}&viewsColor=${textColor}&gradientStart=${textColor}&gradientEnd=${bgColor}&borderColor=${bgColor}`
      ),
    [theme]
  );

  return (
    <footer className="container mx-auto px-6  duration-500 pb-2">
      <div className="flex lg:px-20 px-4 py-4 sm:py-0  border-t sm:border-none text-xs sm:text-sm  flex-col-reverse sm:flex-row gap-y-3 justify-between items-center">
        <p>&copy; 2024 ViewCounter</p>
        <img
          className=" hover:scale-[.92] duration-200 scale-90"
          src={link}
          alt="view count"
        />
        <Link
          target="_blank"
          href="https://soorajrao.in?ref=ViewCount"
          className="group "
        >
          <p className="  group-hover:scale-105 duration-200 flex items-center gap-x-2 ">
            Developed by
            <span className=" text-primary font-medium">Sooraj</span>
            <ArrowLeft className="h-4 w-4 text-foreground/50 invisible group-hover:visible rotate-[135deg]" />
          </p>
        </Link>
      </div>
    </footer>
  );
}
