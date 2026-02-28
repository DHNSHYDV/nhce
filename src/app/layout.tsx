"use client";

import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ProfileDashboard } from "@/components/ProfileDashboard";
import { NotificationSystem } from "@/components/NotificationSystem";
import { AuthModal } from "@/components/AuthModal";
import { DottedSurface } from "@/components/ui/dotted-surface";
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const openNotificationsHandler = () => setIsNotificationsOpen(true);
      const openAuthHandler = () => setIsAuthModalOpen(true);

      window.addEventListener('open-notifications', openNotificationsHandler);
      window.addEventListener('open-auth', openAuthHandler);

      return () => {
        window.removeEventListener('open-notifications', openNotificationsHandler);
        window.removeEventListener('open-auth', openAuthHandler);
      };
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} antialiased bg-background text-foreground selection:bg-white selection:text-black`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {/* Global Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <DottedSurface />
            </div>

            {/* Global Navigation Layer */}
            <Sidebar onProfileClick={() => setIsProfileOpen(true)} />
            <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />

            {/* Main Content Layer */}
            <main className="relative z-10 min-h-screen pt-20 md:pt-24 px-4 md:px-6 overflow-x-hidden">
              {children}
            </main>

            {/* Global Overlay Layer */}
            <ProfileDashboard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <NotificationSystem isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
