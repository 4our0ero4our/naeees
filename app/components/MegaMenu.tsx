"use client";

import Link from "next/link";
import React from "react";

interface SubmenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface Menu {
  id: string;
  label: string;
  description: string;
  submenu: SubmenuItem[];
  columns: number;
}

interface MegaMenuProps {
  menu: Menu;
}

const MegaMenu = ({ menu }: MegaMenuProps) => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[600px] z-50 cursor-default">
      {/* Decorative Arrow (Pop Art Style) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-black rotate-45 border-l-2 border-t-2 border-black z-0"></div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-l-2 border-t-2 border-black z-10"></div>

      {/* Main Container */}
      <div className="relative z-20 bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden animate-fade-in-up">
        
        {/* Header Section (Green Background) */}
        <div className="bg-[#22C55E] p-5 border-b-2 border-black">
          <h3 className="font-black text-xl text-black uppercase tracking-tight">
            {menu.label}
          </h3>
          {menu.description && (
            <p className="text-black/80 text-sm font-medium mt-1 leading-snug max-w-sm">
              {menu.description}
            </p>
          )}
        </div>

        {/* Links Grid */}
        <div 
            className={`p-6 grid gap-x-8 gap-y-6 ${
                menu.columns === 2 ? "grid-cols-2" : "grid-cols-1"
            }`}
        >
          {menu.submenu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group flex items-start gap-4 p-2 -ml-2 rounded-xl transition-all duration-300 hover:bg-gray-50"
            >
              {/* Icon Box */}
              <div className="shrink-0 w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none group-hover:bg-[#EAB308]">
                <div className="w-5 h-5 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <div className="font-bold text-black text-sm group-hover:translate-x-1 transition-transform duration-300">
                  {item.label}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5 group-hover:text-black transition-colors">
                  Explore {item.label.toLowerCase()}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Decorative Strip */}
        <div className="h-2 w-full flex">
            <div className="h-full w-1/3 bg-black"></div>
            <div className="h-full w-1/3 bg-[#EAB308]"></div>
            <div className="h-full w-1/3 bg-[#22C55E]"></div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;