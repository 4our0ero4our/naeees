"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWrench, FaCode, FaClock, FaCertificate, FaGraduationCap } from "react-icons/fa";

// --- ANIMATION VARIANTS ---

// Entry: Staggered reveal for children
const containerStagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

// Entry: Slide Up
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    },
};

// Entry: Slide Right
const fadeInRight = {
    hidden: { opacity: 0, x: -60 },
    show: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 1.2, ease: "easeOut" }
    },
};

// Entry: Pop in
const scaleIn = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.8, type: "spring", bounce: 0.3 }
    },
};

// --- CONTINUOUS LOOP VARIANTS (Post-Load Animations) ---

// Gentle floating (Up/Down)
const floatingY = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
};

// Gentle breathing (Scale)
const breathing = {
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
};

// Complex float (Y + Rotation) for the Card
const complexFloat = {
    animate: {
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
        transition: {
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
};

const HeroSection = () => {
    return (
        <section className="relative min-h-screen bg-[#F8F9FA] overflow-hidden pt-20 lg:pt-28">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full h-full pb-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left Side - Main Content */}
                    <motion.div 
                        variants={containerStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-8 relative z-10 pt-10 lg:pt-0"
                    >
                        {/* Main Headline */}
                        <div className="space-y-4 relative">
                            <motion.h1 
                                variants={fadeInUp}
                                className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] text-black tracking-wide"
                            >
                                NAEEES<br />Digital<br />Portal
                            </motion.h1>
                        </div>

                        {/* Subtext area */}
                        <div className="space-y-6">
                            {/* Decorative horizontal pills */}
                            <motion.div 
                                className="flex items-center gap-3"
                                variants={containerStagger} 
                            >
                                <motion.div variants={scaleIn} className="h-6 w-14 bg-black rounded-full" />
                                <motion.div variants={scaleIn} className="h-6 w-14 bg-[#008D5E] rounded-full" />
                                <motion.div variants={scaleIn} className="h-6 w-14 bg-[#22C55E] rounded-full" />
                            </motion.div>

                            <motion.p 
                                variants={fadeInUp}
                                className="text-xl sm:text-2xl text-black leading-tight max-w-lg font-medium"
                            >
                                NAEEES Digital Portal is the official digital campus for Electrical & Electronics Engineering students. This is a centralized platform for learning resources, academic tracking, events, opportunities, and peer collaboration.
                            </motion.p>

                            {/* CTA Button */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="#"
                                    className="inline-block bg-[#22C55E] text-black px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px]"
                                >
                                    Getting Started
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Visuals */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0 lg:pr-12"
                    >

                        {/* Main Hero Image Container */}
                        <div className="relative z-10 w-full max-w-[600px] h-full">

                            {/* Blobs Background - Continuous Organic Movement */}
                            <div className="absolute inset-0 -z-10 overflow-visible">
                                <motion.div 
                                    animate={{
                                        x: [0, 40, -30, 0],
                                        y: [0, -50, 30, 0],
                                        scale: [1, 1.15, 0.9, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308] border-4 border-black rounded-full filter blur-2xl opacity-70" 
                                />
                                <motion.div 
                                    animate={{
                                        x: [0, -40, 30, 0],
                                        y: [0, 50, -30, 0],
                                        scale: [1, 0.9, 1.1, 1],
                                        rotate: [0, -10, 10, 0]
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-0 left-10 w-72 h-72 bg-[#22C55E] border-4 border-black rounded-full filter blur-2xl opacity-70" 
                                />
                            </div>

                            {/* Image - Person */}
                            <motion.div 
                                // Adds a very subtle breathing effect to the main image
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full h-full z-10"
                            >
                                <Image
                                    src="/Images/Hero Image 3.png"
                                    alt="Happy student engaged with phone"
                                    fill
                                    className="object-contain lg:object-right"
                                    priority
                                />
                            </motion.div>

                            {/* Floating Element - Course Categories */}
                            <motion.div 
                                variants={containerStagger}
                                initial="hidden"
                                whileInView="show"
                                className="absolute top-0 -right-4 lg:-right-20 flex flex-col items-end gap-3 z-20"
                            >
                                {["Skill Acquisition", "Career Guidance", "Academic Discussions", "Project Showcase"].map((tag, i) => (
                                    <motion.div
                                        key={tag}
                                        variants={{
                                            hidden: { opacity: 0, x: 50 },
                                            show: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring" } }
                                        }}
                                        className="inline-block w-fit"
                                    >
                                        {/* Nested Motion Div for Continuous Floating */}
                                        <motion.div
                                            animate={{ 
                                                y: [0, -8 - (i * 2), 0], // Different float heights for randomness
                                            }}
                                            transition={{ 
                                                duration: 4 + i, // Different speeds for randomness
                                                repeat: Infinity, 
                                                ease: "easeInOut",
                                                delay: i * 0.5 // Staggered start
                                            }}
                                            className={`border-3 border-black px-6 py-3 rounded-full font-bold text-sm lg:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-default ${i === 0 ? 'bg-[#EAB308]' : 'bg-white'} text-black`}
                                        >
                                            {tag}
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Floating Element - Interactive Engagement Card */}
                            {/* Outer div handles Entry */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="absolute bottom-20 -right-4 lg:-right-24 z-20"
                            >
                                {/* Inner div handles Continuous Loop */}
                                <motion.div
                                    variants={complexFloat}
                                    animate="animate"
                                    className="bg-white p-5 rounded-2xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-[240px]"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-[#EAB308] border-2 border-black flex items-center justify-center shrink-0">
                                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                        </div>
                                        <span className="font-bold text-lg leading-tight text-black">Interactive Engagement</span>
                                    </div>
                                    <p className="text-sm text-black leading-snug font-medium">
                                        Engaging participation enhances learning, fostering interactive collaboration, and feedback.
                                    </p>
                                </motion.div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section - Stats, Video and Courses Text */}
            <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 mx-auto">
                <motion.div
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full mt-12 lg:mt-8 flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-8 2xl:gap-24 relative z-30"
                >

                    {/* Left Section: Stats */}
                    <motion.div variants={fadeInUp} className="flex gap-8 lg:gap-12 shrink-0">
                        <div>
                            <div className="text-5xl lg:text-6xl font-black text-black tracking-tight font-montserrat">1k+</div>
                            <div className="text-base font-medium text-gray-500 mt-2 font-inter">Students</div>
                        </div>
                        <div>
                            <div className="text-5xl lg:text-6xl font-black text-black tracking-tight font-montserrat">500+</div>
                            <div className="text-base font-medium text-gray-500 mt-2 font-inter">Resources</div>
                        </div>
                    </motion.div>

                    {/* Center Section: Video Thumbnail */}
                    <motion.div 
                        variants={scaleIn}
                        className="w-[340px] h-[160px] xl:w-[400px] xl:h-[190px] 2xl:w-[480px] 2xl:h-[220px] shrink-0 group cursor-pointer"
                    >
                        {/* Continuous Breathing Effect for Video */}
                        <motion.div 
                            variants={breathing}
                            animate="animate"
                            className="w-full h-full rounded-full border-2 border-black bg-white p-1.5"
                        >
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src="/Images/Hero Image 2.jpg"
                                    alt="Video thumbnail"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/60 shadow-sm transition-transform group-hover:scale-110">
                                        <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Section: Text and Icons */}
                    <motion.div variants={fadeInRight} className="flex flex-col gap-6 max-w-md shrink-0 xl:items-end xl:text-right">
                        <h3 className="font-bold text-3xl lg:text-4xl text-black leading-[1.1]">
                            Explore our platform and start your journey today
                        </h3>

                        {/* Animated Icons Container */}
                        <motion.div 
                            variants={containerStagger}
                            className="flex items-center -space-x-2 xl:justify-end pl-2"
                        >
                            {[
                                { Icon: FaWrench, z: 0 },
                                { Icon: FaCode, z: 10 },
                                { Icon: FaClock, z: 20 },
                                { Icon: FaCertificate, z: 30 },
                                { Icon: FaGraduationCap, z: 40 }
                            ].map(({ Icon, z }, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0, x: 20 },
                                        show: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 200 } }
                                    }}
                                    className="relative"
                                    style={{ zIndex: z }}
                                >
                                    {/* Inner loop for individual icon bobbing */}
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            ease: "easeInOut",
                                            delay: index * 0.2 
                                        }}
                                        className="w-12 h-12 lg:w-14 lg:h-14 border-3 border-black rounded-full flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-sm"
                                    >
                                        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;