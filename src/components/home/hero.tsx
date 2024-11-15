import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div
      className={`flex flex-col bg-gradient-to-tr  from-primary/0 to-primary/20
      min-h-[calc(100vh-7rem)]
      `}
    >
      <main className="flex-grow">
        <section className=" ">
          <div className="container mx-auto px-6 py-28  flex flex-col items-center text-center">
            <h1 className="sm:text-6xl text-sm tracking-tight fsont-extrabold mb-4">
              Capture Every View, Instantly and Seamlessly
            </h1>
            <p className="sm:text-xl text-xs tracking-tight mb-8 max-w-2xl">
              Real-time analytics, full customization, no-code setup, and
              seamless integration works anywhere, anytime!
            </p>
            <div className=" flex flex-col items-center gap-y-4">
              <Link href={"/create"}>
                <Button>
                  <p>Create Your ViewCounter</p>
                  <ArrowDownRight className=" transform -rotate-90" />
                </Button>
              </Link>
              <Link href={"/docs"}>
                <Button>
                  <p>Docs</p>
                  <ArrowDownRight className=" transform -rotate-90" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
