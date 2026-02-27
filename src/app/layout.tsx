"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ProfileDashboard } from "@/components/ProfileDashboard";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg - background text - foreground`}>
        <Sidebar onProfileClick={() => setIsProfileOpen(true)} />
        <Navbar />
        <main className="min-h-screen pt-24 px-6">
          {children}
        </main>
        <ProfileDashboard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </body>
    </html>
  );
}
