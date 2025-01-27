"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { LayoutDashboard, BookOpen, User } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['latin'] });

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    value: "dashboard",
    href: "/",
  },
  {
    icon: BookOpen,
    label: "Exams",
    value: "exams",
    href: "/exams",
  },
  {
    icon: User,
    label: "Account",
    value: "account",
    href: "/account",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const pathname = usePathname();
  const isAuthPage = pathname?.includes("/login") || pathname?.includes("/signup");

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-[#FFFFFF]">
          {!isAuthPage && (
            <Sidebar items={sidebarItems} activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          <main className={`flex-1 ${!isAuthPage ? 'p-8' : ''} overflow-auto`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}