"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaCheckCircle, FaRegCommentDots, FaHashtag } from "react-icons/fa";

const CommunitySection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const features = [
    "Course-specific discussions",
    "Upvoted helpful answers",
    "Moderated academic environment",
    "Student-led learning",
  ];

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[#F8F9FA] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* --- LEFT SIDE: Content --- */}
        <div className="flex flex-col items-start space-y-8 order-2 lg:order-1">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-block bg-[#EAB308] border-2 border-black px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_black] mb-6">
                    COMMUNITY FORUM
                </div>
                <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.1] mb-6">
                    Learn Together.<br />Solve Problems Together.
                </h2>
                <p className="text-lg text-gray-700 font-medium leading-relaxed max-w-xl">
                    Engineering thrives on collaboration. The NAEEES discussion forum enables students to ask questions, share solutions, and engage in meaningful academic discussions structured around courses and topics.
                </p>
            </motion.div>

            {/* Bullet Points */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#22C55E] border-2 border-black flex items-center justify-center shrink-0">
                            <FaCheckCircle className="text-black w-3 h-3" />
                        </div>
                        <span className="font-bold text-black text-sm">{feature}</span>
                    </div>
                ))}
            </motion.div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="pt-4"
            >
                <Link
                    href="#"
                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 border-2 border-transparent hover:bg-gray-900 hover:scale-105 shadow-[6px_6px_0px_0px_#22C55E] hover:shadow-[3px_3px_0px_0px_#22C55E] hover:translate-y-[3px]"
                >
                    <FaRegCommentDots className="w-5 h-5" />
                    Visit the Discussion Forum
                </Link>
            </motion.div>
        </div>

        {/* --- RIGHT SIDE: Visuals (Mock Forum Thread) --- */}
        <div className="relative order-1 lg:order-2 h-[500px] w-full flex items-center justify-center">
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-gray-200 to-transparent opacity-50 rounded-full blur-3xl -z-10"></div>

            {/* Card 1: The Question (Background Card) */}
            <motion.div
                initial={{ opacity: 0, x: 50, rotate: 6 }}
                animate={isInView ? { opacity: 1, x: 20, rotate: 6 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-0 right-4 lg:right-12 w-full max-w-md bg-white border-3 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_black] z-10 opacity-60 scale-95 origin-bottom-left"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-black"></div>
                    <div>
                        <div className="h-3 w-24 bg-gray-200 rounded mb-1"></div>
                        <div className="h-2 w-16 bg-gray-100 rounded"></div>
                    </div>
                </div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </motion.div>

            {/* Card 2: The Detailed Question (Middle) */}
            <motion.div
                initial={{ opacity: 0, y: -20, rotate: -3 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: -3 } : {}}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md bg-white border-3 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_black] z-20"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EAB308] border-2 border-black flex items-center justify-center font-bold text-xs">JD</div>
                        <div>
                            <p className="font-bold text-black text-sm">Olaiya Oluwajuwon</p>
                            <p className="text-xs text-gray-500">2 hours ago • <span className="text-[#EAB308] font-bold">ELE 311</span></p>
                        </div>
                    </div>
                </div>
                {/* Body */}
                <h3 className="font-bold text-lg leading-tight mb-2">How do I calculate the Thevenin resistance in this complex circuit?</h3>
                <p className="text-gray-600 text-sm mb-4">I'm stuck on the node analysis part. Can anyone explain the shortcut method?</p>
                
                {/* Footer Stats */}
                <div className="flex gap-4 border-t-2 border-gray-100 pt-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                        <FaRegCommentDots /> 5 Comments
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                         <FaArrowUp /> 12 Upvotes
                    </div>
                </div>
            </motion.div>

            {/* Card 3: The "Verified Answer" (Front & Center) */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 60 } : {}}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                className="absolute -bottom-4 lg:-bottom-8 left-0 lg:-left-8 w-full max-w-md bg-white border-3 border-black rounded-2xl p-0 shadow-[12px_12px_0px_0px_#22C55E] z-30 overflow-hidden"
            >
                {/* Green "Verified" Header */}
                <div className="bg-[#22C55E] px-4 py-2 border-b-3 border-black flex items-center gap-2">
                    <FaCheckCircle className="text-black" />
                    <span className="font-black text-sm uppercase tracking-wider text-black">Top Answer</span>
                </div>

                <div className="p-6 flex gap-4">
                    {/* Voting Column */}
                    <div className="flex flex-col items-center gap-1 bg-gray-50 border-2 border-black rounded-full py-2 px-2 h-fit">
                        <button className="text-[#22C55E] hover:scale-110 transition-transform"><FaArrowUp /></button>
                        <span className="font-black text-sm">42</span>
                        <button className="text-gray-400 hover:text-red-500 transition-colors"><FaArrowDown /></button>
                    </div>

                    {/* Content */}
                    <div>
                         <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-sm">Sarah K.</span>
                            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-md">Tutor</span>
                        </div>
                        <p className="text-sm text-gray-800 leading-snug">
                            Start by turning off all independent sources. Short voltage sources and open current sources. Then look in from the load terminals...
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>

      </div>
    </section>
  );
};

export default CommunitySection;