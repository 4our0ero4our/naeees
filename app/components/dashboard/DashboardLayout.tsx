// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaSignOutAlt, FaBars, FaGraduationCap } from "react-icons/fa";
// import { getNavItemsByRole, UserRole } from "@/app/config/dashboard-nav";

// // TODO: Get the current user role from the database
// // MOCK ROLE ('student' | 'admin' | 'super_admin')
// const CURRENT_USER_ROLE: UserRole = "super_admin"; 

// const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
//   const pathname = usePathname();
//   const navItems = getNavItemsByRole(CURRENT_USER_ROLE);

//   return (
//     <>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={() => setIsOpen(false)}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//           />
//         )}
//       </AnimatePresence>

//       <motion.aside
//         className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-black border-r-4 border-black text-white flex flex-col transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         {/* Brand */}
//         <div className="p-8 border-b border-gray-800 flex items-center gap-3">
//            <div className="w-10 h-10 bg-[#EAB308] border-2 border-white rounded-full flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
//               <FaGraduationCap className="text-xl" />
//            </div>
//            <div className="flex flex-col">
//              <span className="font-heading font-black text-xl tracking-tight leading-none">
//                NAEEES<span className="text-[#22C55E]">.</span>
//              </span>
//              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
//                {CURRENT_USER_ROLE.replace('_', ' ')}
//              </span>
//            </div>
//         </div>

//         {/* Nav Links */}
//         <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
//                 <motion.div
//                   whileHover={{ x: 5 }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 border-2 ${
//                     isActive 
//                       ? "bg-[#EAB308] text-black border-black shadow-[4px_4px_0px_0px_white]" 
//                       : "bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-white/10"
//                   }`}
//                 >
//                   <span className="text-lg">{item.icon}</span>
//                   <span className="font-bold text-sm uppercase tracking-wide">{item.title}</span>
//                 </motion.div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* Logout */}
//         <div className="p-6 border-t border-gray-800">
//            <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-colors font-bold text-sm border border-transparent hover:border-red-900">
//               <FaSignOutAlt />
//               Log Out
//            </button>
//         </div>
//       </motion.aside>
//     </>
//   );
// };

// // ... Export DashboardLayout (same wrapper as previous) ...
// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col h-full overflow-hidden relative">
//         {/* Mobile Header Trigger */}
//         <header className="h-16 lg:hidden bg-white border-b-2 border-gray-200 flex items-center px-4 shrink-0">
//            <button onClick={() => setSidebarOpen(true)} className="p-2 text-black hover:bg-gray-100 rounded-lg">
//              <FaBars className="text-2xl" />
//            </button>
//            <span className="ml-4 font-black text-lg">MENU</span>
//         </header>
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
//            <div className="max-w-7xl mx-auto">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }