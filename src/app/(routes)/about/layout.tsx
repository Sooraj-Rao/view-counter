import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - ViewCounter",
  description:
    "Discover more about ViewCounter, the app designed to track and analyze your website's traffic and view counts. We're committed to providing accurate, real-time insights to help you optimize your content's performance.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
