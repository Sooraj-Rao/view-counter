"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMdChatboxes } from "react-icons/io";
import { siteData } from "@/lib/siteData";

function AppName() {
  return (
    <span className="mx-[2px] text-primary font-semibold">
      {siteData.siteName}
    </span>
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
        <CardContent className="space-y-4 sm:space-y-6 text-muted-foreground">
          <p className="text-xs sm:text-base">
            <AppName /> is a simple tool that helps you see how many people are
            checking out your content. Whether you&apos;re a creator, a pro, or
            running a business, it helps you show and track your online activity
            in a clean and easy way.
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
            <div className="grid  gap-2 text-xs sm:text-base">
              <div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Easy to set up</li>
                  <li>Realtime Customizable Design</li>
                  <li>Simple Documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </section>

      <section>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start justify-between gap-4 sm:gap-8 text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <p className="text-xs sm:text-base">
                  Have questions or feedback?
                </p>
              </div>
              <div>
                <a
                  target="_blank"
                  href={`${siteData.contact}viewcounter_about`}
                >
                  <Button variant="outline" className=" pt-1">
                    <IoMdChatboxes className="h-5 w-5" />
                    Message 
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </section>
    </div>
  );
}
