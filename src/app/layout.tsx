import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "ViewCounter | Customizable View Tracker",
  description:
    "Track views for your profiles and pages with ViewCounter. A highly customizable, easy-to-use tool to keep your audience engagement in check.",
  keywords: [
    "view counter",
    "customizable view tracker",
    "profile analytics",
    "engagement tracker",
    "page views tool",
  ],
  authors: [{ name: "Sooraj Rao" }],
  creator: "Sooraj Rao",
  publisher: "Sooraj Rao",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viewcount.soorajrao.in/",
    siteName: "ViewCounter",
    title: "ViewCounter | Customizable View Tracker",
    description:
      "Track views for your profiles and pages with ViewCounter. A highly customizable, easy-to-use tool to keep your audience engagement in check.",
    images: [
      {
        url: "https://viewcount.soorajrao.in/home.webp",
        width: 1200,
        height: 630,
        alt: "ViewCounter Application Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ViewCounter | Customizable View Tracker",
    description:
      "Track views for your profiles and pages with ViewCounter. A highly customizable, easy-to-use tool to keep your audience engagement in check.",
    images: ["https://viewcount.soorajrao.in/home.webp"],
    creator: "@SoorajRaoo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ViewCounter",
              url: "https://viewcount.soorajrao.in/",
              description:
                "Track views for your profiles and pages with ViewCounter. A highly customizable, easy-to-use tool to keep your audience engagement in check.",
            }),
          }}
        />
      </head>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="sm:min-h-[calc(100vh-8rem)] min-h-[calc(100vh-12rem)] overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
