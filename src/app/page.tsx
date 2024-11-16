import Home from "@/components/home/hero";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<h1 className=" text-center mt-32">Loading...</h1>}>
      <Home />
    </Suspense>
  );
}
