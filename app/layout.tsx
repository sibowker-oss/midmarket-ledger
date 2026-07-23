import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "AI Ledger Snapshot — Acme Corporation Demo | Hepburn Advisory",
  description: "The AI Ledger Snapshot: What is your AI actually returning? A two-week independent read for companies up to ~1,000 people.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
