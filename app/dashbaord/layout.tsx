"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSignOutAlt,
  FaBars,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaTimes // Import Close Icon
} from "react-icons/fa";
import { getNavItemsByRole, UserRole } from "@/app/config/dashboard-nav";
import { signOut, useSession } from "next-auth/react";

// MOCK ROLE
const SidebarContent = ({
  isCollapsed,
  toggleCollapse,
  isMobile,
  closeMobile
}: {
  isCollapsed: boolean;
  toggleCollapse?: () => void;
  isMobile: boolean;
  closeMobile?: () => void;
}) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navItems = getNavItemsByRole((session as any)?.user?.role);

  // Notification State
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for unread notifications
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch("/api/notifications/unread");
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count || 0);
        }
      } catch (err) {
        console.error("Failed to fetch unread count", err);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); // 30s poll
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string) => {
    if (closeMobile) closeMobile();
  };

  return (
    <div className="flex flex-col h-full bg-black border-r-4 border-black text-white custom-scrollbar">

      {/* 1. BRAND HEADER */}
      <div className={`h-20 flex items-center ${isCollapsed ? "justify-center" : "justify-between px-6"} border-b border-gray-800 transition-all shrink-0`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EAB308] border-2 border-white rounded-full flex items-center justify-center text-black shadow-[0px_0px_10px_rgba(234,179,8,0.4)] shrink-0">
            <FaGraduationCap className="text-xl" />
          </div>

          {!isCollapsed && (
            <Link href="/">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col overflow-hidden whitespace-nowrap"
              >
                <span className="font-heading font-black text-xl tracking-tight leading-none">
                  NAEEES<span className="text-[#22C55E]">.</span>
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">
                  {(session as any)?.user?.role?.replace('_', ' ')}
                </span>
              </motion.div>
            </Link>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        {!isMobile && !isCollapsed && toggleCollapse && (
          <button onClick={toggleCollapse} className="p-1 hover:text-[#EAB308] transition-colors">
            <FaChevronLeft />
          </button>
        )}

        {/* --- MOBILE CLOSE BUTTON --- */}
        {isMobile && closeMobile && (
          <button
            onClick={closeMobile}
            className="p-2 text-white hover:text-red-500 transition-colors border-2 border-transparent hover:border-red-500 rounded-lg"
          >
            <FaTimes className="text-xl" />
          </button>
        )}
      </div>

      {/* 2. NAVIGATION LINKS */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          const badgeCount = item.href === "/dashbaord/notifications" ? unreadCount : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              title={isCollapsed ? item.title : ""}
              className="block px-3"
            >
              <div
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 border-2 whitespace-nowrap overflow-hidden relative ${isActive
                  ? "bg-[#EAB308] text-black border-black shadow-[4px_4px_0px_0px_white]"
                  : "bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-white/10"
                  } ${isCollapsed ? "justify-center" : ""}`}
              >
                <div className="relative shrink-0">
                  <span className="text-xl">{item.icon}</span>
                  {isCollapsed && badgeCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-black">
                      {badgeCount > 99 ? '99+' : badgeCount}
                    </span>
                  )}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <motion.span
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="font-bold text-sm uppercase tracking-wide"
                    >
                      {item.title}
                    </motion.span>

                    {badgeCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full ml-auto shadow-sm px-1">
                        {badgeCount > 99 ? '99+' : badgeCount}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. FOOTER ACTIONS */}
      <div className="p-4 border-t border-gray-800 shrink-0">
        {!isMobile && isCollapsed && toggleCollapse && (
          <button onClick={toggleCollapse} className="flex w-full items-center justify-center p-3 mb-4 rounded-lg bg-gray-900 hover:text-[#EAB308]">
            <FaChevronRight />
          </button>
        )}

        <button
          className={`flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-colors font-bold text-sm border border-transparent hover:border-red-900 ${isCollapsed ? "justify-center" : ""}`}
          title="Log Out"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <FaSignOutAlt className="text-lg shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Log Out</span>}
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { data: session } = useSession();


  // Dynamic Title and Subtitle Mapping
  const getPageInfo = (path: string) => {
    if (path.includes("/materials")) {
      return {
        title: "Academic Materials",
        subtitle: "Access lecture notes, past questions, and academic resources."
      };
    }
    if (path === "/dashbaord" || path === "/dashbaord/") {
      return {
        title: "Overview",
        subtitle: "Here's what's happening in the department today."
      };
    }
    if (path.includes("/admin/users")) {
      return {
        title: "User Management",
        subtitle: "Manage users, roles, and permissions."
      };
    }
    if (path.includes("/materials/upload")) {
      return {
        title: "Upload Material",
        subtitle: "Add new academic materials to the library."
      };
    }
    if (path.includes("/events")) {
      return {
        title: "Events & Activities",
        subtitle: "Register for upcoming events and download your tickets."
      };
    }
    if (path.includes("/announcements")) {
      return {
        title: "Announcements",
        subtitle: "Stay updated with the latest news and highlights."
      };
    }
    if (path.includes("/notifications")) {
      return {
        title: "Notifications",
        subtitle: "Stay updated with latest activities."
      };
    }
    // Default
    return {
      title: "Dashboard",
      subtitle: "Welcome to your dashboard."
    };
  };

  const pageInfo = getPageInfo(usePathname());

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    // ROOT CONTAINER
    <div className="relative h-screen w-full bg-[#F8F9FA] overflow-hidden">

      {/* --- DESKTOP SIDEBAR (Fixed, 100vh, doesn't scroll) --- */}
      <motion.aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen z-30"
        initial={false}
        animate={{ width: isCollapsed ? "5rem" : "18rem", height: "100vh" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ height: "100vh" }}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          isMobile={false}
        />
      </motion.aside>

      {/* --- MOBILE SIDEBAR (Fixed Overlay) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden h-screen"
              style={{ height: "100vh" }}
            >
              <SidebarContent
                isCollapsed={false}
                isMobile={true}
                closeMobile={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* --- MAIN CONTENT AREA --- */}
      {/* Margin-left on desktop to push content to the right, matching sidebar width */}
      <div
        className="h-screen relative transition-all duration-300"
        style={{
          marginLeft: isDesktop ? (isCollapsed ? '5rem' : '18rem') : '0',
          width: isDesktop
            ? `calc(100% - ${isCollapsed ? '5rem' : '18rem'})`
            : '100%'
        }}
      >

        {/* Fixed Header (doesn't scroll) */}
        <header
          className="fixed top-0 bg-white border-b-2 border-gray-200 z-20 transition-all duration-300"
          style={{
            left: isDesktop ? (isCollapsed ? '5rem' : '18rem') : '0',
            width: isDesktop
              ? `calc(100% - ${isCollapsed ? '5rem' : '18rem'})`
              : '100%'
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 flex-1">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-black hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-all shrink-0">
                <FaBars className="text-xl" />
              </button>
              <div className="flex-1">
                <h1 className="font-heading font-black text-xl sm:text-4xl lg:text-5xl text-black sm:mb-2 leading-tight">
                  {pageInfo.title}
                </h1>
                <p className="hidden sm:block text-base sm:text-lg lg:text-xl text-gray-600 font-medium">
                  {pageInfo.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-black">
                  {(session as any)?.user?.fullName || "User"}
                </p>
                <p className="text-xs text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-0.5">300L • EEE</p>
              </div>
              <div className="w-10 h-10 bg-black border-2 border-black rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full bg-linear-to-br from-[#22C55E] to-[#EAB308]"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        {/* Padding-top to prevent overlap with fixed header - adjusted for actual header height */}
        <main className="h-screen overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-[#F8F9FA] pt-[80px] sm:pt-[150px] lg:pt-[160px]">
          <div className="max-w-[1600px] mx-auto pb-20">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}