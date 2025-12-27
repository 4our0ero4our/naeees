"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MegaMenu from "./MegaMenu";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  // --- ICONS (Same as before) ---
  const BookIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  );
  const DocumentIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  );
  const ChartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  );
  const ChatIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
  );
  const LibraryIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  );
  const CalendarIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  );
  const ToolIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  );
  const MicrophoneIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
  );
  const BriefcaseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  );
  const GraduationIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
  );
  const TrophyIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
  );
  const MegaphoneIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
  );
  const StarIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
  );
  const ForumIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
  );
  const QuestionIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  );
  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  );
  const SpotlightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
  );
  const InfoIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  );
  const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  );
  const TargetIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  );
  const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  );
  const PenIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
  );

  const menuItems = [
    {
      id: "academics",
      label: "Academics",
      description: "Access structured academic resources and track your progress throughout your engineering journey.",
      submenu: [
        { label: "Lecture Notes", href: "#", icon: <BookIcon /> },
        { label: "Past Questions", href: "#", icon: <DocumentIcon /> },
        { label: "CGPA Tracker", href: "#", icon: <ChartIcon /> },
        { label: "Academic Discussions", href: "#", icon: <ChatIcon /> },
        { label: "Learning Resources", href: "#", icon: <LibraryIcon /> },
      ],
      columns: 2,
    },
    {
      id: "events",
      label: "Events",
      description: "Participate in technical trainings, workshops, and professional development events.",
      submenu: [
        { label: "Upcoming Events", href: "#", icon: <CalendarIcon /> },
        { label: "Workshops & Trainings", href: "#", icon: <ToolIcon /> },
        { label: "Conferences", href: "#", icon: <MicrophoneIcon /> },
        { label: "Event Calendar", href: "#", icon: <CalendarIcon /> },
        { label: "Register for Events", href: "#", icon: <PenIcon /> },
      ],
      columns: 2,
    },
    {
      id: "opportunities",
      label: "Opportunities",
      description: "Discover career-building opportunities curated for EEE students.",
      submenu: [
        { label: "Internships", href: "#", icon: <BriefcaseIcon /> },
        { label: "Scholarships", href: "#", icon: <GraduationIcon /> },
        { label: "Competitions", href: "#", icon: <TrophyIcon /> },
        { label: "Announcements", href: "#", icon: <MegaphoneIcon /> },
        { label: "Weekly Highlights", href: "#", icon: <StarIcon /> },
      ],
      columns: 2,
    },
    {
      id: "community",
      label: "Community",
      description: "Connect, discuss, and grow with fellow engineering students.",
      submenu: [
        { label: "Discussion Forum", href: "#", icon: <ForumIcon /> },
        { label: "Peer Q&A", href: "#", icon: <QuestionIcon /> },
        { label: "Face of the Week", href: "#", icon: <UserIcon /> },
        { label: "Student Spotlights", href: "#", icon: <SpotlightIcon /> },
      ],
      columns: 2,
    },
    {
      id: "about",
      label: "About",
      description: "Learn more about our association and mission.",
      submenu: [
        { label: "About the Association", href: "#", icon: <InfoIcon /> },
        { label: "Executives", href: "#", icon: <UsersIcon /> },
        { label: "Mission & Vision", href: "#", icon: <TargetIcon /> },
        { label: "Contact", href: "#", icon: <MailIcon /> },
      ],
      columns: 2,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleMouseEnter = (menuId: string) => setActiveMenu(menuId);
  const handleMouseLeave = () => setActiveMenu(null);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${lastScrollY > 10 ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">

          {/* Logo Section */}
          <div className="flex items-center space-x-3 w-1/4 animate-slide-in-left" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Images/NAEEES Logo.jpg"
                  alt="NAEEES Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-heading font-black text-xl lg:text-2xl text-black tracking-tight">
                NAEEES
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-8 flex-1">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, opacity: 0 }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`px-3 py-2 text-base font-medium transition-all duration-300 relative group text-gray-600 hover:text-black ${activeMenu === item.id ? "text-black" : ""
                    }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black transition-all duration-300 ${activeMenu === item.id ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                  />
                </button>
                {activeMenu === item.id && (
                  <MegaMenu menu={item} />
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end space-x-6 w-1/4">
            <Link
              href="#"
              className="hidden sm:block text-black hover:text-gray-600 transition-colors duration-300 text-sm font-medium animate-scale-in"
              style={{ animationDelay: "0.7s", opacity: 0 }}
            >
              Sign Up
            </Link>
            <Link
              href="#"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-scale-in"
              style={{ animationDelay: "0.8s", opacity: 0 }}
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden text-black p-2 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fully Redesigned */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-black min-h-screen animate-slide-in-from-right pb-32 overflow-y-auto">
          <div className="px-4 py-8 space-y-6">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                <MobileMenuItem item={item} onLinkClick={() => setIsMobileMenuOpen(false)} />
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-4 pt-8 border-t-2 border-dashed border-gray-200 mt-8">
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-black py-3 text-lg font-bold hover:bg-gray-50 rounded-xl transition-colors animate-fade-in-up border-2 border-transparent hover:border-black"
                style={{ animationDelay: `${menuItems.length * 0.1}s`, opacity: 0 }}
              >
                Sign Up
              </Link>
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-[#22C55E] text-black py-3 text-lg font-black uppercase tracking-wide rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all animate-fade-in-up"
                style={{ animationDelay: `${menuItems.length * 0.1 + 0.1}s`, opacity: 0 }}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- REDESIGNED MOBILE MENU ITEM ---
const MobileMenuItem = ({ item, onLinkClick }: { item: any; onLinkClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "" : ""}`}>
      {/* Menu Header (Clickable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${isOpen
            ? "bg-[#22C55E] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "bg-white border-transparent hover:bg-gray-50"
          }`}
      >
        <span className={`text-lg font-black uppercase tracking-tight ${isOpen ? "text-black" : "text-gray-800"}`}>
          {item.label}
        </span>
        <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center transition-transform duration-300 ${isOpen ? "bg-white rotate-180" : "bg-white"}`}>
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Submenu Dropdown */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="border-l-2 border-black ml-6 pl-6 py-2 space-y-4">
            {item.submenu.map((subItem: any, index: number) => (
              <Link
                key={index}
                href={subItem.href}
                onClick={onLinkClick}
                className="group flex items-center gap-3 py-2"
              >
                <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center shrink-0 group-hover:bg-[#EAB308] transition-colors">
                  <div className="w-4 h-4 text-black">
                    {subItem.icon}
                  </div>
                </div>
                <span className="text-black font-bold text-base group-hover:translate-x-1 transition-transform">
                  {subItem.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;