"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    contextText: string;
}

const AuthLayout = ({ children, title, subtitle, contextText }: AuthLayoutProps) => {
    return (
        // PARENT: Full viewport height, no window scrollbar on desktop
        <div className="fixed inset-0 h-screen w-full flex flex-col lg:flex-row bg-[#F8F9FA] overflow-hidden">

            {/* --- LEFT PANEL: FIXED SIDEBAR --- */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex lg:w-5/12 h-full bg-black relative flex-col justify-between pt-12 pl-24 border-r-4 border-black z-20"
            >
                {/* --- BACKGROUND IMAGE --- */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Images/Access Academic Resources.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    {/* Dark Gradient Overlay for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 mix-blend-multiply" />
                </div>

                {/* --- TOP: MAIN BRANDING (Center of Attention) --- */}
                <div className="relative z-10 mt-10 mr-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-[#EAB308] border-3 border-white rounded-full flex items-center justify-center shadow-[0px_0px_20px_rgba(234,179,8,0.4)] mb-6">
                            <FaGraduationCap className="text-3xl text-black" />
                        </div>

                        <h1 className="text-white font-heading font-black text-6xl leading-[1.1] tracking-tight drop-shadow-2xl">
                            NAEEES<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ade80]">
                                Digital Portal
                            </span>
                        </h1>

                        {/* Tiny separator line */}
                        <div className="h-1 w-20 bg-[#EAB308] mt-6 mb-4"></div>

                        <p className="text-gray-300 font-medium text-sm max-w-sm leading-relaxed opacity-80">
                            The official digital academic platform for Electrical & Electronics Engineering students.
                        </p>
                    </motion.div>
                </div>

                {/* --- BOTTOM: CONTEXT & FOOTER (Small & Strategic) --- */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-6"
                    >
                        {/* Quote Box - Much Smaller Now */}
                        <div className="relative pl-6 border-l-2 border-white/20">
                            <p className="text-sm text-gray-200 font-serif italic leading-relaxed opacity-90">
                                "{contextText}"
                            </p>
                        </div>

                        {/* Footer Text - Very Small */}
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                            © {new Date().getFullYear()} NAEEES • Secure Student Access
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* --- RIGHT PANEL: SCROLLABLE FORM AREA --- */}
            <motion.div
                className="w-full lg:w-7/12 h-full flex flex-col items-center overflow-y-auto p-6 lg:p-12 relative bg-white lg:bg-[#F8F9FA]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="w-full max-w-xl my-auto">
                    {/* Page Title Area */}
                    <div className="mb-10 text-center lg:text-left">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="font-heading font-black text-4xl lg:text-5xl text-black mb-3"
                        >
                            {title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 font-medium"
                        >
                            {subtitle}
                        </motion.p>
                    </div>

                    {/* Form Slot */}
                    {children}

                    {/* Spacer for bottom scrolling */}
                    <div className="h-10"></div>
                </div>
            </motion.div>

        </div>
    );
};

export default AuthLayout;