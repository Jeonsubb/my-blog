import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "@/lib/site";

const bodyFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const displayFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  verification: {
    google: "wz1Mb9BrOq-QdwDSWiXjFfw2uQFeIddSuBkEEf9iYfE",
  },
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Script id="theme-script" strategy="beforeInteractive">
          {`try {
            const savedTheme = window.localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const theme = savedTheme === "dark" || savedTheme === "light"
              ? savedTheme
              : prefersDark
                ? "dark"
                : "light";
            document.documentElement.dataset.theme = theme;
          } catch (error) {
            document.documentElement.dataset.theme = "light";
          }`}
        </Script>
        <div className="relative min-h-screen">
          <Navbar />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
