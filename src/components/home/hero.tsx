import Link from "next/link";
import { ArrowRight, Sparkles, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <main className="mx-auto px-4 py-14  sm:pt-24 sm:pb-1">
        <div className="text-center space-y-8">
          <h1 className="text-2xl sm:text-6xl font-extrabold tracking-tight text-foreground/80 leading-tight">
            Capture Every View,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-primary to-primary/60">
              Instantly and Seamlessly
            </span>
          </h1>
          <p className="sm:text-xl text-sm text-muted-foreground max-w-2xl mx-auto">
            Real-time analytics, full customization, no-code setup, and seamless
            integration that works anywhere, anytime!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create">
              <Button className="group sm:scale-100 scale-90">
                Create Your ViewCounter
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" className="group sm:scale-100 scale-90">
                View Docs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Sparkles className="h-5 w-5 text-primary" />}
            title="Instant Setup"
            description="Get started in seconds with our no-code solution. Just copy and paste!"
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5 text-primary" />}
            title="Highly Customizable"
            description="Effortlessly adjust styles with live previews, instantly seeing your changes.."
          />
          <FeatureCard
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            title="Comprehensive Documentation"
            description="Easily understand and implement with our clear, step-by-step guides."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center space-x-3 mb-3">
        <div className="bg-muted rounded-full p-2">{icon}</div>
        <h3 className="sm:text-lg text-base font-semibold text-card-foreground">
          {title}
        </h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
