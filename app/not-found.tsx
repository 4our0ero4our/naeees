"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { FaBolt, FaTools, FaHome, FaExclamationTriangle } from "react-icons/fa";

// --- ANIMATION VARIANTS ---

// Glitching text effect
const glitchVariants = {
  hidden: { opacity: 1, x: 0, y: 0 },
  visible: {
    opacity: [1, 0.8, 1, 0.9, 1],
    x: [0, -5, 5, -2, 0],
    y: [0, 2, -2, 1, 0],
    skewX: [0, 5, -5, 0],
    color: ["#000000", "#EAB308", "#000000", "#22C55E", "#000000"],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

// Background oscilloscope wave
const waveVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 10,
        ease: "linear" as const,
      },
    },
  },
};

// Random sparks flying
const sparkVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0],
    x: [0, Math.random() * 200 - 100],
    y: [0, Math.random() * 200 - 100],
    rotate: [0, Math.random() * 360],
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
    },
  }),
};

// Dangling wires
const wireVariants = {
  initial: { rotate: 0 },
  animate: (delay: number) => ({
    rotate: [2, -2, 1, -1, 0],
    transition: {
      duration: 4,
      delay: delay,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  }),
};

const NotFound = () => {
  const [isFried, setIsFried] = useState(false);
  const controls = useAnimation();

  // Trigger the "fry" animation on load
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.5 },
      });
      setIsFried(true);
    };
    sequence();
  }, [controls]);

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] overflow-hidden relative flex items-center justify-center border-[12px] border-black">
      
      {/* --- BACKGROUND CHAOS --- */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {/* Oscilloscope Lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={waveVariants}
            animate="animate"
            className="absolute w-[200%] h-24"
            style={{ top: `${20 + i * 30}%`, left: 0 }}
          >
            <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path
                d="M0,50 C150,100 250,0 400,50 S650,100 800,50 S1050,0 1200,50"
                fill="none"
                stroke={i % 2 === 0 ? "#EAB308" : "#22C55E"}
                strokeWidth="4"
                strokeDasharray="20,10"
              />
            </svg>
          </motion.div>
        ))}
        {/* Hazard Stripes Pattern */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_20px,#EAB308_20px,#EAB308_40px)] opacity-5 mix-blend-overlay"></div>
      </div>


      {/* --- DANGLING WIRES (Top Frame) --- */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-20">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={`wire-${i}`}
                custom={i * 0.5}
                variants={wireVariants}
                initial="initial"
                animate="animate"
                className="absolute top-[-20px] origin-top"
                style={{ left: `${10 + i * 20}%` }}
            >
                {/* Wire */}
                <div className={`w-2 h-[150px] lg:h-[250px] ${i%2===0 ? 'bg-black' : 'bg-red-600'} border-2 border-black relative`}>
                    {/* Exposed End */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#EAB308] border-2 border-black flex items-center justify-center">
                        {/* Spark emitter at the end of wires */}
                        {[...Array(3)].map((_, j) => (
                            <Spark key={j} index={j} color={i%2===0 ? "#22C55E" : "#EAB308"} />
                        ))}
                    </div>
                </div>
            </motion.div>
        ))}
      </div>


      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 text-center">
        
        {/* THE FRIED COMPONENT (Central Visual) */}
        <motion.div
          animate={controls}
          className="relative inline-block mb-8"
        >
          {/* Smoke effect when fried */}
          {isFried && <SmokeParticles />}
          
          <div className="relative bg-black border-4 border-black p-8 rounded-2xl shadow-[12px_12px_0px_0px_#EF4444]">
             {/* High Voltage Sign */}
             <div className="absolute -top-6 -left-6 bg-[#EAB308] border-3 border-black p-3 rounded-full animate-bounce">
                <FaExclamationTriangle className="w-8 h-8 text-black" />
             </div>
             
            {/* The "404" Glitch Text */}
            <motion.h1
              variants={glitchVariants}
              initial="hidden"
              animate="visible"
              className="font-heading font-black text-8xl sm:text-[160px] leading-none text-[#EAB308] relative z-10 mix-blend-difference"
              style={{ textShadow: "6px 6px 0px #000" }}
            >
              4<span className="text-[#EF4444]">0</span>4
            </motion.h1>

            {/* Fried Chip Visual Overlay */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
             <div className="absolute bottom-4 right-4 flex gap-2">
                <FaBolt className="text-[#EAB308] w-8 h-8 animate-pulse" />
                <FaBolt className="text-[#22C55E] w-8 h-8 animate-pulse delay-100" />
             </div>
          </div>
        </motion.div>

        {/* HUMOROUS TEXT COMENT */}
        <div className="bg-white border-3 border-black p-6 rounded-xl shadow-[8px_8px_0px_0px_black] relative rotate-1 mb-8">
            <h2 className="font-bold text-2xl sm:text-3xl text-black mb-4 uppercase">
                ⚡ System Failure! You let the magic smoke out.
            </h2>
            <p className="text-lg text-gray-800 font-medium leading-relaxed">
                "Whoops! It seems you tried to divide by zero, or maybe you connected the VCC directly to GND in the lab. Either way, the EEE departmental server is currently <span className="font-bold text-[#EF4444] underline decoration-wavy">fried</span>."
            </p>
            <div className="mt-4 text-sm font-black text-gray-500 flex items-center justify-center gap-2">
                <FaTools className="animate-spin-slow" />
                Diagnostics: Page Not Found (Exception 0xBADCODE)
            </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-3 bg-[#22C55E] text-black px-8 py-4 rounded-full font-black text-xl border-3 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_black] hover:bg-[#16A34A] overflow-hidden"
          >
             {/* Hover electric effect */}
            <span className="absolute inset-0 w-full h-full bg-[#EAB308] opacity-0 group-hover:opacity-30 transition-opacity duration-300 mix-blend-overlay animate-pulse"></span>
            <FaHome className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Reset Breaker (Go Home)</span>
          </Link>
          
          <button
            onClick={() => window.location.reload()}
             className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-xl border-3 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_black] hover:bg-gray-100"
          >
            <FaBolt className="w-5 h-5 group-hover:animate-ping" />
            Try Jiggling the Handle (Refresh)
          </button>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS FOR EFFECTS ---

// Individual Spark Particle
const Spark = ({ index, color }: { index: number; color: string }) => {
    return (
      <motion.div
        custom={index}
        variants={sparkVariants}
        animate="animate"
        className="absolute w-3 h-3 rounded-full z-50"
        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}, 0 0 20px ${color}` }}
      >
        <FaBolt className="text-white w-full h-full scale-75" />
      </motion.div>
    );
  };

// Smoke rising from the fried component
const SmokeParticles = () => {
    return (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none">
            {[...Array(6)].map((_, i) => (
                 <motion.div
                 key={`smoke-${i}`}
                 initial={{ opacity: 0, y: 20, scale: 0.5, x: 0 }}
                 animate={{ 
                     opacity: [0, 0.8, 0], 
                     y: -150 - Math.random() * 100, 
                     scale: [0.5, 2, 3],
                     x: Math.random() * 100 - 50,
                     rotate: Math.random() * 360
                 }}
                 transition={{
                     duration: 3 + Math.random() * 2,
                     repeat: Infinity,
                     delay: i * 0.4,
                     ease: "easeOut"
                 }}
                 className="absolute -top-0 w-16 h-16 bg-gray-700/40 rounded-full blur-xl"
               />
            ))}
        </div>
    )
}

export default NotFound;