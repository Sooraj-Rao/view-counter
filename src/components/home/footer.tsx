/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

export default function Footer() {
  const link =
    "http://localhost:3000/api/sooraj-view-counter?text=Site+Views&colorStyle=5&iconSize=23&bgColor=white&textColor=rgb%28249%2C+128%2C+44%29&iconColor=rgb%28249%2C+128%2C+44%29&viewsBgColor=white&viewsColor=rgb%28249%2C+128%2C+44%29&gradientStart=white&gradientEnd=white&borderColor=white";
  return (
    <footer>
      <div className="container mx-auto px-6 ">
        <div className="flex sm:px-40 px-4 py-4 sm:py-0 border-t sm:border-none text-xs sm:text-sm  flex-col-reverse sm:flex-row gap-y-3 justify-between items-center">
          <p>&copy; 2024 ViewCounter. All rights reserved.</p>
          <img
            className=" hover:scale-[.92] duration-100 scale-90"
            src={link}
            alt="view count"
          />
          <p>
            Developed by{" "}
            <Link
              target="_blank"
              href="https://soorajrao.in"
              className="underlines text-primary font-semibold"
            >
              Sooraj
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
