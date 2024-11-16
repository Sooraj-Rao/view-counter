import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create ViewCounter - ViewCounter",
  description:
    "Create a new ViewCounter to track and analyze the views on your website. Get real-time insights with ease and monitor your content's performance.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
