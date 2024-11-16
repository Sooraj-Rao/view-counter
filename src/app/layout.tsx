import "./globals.css";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata = {
  title: "ViewCounter",
  description: "Highly customizable view counter for your profiles and pages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="sm:min-h-[calc(100vh-7rem)] min-h-[calc(100vh-12rem)] overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
