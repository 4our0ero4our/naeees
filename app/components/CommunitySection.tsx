"use client";

import React, { useRef } from "react";
import Link from "next/link";
// 1. IMPORT VARIANTS HERE
import { motion, useInView, Variants } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaCheckCircle, FaRegCommentDots } from "react-icons/fa";

// --- ANIMATION VARIANTS ---
// 2. ADD ': Variants' TYPE TO ALL THESE OBJECTS

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    },
};

const popIn: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    },
};

const slideLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 60 }
    }
}

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
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-start space-y-8 order-2 lg:order-1"
                >
                    {/* 1. Badge */}
                    <motion.div variants={slideLeft}>
                        <div className="inline-block bg-[#EAB308] border-2 border-black px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_black] mb-2">
                            COMMUNITY FORUM
                        </div>
                    </motion.div>

                    {/* 2. Header */}
                    <motion.h2
                        variants={fadeInUp}
                        className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.1]"
                    >
                        Learn Together.<br />Solve Problems Together.
                    </motion.h2>

                    {/* 3. Paragraph */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg text-gray-700 font-medium leading-relaxed max-w-xl"
                    >
                        Engineering thrives on collaboration. The NAEEES discussion forum enables students to ask questions, share solutions, and engage in meaningful academic discussions structured around courses and topics.
                    </motion.p>

                    {/* 4. Bullet Points Grid */}
                    <motion.div
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2"
                    >
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={popIn}
                                className="flex items-center gap-3"
                            >
                                <div className="w-6 h-6 rounded-full bg-[#22C55E] border-2 border-black flex items-center justify-center shrink-0">
                                    <FaCheckCircle className="text-black w-3 h-3" />
                                </div>
                                <span className="font-bold text-black text-sm">{feature}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* 5. CTA Button */}
                    <motion.div
                        variants={fadeInUp}
                        className="pt-6"
                    >
                        <Link
                            href="/dashbaord/forum"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 border-2 border-transparent hover:bg-gray-900 hover:scale-105 shadow-[6px_6px_0px_0px_#22C55E] hover:shadow-[3px_3px_0px_0px_#22C55E] hover:translate-y-[3px]"
                        >
                            <FaRegCommentDots className="w-5 h-5" />
                            Visit the Discussion Forum
                        </Link>
                    </motion.div>
                </motion.div>

                {/* --- RIGHT SIDE: Visuals --- */}
                <div className="relative order-1 lg:order-2 h-[500px] w-full flex items-center justify-center">

                    {/* Background Blob */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-gray-200 to-transparent rounded-full blur-3xl -z-10"
                    />

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: 80, rotate: 10 }}
                        animate={isInView ? { opacity: 1, x: 20, rotate: 6 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="absolute top-0 right-4 lg:right-12 w-full max-w-md bg-white border-3 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_black] z-10 opacity-60 scale-95 origin-bottom-left"
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: -50, rotate: -5 }}
                        animate={isInView ? { opacity: 1, y: 0, rotate: -3 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                        className="relative w-full max-w-md bg-white border-3 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_black] z-20"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#EAB308] border-2 border-black flex items-center justify-center font-bold text-xs">JD</div>
                                    <div>
                                        <p className="font-bold text-black text-sm">Olaiya Oluwajuwon</p>
                                        <p className="text-xs text-gray-500">2 hours ago • <span className="text-[#EAB308] font-bold">ELE 311</span></p>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg leading-tight mb-2">How do I calculate the Thevenin resistance in this complex circuit?</h3>
                            <p className="text-gray-600 text-sm mb-4">I'm stuck on the node analysis part. Can anyone explain the shortcut method?</p>

                            <div className="flex gap-4 border-t-2 border-gray-100 pt-3">
                                <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                                    <FaRegCommentDots /> 5 Comments
                                </div>
                                <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                                    <FaArrowUp /> 12 Upvotes
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 150, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, y: 60, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.5 }}
                        className="absolute -bottom-4 lg:-bottom-8 left-0 lg:-left-8 w-full max-w-md bg-white border-3 border-black rounded-2xl p-0 shadow-[12px_12px_0px_0px_#22C55E] z-30 overflow-hidden"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <div className="bg-[#22C55E] px-4 py-2 border-b-3 border-black flex items-center gap-2">
                                <FaCheckCircle className="text-black" />
                                <span className="font-black text-sm uppercase tracking-wider text-black">Top Answer</span>
                            </div>

                            <div className="p-6 flex gap-4">
                                <div className="flex flex-col items-center gap-1 bg-gray-50 border-2 border-black rounded-full py-2 px-2 h-fit">
                                    <button className="text-[#22C55E] hover:scale-110 transition-transform"><FaArrowUp /></button>
                                    <span className="font-black text-sm">42</span>
                                    <button className="text-gray-400 hover:text-red-500 transition-colors"><FaArrowDown /></button>
                                </div>

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
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default CommunitySection;