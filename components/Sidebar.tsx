"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarProps {
  items: {
    icon: LucideIcon;
    label: string;
    value: string;
    href: string;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ items, activeTab, setActiveTab }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`h-full bg-white border-r border-[#CCCCCC] p-4 transition-all duration-300 ${
        isHovered ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="w-8 h-8 relative flex-shrink-0">
          <Image
            src="/codesarge-logo.png"
            alt="CodeSarge"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <h1 
          className={`text-xl font-bold text-[#111111] whitespace-nowrap transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 w-0"
          }`}
        >
          CodeSarge
        </h1>
      </div>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.value}
              href={item.href}
              onClick={() => setActiveTab(item.value)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-[#F4703A] text-white"
                  : "text-[#555555] hover:bg-[#FFF4F0] hover:text-[#F4703A]"
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span 
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}