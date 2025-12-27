"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Create Your Student Account",
    description: "Sign up using your school email and matric number to verify your identity and membership status.",
    top: "85%", 
    left: "8%",
    textPos: "below", 
  },
  {
    id: 2,
    title: "Access Your Digital Dashboard",
    description: "Instantly unlock personalized access to academic resources, CGPA tools, discussions, and events.",
    top: "58%", 
    left: "50%",
    textPos: "above", 
  },
  {
    id: 3,
    title: "Learn, Track, and Connect",
    description: "Download materials, calculate results, register for events, and engage with fellow students.",
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
      className="w-full bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* --- BACKGROUND BLOBS (Now Blurry) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Yellow Blob (Top Right) */}
        <motion.div
            animate={{
                y: [0, -30, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            // Added 'blur-3xl' here
            className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] opacity-20 lg:opacity-30 blur-3xl"
        >
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path 
                    fill="#EAB308" 
                    stroke="black" 
                    strokeWidth="2" 
                    d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-8.3C81.5,3.8,70.2,13.7,60.9,22.2C51.6,30.7,44.3,37.8,36.4,45.2C28.5,52.6,20,60.3,10.6,63.9C1.2,67.5,-9.1,67,-19.9,65.3C-30.7,63.6,-42,60.7,-51.9,54.1C-61.8,47.5,-70.3,37.2,-75.8,25.6C-81.3,14,-83.8,1.1,-81.4,-10.8C-79,-22.7,-71.7,-33.6,-61.8,-41.8C-51.9,-50,-39.4,-55.5,-27.2,-64.1C-15,-72.7,-3.1,-84.4,10.1,-86.1C23.3,-87.8,30.5,-101.9,44.7,-76.4Z" 
                    transform="translate(100 100)" 
                />
             </svg>
        </motion.div>

        {/* Green Blob (Bottom Left) */}
        <motion.div
            animate={{
                y: [0, 40, 0],
                rotate: [0, -5, 0],
                scale: [1, 1.05, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            // Added 'blur-3xl' here
            className="absolute -bottom-[100px] -left-[150px] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-20 lg:opacity-30 blur-3xl"
        >
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path 
                    fill="#22C55E" 
                    stroke="black" 
                    strokeWidth="2"
                    d="M41.7,-70.3C52.8,-62.4,59.8,-49.4,66.3,-37.2C72.8,-25,78.8,-13.6,77.3,-2.6C75.8,8.4,66.8,19,57.8,28.6C48.8,38.2,39.8,46.8,29.9,53.8C20,60.8,9.2,66.2,-1.4,68.6C-12,71,-23.1,70.4,-32.8,65.4C-42.5,60.4,-50.8,51,-58.4,40.7C-66,30.4,-72.9,19.2,-75.4,7.1C-77.9,-5,-76,-18,-68.8,-28.4C-61.6,-38.8,-49.1,-46.6,-37.1,-54.1C-25.1,-61.6,-13.6,-68.8,0.2,-69.1C14,-69.5,28,-62.9,41.7,-70.3Z" 
                    transform="translate(100 100)" 
                />
             </svg>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* --- LEFT COLUMN: Header & CTA --- */}
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