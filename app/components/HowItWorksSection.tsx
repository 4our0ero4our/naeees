"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Create Your Student Account",
    description: "Sign up using your school email and matric number to verify your identity and membership status.",
    // Position: Very low and left start
    top: "85%", 
    left: "8%",
    textPos: "below", 
  },
  {
    id: 2,
    title: "Access Your Digital Dashboard",
    description: "Instantly unlock personalized access to academic resources, CGPA tools, discussions, and events.",
    // Position: Sits lower in the middle "valley" of the curve
    top: "58%", 
    left: "50%",
    textPos: "above", 
  },
  {
    id: 3,
    title: "Learn, Track, and Connect",
    description: "Download materials, calculate results, register for events, and engage with fellow students.",
    // Position: High peak on the right
    top: "8%", 
    left: "88%",
    textPos: "below", 
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-150px" });

  return (
    <section
      ref={containerRef}
      // Top padding ensures Number 3 isn't cut off
      className="w-full bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* --- LEFT COLUMN: Header & CTA --- */}
          {/* Added 'h-full' and 'justify-center' to force vertical centering */}
          <div className="lg:col-span-4 flex flex-col justify-center items-start space-y-8 z-20 h-full min-h-[400px] lg:min-h-[750px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-[#EAB308] border-2 border-black px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_black] transform -rotate-2 mb-6">
                HOW IT WORKS
              </div>
              <h2 className="font-heading font-black text-5xl lg:text-6xl text-black leading-[1.1] mb-6">
                Your Digital Engineering Journey Starts Here
              </h2>
              <p className="text-lg text-gray-700 font-medium leading-relaxed max-w-md">
                Our streamlined process is designed to get you onboarded and benefiting from the portal's features instantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href="#"
                className="inline-block bg-[#22C55E] text-black px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px]"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: Curved Timeline (Desktop) --- */}
          <div className="lg:col-span-8 relative h-[750px] hidden lg:block">
            
            {/* SVG Curve Background */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 1200 750"
              preserveAspectRatio="none"
            >
              <defs>
                <path
                  id="journey-path-deep"
                  d="M 20 700 C 350 700, 450 450, 600 450 S 850 50, 1180 50"
                />
              </defs>

              {/* 1. Hard Shadow Line */}
              <motion.use
                href="#journey-path-deep"
                fill="none"
                stroke="black"
                strokeWidth="14"
                strokeLinecap="round"
                transform="translate(12, 12)" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* 2. Main Green Line */}
              <motion.use
                href="#journey-path-deep"
                fill="none"
                stroke="#22C55E" 
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </svg>

            {/* Steps Nodes */}
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="absolute w-[320px] group z-10 flex flex-col items-center justify-center"
                style={{ 
                    top: step.top, 
                    left: step.left,
                    transform: 'translate(-50%, -50%)' 
                }}
              >
                {/* Large Background Number */}
                <span 
                    className="absolute font-black text-[200px] leading-none text-gray-200/80 select-none z-0"
                    style={{
                        top: step.id === 2 ? '-160px' : (step.textPos === 'below' ? '-100px' : 'auto'),
                        bottom: step.textPos === 'above' ? '-120px' : 'auto',
                        left: step.id === 3 ? '40px' : '-30px',
                    }}
                >
                  {step.id}
                </span>

                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 + (index * 0.4), duration: 0.5, type: "spring" }}
                  className="flex flex-col items-center relative z-10"
                >
                  <div className={`flex items-center gap-12 ${step.textPos === 'above' ? 'flex-col-reverse' : 'flex-col'}`}>
                    
                    {/* The Dot (Node) */}
                    <div className="w-12 h-12 bg-[#EAB308] border-[5px] border-black rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative z-20 transition-transform duration-300 group-hover:scale-125"></div>

                    {/* Text Card */}
                    <div 
                        className={`text-center bg-white/90 backdrop-blur-sm p-5 rounded-2xl border-2 border-transparent group-hover:border-black/10 transition-all duration-300 shadow-sm ${step.textPos === 'above' ? '-translate-y-4' : 'translate-y-4'}`}
                    >
                      <h3 className="font-black text-2xl text-black mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-800 font-bold leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* --- MOBILE LAYOUT --- */}
          <div className="lg:hidden col-span-1 mt-12 space-y-12 relative z-10">
            <div className="absolute left-[34px] top-6 bottom-6 w-1 border-l-2 border-dashed border-black/20"></div>

            {steps.map((step) => (
              <div key={step.id} className="relative pl-24">
                <div className="absolute left-0 top-0 w-[70px] h-[70px] bg-[#EAB308] border-3 border-black rounded-full flex items-center justify-center font-black text-3xl shadow-[4px_4px_0px_0px_black] z-20">
                    {step.id}
                </div>
                
                <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_black] relative z-10">
                    <h3 className="font-black text-xl text-black mb-2">
                        {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                        {step.description}
                    </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;