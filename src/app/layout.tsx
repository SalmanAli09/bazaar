import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ChatDrawer } from "@/components/chat/ChatDrawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bazaar - Pakistan's Thrift Marketplace",
  description: "Buy and sell second-hand items across Pakistan. Fast, simple, trustworthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <BottomNav />
        <ChatDrawer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
