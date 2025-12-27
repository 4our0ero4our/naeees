"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const AcademicPreviewSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- Header Content --- */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-block bg-[#EAB308] border-2 border-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_black] transform -rotate-1 mb-6">
                    Digital Campus
                </div>
                <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.1] mb-6">
                    A Complete Digital<br className="hidden sm:block" /> Academic Environment
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto">
                    Designed to function like a digital school campus, the NAEEES Digital Portal centralizes learning, collaboration, and professional growth for engineering students.
                </p>
            </motion.div>
        </div>

        {/* --- Visual Preview Frame --- */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative w-full max-w-6xl mx-auto"
        >
            {/* Floating Decor: Yellow Orb (Top Left) */}
            <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-4 lg:-top-12 lg:-left-12 w-16 h-16 lg:w-24 lg:h-24 bg-[#EAB308] rounded-full border-3 border-black shadow-[4px_4px_0px_0px_black] z-20 hidden sm:block"
            />

            {/* Floating Decor: Rocket Badge (Bottom Right) */}
            <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 lg:-bottom-10 lg:-right-10 w-20 h-20 lg:w-32 lg:h-32 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_black] z-20 hidden sm:flex"
            >
                <span className="text-3xl lg:text-5xl">🚀</span>
            </motion.div>

            {/* The Main Image Container */}
            <div className="relative rounded-[2rem] border-[4px] border-black bg-black p-2 sm:p-3 shadow-[8px_8px_0px_0px_#22C55E] sm:shadow-[16px_16px_0px_0px_#22C55E] transition-all duration-500 hover:shadow-[12px_12px_0px_0px_#22C55E] hover:translate-x-[2px] hover:translate-y-[2px]">
                {/* Inner Image Wrapper */}
                <div className="relative rounded-[1.5rem] overflow-hidden aspect-[16/9] w-full bg-gray-100">
                    <Image
                        src="/Images/Academic Digital Campus Preview.jpg"
                        alt="NAEEES Digital Portal Interface Preview"
                        fill
                        className="object-cover"
                        priority={false}
                    />
                    
                    {/* Optional: Glossy Overlay effect for screen look */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                </div>
            </div>

        </motion.div>

      </div>
    </section>
  );
};

export default AcademicPreviewSection;