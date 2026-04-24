import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "UI Zera Club | UiPath RPA Student Community",
  description: "UI Zera Club is the UiPath student RPA community at PSNA College of Engineering and Technology.",
  metadataBase: new URL("https://uizeraclub.example"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geist.variable, dmSans.variable, geistMono.variable, "bg-white text-gray-900 antialiased") }>
        <ScrollProgress />
        <AnnouncementBar />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
