"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWrench, FaCode, FaClock, FaCertificate, FaGraduationCap } from "react-icons/fa";

const HeroSection = () => {
    return (
        // Changed bg-white to a light gray to match the reference image
        <section className="relative min-h-screen bg-[#F8F9FA] overflow-hidden pt-20 lg:pt-28">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full h-full pb-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side - Main Content */}
                    <div className="space-y-8 relative z-10 pt-10 lg:pt-0 animate-fade-in-left">
                        {/* Main Headline */}
                        <div className="space-y-4 relative">
                            <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] text-black tracking-wide">
                                NAEEES<br />Digital<br />Portal
                            </h1>
                        </div>

                        {/* Subtext area with decorative pills */}
                        <div className="space-y-6">
                            {/* Decorative horizontal pills - updated colors and layout */}
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-14 bg-black rounded-full" />
                                <div className="h-6 w-14 bg-[#008D5E] rounded-full" /> {/* Darker Green */}
                                <div className="h-6 w-14 bg-[#22C55E] rounded-full" /> {/* Lighter Green */}
                            </div>

                            <p className="text-xl sm:text-2xl text-black leading-tight max-w-lg font-medium">
                                Fostering curiosity and innovation through inspiring educational exploration and discovery journeys.
                            </p>

                            {/* CTA Button - Specific green and sharp shadow */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="#"
                                    className="inline-block bg-[#22C55E] text-black px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px]"
                                >
                                    Getting Started
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Visuals */}
                    <div className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0 lg:pr-12 animate-fade-in-scale" style={{ animationDelay: "0.2s", opacity: 0 }}>

                        {/* Main Hero Image Container */}
                        <div className="relative z-10 w-full max-w-[600px] h-full">

                            {/* Blobs Background - Animated random movement with black borders */}

                            <div className="absolute inset-0 -z-10 overflow-visible">

                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308] border-4 border-black rounded-full filter blur-2xl opacity-70 animate-random-move-1" />

                                <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#22C55E] border-4 border-black rounded-full filter blur-2xl opacity-70 animate-random-move-2" />

                            </div>

                            {/* Image - Person */}
                            <div className="relative w-full h-full z-10">
                                <Image
                                    src="/Images/Hero Image 3.png"
                                    alt="Happy student engaged with phone"
                                    fill
                                    className="object-contain lg:object-right"
                                    priority
                                />
                            </div>

                            {/* Floating Element - Course Categories */}
                            <div className="absolute top-0 -right-4 lg:-right-20 flex flex-col items-end gap-3 z-20">
                                {["Graphic Design", "UI/UX Design", "Animation", "Prototyping"].map((tag, i) => (
                                    <div
                                        key={tag}
                                        // Updated styling for sharper shadows and correct colors
                                        className={`border-3 border-black px-6 py-3 rounded-full font-bold text-sm lg:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block w-fit hover:scale-105 transition-transform cursor-default animate-random-move-3 ${i === 0 ? 'bg-[#EAB308]' : 'bg-white'} text-black`}
                                        style={{ animationDuration: `${7 + i}s`, animationDelay: `${i * 0.5}s` }}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>

                            {/* Floating Element - Interactive Engagement Card */}
                            {/* Updated styling for sharper shadow, correct icon color, and text */}
                            <div className="absolute bottom-20 -right-4 lg:-right-24 bg-white p-5 rounded-2xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-[240px] z-20 animate-random-move-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-[#EAB308] border-2 border-black flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                    <span className="font-bold text-lg leading-tight text-black">Interactive Engagement</span>
                                </div>
                                <p className="text-sm text-black leading-snug font-medium">
                                    Engaging participation enhances learning, fostering interactive collaboration, and feedback.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Stats, Video and Courses Text - (Kept exactly as provided in the previous turn) */}
            <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 mx-auto">
                <div
                    // Fixed: Changed xl:gap-24 to xl:gap-8 to prevent overflow on standard laptops, 
                    // and added 2xl:gap-24 for larger screens.
                    className="w-full mt-12 lg:mt-8 flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-8 2xl:gap-24 animate-fade-in-up relative z-30"
                    style={{ animationDelay: "0.4s", opacity: 0 }}
                >

                    {/* Left Section: Stats */}
                    <div className="flex gap-8 lg:gap-12 shrink-0">
                        <div>
                            <div className="text-5xl lg:text-6xl font-black text-black tracking-tight">99k+</div>
                            <div className="text-base font-medium text-gray-500 mt-2">Satisfied customers</div>
                        </div>
                        <div>
                            <div className="text-5xl lg:text-6xl font-black text-black tracking-tight">10k+</div>
                            <div className="text-base font-medium text-gray-500 mt-2">Supreme Assets</div>
                        </div>
                    </div>

                    {/* Center Section: Video Thumbnail */}
                    {/* Fixed: Adjusted width breakpoints. xl:w-[400px] fits better on 1280px screens than 480px */}
                    <div className="relative w-[340px] h-[160px] xl:w-[400px] xl:h-[190px] 2xl:w-[480px] 2xl:h-[220px] rounded-full border-3 border-black overflow-hidden shrink-0 group cursor-pointer">
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

                    {/* Right Section: Text and Icons */}
<div className="flex flex-col gap-6 max-w-md shrink-0 xl:items-end xl:text-right">
  <h3 className="font-bold text-3xl lg:text-4xl text-black leading-[1.1]">
    We have 99+ online<br />courses to try this year
  </h3>

  {/* FIXED: Reduced overlap from -space-x-4 to -space-x-2 */}
  <div className="flex items-center -space-x-2 xl:justify-end pl-2">
    {/* Icon 1 */}
    {/* FIXED: Added hard shadow: shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] and updated transition */}
    <div className="relative z-0 w-12 h-12 lg:w-14 lg:h-14 border-3 border-black rounded-full flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-sm hover:z-50">
      <FaWrench className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
    </div>
    {/* Icon 2 */}
    <div className="relative z-10 w-12 h-12 lg:w-14 lg:h-14 border-3 border-black rounded-full flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-sm hover:z-50">
      <FaCode className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
    </div>
    {/* Icon 3 */}
    <div className="relative z-20 w-12 h-12 lg:w-14 lg:h-14 border-3 border-black rounded-full flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-sm hover:z-50">
      <FaClock className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
    </div>
    {/* Icon 4 */}
    <div className="relative z-30 w-12 h-12 lg:w-14 lg:h-14 border-3 border-black rounded-full flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-sm hover:z-50">
      <FaCertificate className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
    </div>
    {/* Icon 5 */}
    <div className="relative z-40 w-12 h-12 lg:w-14 lg:h-14 border-3 border-black rounded-full flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-sm hover:z-50">
      <FaGraduationCap className="w-6 h-6 lg:w-7 lg:h-7 text-black" />
    </div>
  </div>
</div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;