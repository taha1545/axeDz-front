import type { Metadata } from "next";

import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axedz.com"),
  title: {
    default: "AxeDz",
    template: "%s | AxeDz",
  },
  description:
    "AxeDz is Algeria's Cloud Communication Platform (CPaaS) for developers and businesses. Send SMS, emails, manage cloud services, and monitor wallet usage through one unified API.",
  keywords: [
    "CPaaS",
    "SMS API",
    "Email API",
    "Algeria",
    "Cloud Communication",
    "Developer Platform",
    "AxeDz",
    "Node SDK",
    "Python SDK",
  ],
  authors: [{ name: "AxeDz" }],
  creator: "AxeDz",
  publisher: "AxeDz",
  openGraph: {
    title: "AxeDz",
    description:
      "Algeria's Communication Platform for Developers. SMS, Email, Wallet & Cloud APIs.",
    url: "https://axedz.com",
    siteName: "AxeDz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "AxeDz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AxeDz",
    description:
      "Unified SMS, Email, Wallet and Cloud APIs for Algerian developers.",
    images: ["/icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.ico",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
