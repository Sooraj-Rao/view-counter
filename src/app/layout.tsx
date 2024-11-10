import Header from "@/components/header";
import "./globals.css";

import Footer from "@/components/footer";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "View Counter",
  description: "A customizable view counter for your profiles and pages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Header />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
