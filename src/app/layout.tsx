"use client";

import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ProfileDashboard } from "@/components/ProfileDashboard";
import { NotificationSystem } from "@/components/NotificationSystem";
import { useState, useEffect } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = () => setIsNotificationsOpen(true);
      window.addEventListener('open-notifications', handler);
      return () => window.removeEventListener('open-notifications', handler);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} antialiased bg-background text-foreground`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <Sidebar onProfileClick={() => setIsProfileOpen(true)} />
            <Navbar />
            <main className="min-h-screen pt-24 px-6 overflow-x-hidden">
              {children}
            </main>
            <ProfileDashboard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <NotificationSystem isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
