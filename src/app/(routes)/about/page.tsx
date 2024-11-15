"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMdMail, IoMdChatboxes } from "react-icons/io";
import { PiCursorClickFill } from "react-icons/pi";
import Link from "next/link";
import { siteData } from "@/lib/siteData";

import { FaLinkedin } from "react-icons/fa6";

const socialData = [
  {
    title: "Email",
    link: siteData.email,
    icon: <IoMdMail className="h-5 w-5" />,
  },
  {
    title: "LinkedIn",
    link: siteData.linkedin,
    icon: <FaLinkedin className="h-5 w-5" />,
  },
  {
    title: "Portfolio",
    link: siteData.portfolio,
    icon: <PiCursorClickFill className="rotate-90 h-5 w-5" />,
  },
];

function AppName() {
  return (
    <span className="mx-[2px] text-primary font-semibold">
      {siteData.siteName}
    </span>
  );
}

function AnimatedButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Button
        variant="outline"
        className="w-fit hover:gap-2 flex items-center group gap-0 p-2.5"
      >
        <span className="w-0 overflow-hidden group-hover:w-20 duration-500">
          {children}
        </span>
        {icon}
      </Button>
    </Link>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl text-zinc-900 dark:text-gray-200 flex flex-col p-4 ">
      <section className="flex-grow">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="scroll-m-20 text-lg font-semibold tracking-tight">
            About Us
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <p className="text-xs sm:text-base">
            <AppName /> is an innovative solution designed to help users track,
            analyze, and display engagement metrics seamlessly. Whether
            you&aps;re a professional, creator, or business owner, our platform
            offers tools to showcase your digital presence with style and
            precision.
          </p>
          <p className="text-xs sm:text-base">
            Optimize your user engagement strategies with our simple,
            customizable, and insightful analytics tools, accessible directly
            from your dashboard.
          </p>
          <div>
            <h3 className="font-semibold mb-2 text-xs sm:text-base">
              Key Features:
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-base">
              <div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Easy to Implement</li>
                  <li>Real-time analytics</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Highly Customizable Design</li>
                  <li>Intuitive user interface</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </section>

      <section>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start justify-between gap-4 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-xs sm:text-base">
                Have questions or feedback? We&apos;re here to help!
              </p>
              <AnimatedButton
                href={`${siteData.contact}viewcounter_about`}
                icon={<IoMdChatboxes className="h-5 w-5" />}
              >
                Message us
              </AnimatedButton>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <h3 className="font-semibold sm:font-normal text-base">
                Connect with us
              </h3>
              <div className="flex gap-2 sm:gap-4">
                {socialData.map((item) => (
                  <AnimatedButton
                    key={item.title}
                    href={item.link}
                    icon={item.icon}
                  >
                    {item.title}
                  </AnimatedButton>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </section>
    </div>
  );
}
