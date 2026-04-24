import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PitchSignal MENAP — Know Why Investors May Say No",
  description:
    "PitchSignal MENAP reviews your startup like a Pakistan/MENAP investor and gives you the objections, risks, and fixes before your fundraising conversation.",
  openGraph: {
    title: "PitchSignal MENAP — Know Why Investors May Say No",
    description:
      "AI-powered pitch review for Pakistan/MENAP founders. Get investor objections, risk analysis, and actionable fixes in 30 seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchSignal MENAP",
    description:
      "Know why investors may say no before you pitch. AI-powered review for Pakistan/MENAP founders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
