"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Navbar from "../components/Navbar";
import FooterSectionWrapper from "../components/FooterSectionWrapper";
import {
    FaBolt,
    FaGraduationCap,
    FaUsers,
    FaLightbulb,
    FaHandshake,
    FaBook,
    FaChartLine,
    FaBullhorn,
    FaComments,
    FaArrowRight
} from "react-icons/fa";

// --- ANIMATION VARIANTS ---
const containerStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

// --- CORE VALUES DATA ---
const coreValues = [
    { icon: <FaGraduationCap />, title: "Academic Excellence", desc: "Striving for the highest standards in learning and research." },
    { icon: <FaLightbulb />, title: "Innovation", desc: "Fostering creativity to solve real-world engineering problems." },
    { icon: <FaBolt />, title: "Integrity", desc: "Upholding ethical standards in all professional endeavors." },
    { icon: <FaUsers />, title: "Collaboration", desc: "Building a supportive community for shared growth." },
    { icon: <FaHandshake />, title: "Leadership", desc: "Empowering students to take initiative and serve." },
];

// --- FOCUS AREAS DATA ---
const focusAreas = [
    { title: "Academic Support", desc: "Access to lecture materials, past questions, and academic tools.", icon: <FaBook /> },
    { title: "Skill Development", desc: "Trainings, workshops, and hands-on technical sessions.", icon: <FaBolt /> },
    { title: "Professional Exposure", desc: "Internship, scholarship, and career-related updates.", icon: <FaHandshake /> },
    { title: "Community Engagement", desc: "Peer discussions, forums, and collaborative learning.", icon: <FaComments /> },
    { title: "Leadership Development", desc: "Student representation and organizational experience.", icon: <FaUsers /> },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-[#22C55E] selection:text-black">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerStagger}
                        className="text-left"
                    >
                        <motion.div variants={fadeInUp} className="inline-block bg-[#EAB308] border-2 border-black px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_black] mb-6 transform -rotate-2">
                            ABOUT NAEEES
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tight">
                            THE <span className="text-[#22C55E]">POWER</span><br />BEHIND THE<br />CIRCUIT.
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                            National Association of Electrical and Electronics Engineering Students.
                        </motion.p>
                        <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-medium">
                            NAEEES is a professional student-led association dedicated to supporting the academic, technical, and professional growth of Electrical and Electronics Engineering students.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex gap-4">
                            <Link href="#activities" className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-black hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_#22C55E]">
                                Explore Activities
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Illustration (Abstract) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center"
                    >
                        {/* Abstract Geometric Shapes representing Circuit/Structure */}
                        <div className="relative w-full h-full">
                            <div className="absolute top-10 right-10 w-48 h-48 bg-[#22C55E] rounded-full border-4 border-black z-0 opacity-20"></div>
                            <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#EAB308] rounded-full border-4 border-black z-0 opacity-20"></div>

                            {/* Main Graphic Placeholder - Replace with actual image if available, or keep abstract */}
                            <div className="relative z-10 w-full h-full border-4 border-black rounded-[2rem] bg-white shadow-[12px_12px_0px_0px_black] overflow-hidden flex items-center justify-center p-8">
                                <div className="grid grid-cols-2 gap-4 w-full h-full opacity-10">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="border-2 border-dashed border-black rounded-lg"></div>
                                    ))}
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                    <FaBolt className="text-8xl text-black mb-4" />
                                    <h3 className="font-black text-3xl uppercase">Empowering<br />Students</h3>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. WHO WE ARE */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6] border-b-4 border-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black mb-8 uppercase tracking-tight relative inline-block">
                        Who We Are
                        <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#22C55E]"></span>
                    </h2>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                        NAEEES serves as a unifying body for Electrical and Electronics Engineering students, providing a platform for <span className="bg-[#EAB308] px-1 border border-black rounded-md shadow-[2px_2px_0px_0px_black]">academic collaboration</span>, skill development, innovation, and leadership. Through structured programs, resources, and peer engagement, the association bridges the gap between classroom learning and real-world engineering practice.
                    </p>
                </div>
            </section>

            {/* 3. MISSION, VISION & VALUES */}
            <section id="mission-vision" className="py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Mission */}
                        <div className="bg-black text-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#22C55E]">
                            <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center border-2 border-white mb-6 text-black">
                                <FaBolt />
                            </div>
                            <h3 className="text-3xl font-black mb-4 uppercase">Our Mission</h3>
                            <p className="text-gray-300 text-lg font-medium leading-relaxed">
                                To empower students, particularly Electrical and Electronics Engineering students by providing access to academic resources, technical opportunities, mentorship, and professional development experiences that enhance competence and confidence.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white text-black p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_black]">
                            <div className="w-12 h-12 bg-[#EAB308] rounded-full flex items-center justify-center border-2 border-black mb-6">
                                <FaLightbulb />
                            </div>
                            <h3 className="text-3xl font-black mb-4 uppercase">Our Vision</h3>
                            <p className="text-gray-700 text-lg font-medium leading-relaxed">
                                To be a leading student engineering association that produces technically sound, innovative, and ethically responsible engineers who contribute meaningfully to society.
                            </p>
                        </div>

                        {/* Core Values */}
                        <div className="bg-white text-black p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_black] md:col-span-2 lg:col-span-1">
                            <h3 className="text-3xl font-black mb-6 uppercase border-b-4 border-black pb-2 inline-block">Core Values</h3>
                            <ul className="space-y-4">
                                {coreValues.map((val, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 text-[#22C55E]">{val.icon}</div>
                                        <div>
                                            <strong className="block text-lg font-bold">{val.title}</strong>
                                            <span className="text-gray-600 text-sm font-medium">{val.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. WHAT WE DO */}
            <section id="activities" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#EAB308] border-b-4 border-black">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-black uppercase">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {focusAreas.map((area, idx) => (
                            <div key={idx} className="bg-white border-4 border-black p-6 rounded-xl shadow-[6px_6px_0px_0px_black] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_black] transition-all">
                                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center text-xl mb-4">
                                    {area.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-2">{area.title}</h3>
                                <p className="text-gray-700 font-medium">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. DIGITAL PORTAL */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b-4 border-black overflow-hidden relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block bg-black text-white px-4 py-1 rounded-full font-bold text-sm mb-4">
                            DIGITAL CAMPUS
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase leading-tight">
                            The NAEEES<br />Digital Portal
                        </h2>
                        <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">
                            The NAEEES Digital Portal serves as the central online platform for students to access academic materials, track academic progress, participate in discussions, and stay informed about updates across the campus.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "Material Repository", icon: <FaBook /> },
                                { label: "CGPA Tracker", icon: <FaChartLine /> },
                                { label: "Announcements", icon: <FaBullhorn /> },
                                { label: "Student Forums", icon: <FaComments /> },
                            ].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 border-2 border-black rounded-lg bg-gray-50 shadow-[2px_2px_0px_0px_#22C55E]">
                                    <span className="text-[#22C55E] text-xl">{feat.icon}</span>
                                    <span className="font-bold text-lg">{feat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Portal Abstract Graphic */}
                    <div className="relative">
                        <div className="aspect-video bg-black rounded-2xl border-4 border-black shadow-[12px_12px_0px_0px_#EAB308] p-2">
                            <div className="w-full h-full bg-gray-900 rounded-xl overflow-hidden relative flex flex-col items-center justify-center text-gray-500">
                                {/* Browser Mockup Header */}
                                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-center mt-8">
                                    <h4 className="text-white font-black text-2xl mb-2">NAEEES PORTAL</h4>
                                    <p className="text-sm">Connecting Students Digitally</p>
                                </div>
                                {/* Abstract Grid content */}
                                <div className="grid grid-cols-3 gap-4 p-8 w-full opacity-30">
                                    <div className="h-20 bg-gray-700 rounded-lg col-span-2"></div>
                                    <div className="h-20 bg-gray-700 rounded-lg"></div>
                                    <div className="h-32 bg-gray-700 rounded-lg"></div>
                                    <div className="h-32 bg-gray-700 rounded-lg col-span-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. EXECUTIVE TEAM */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b-4 border-black" id="executives">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-black mb-12 text-center uppercase">Meet the Executive Team</h2>

                    {/* Using placeholders as requested */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { role: "President", name: "Executive Name" },
                            { role: "Vice President", name: "Executive Name" },
                            { role: "Gen. Secretary", name: "Executive Name" },
                            { role: "Academic Director", name: "Executive Name" },
                            { role: "Welfare Director", name: "Executive Name" },
                            { role: "P.R.O.", name: "Executive Name" },
                            { role: "Fin. Secretary", name: "Executive Name" },
                            { role: "Social Director", name: "Executive Name" },
                        ].map((exec, i) => (
                            <div key={i} className="bg-white border-2 border-black rounded-xl p-4 text-center hover:shadow-[4px_4px_0px_0px_black] transition-shadow">
                                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 border-2 border-black flex items-center justify-center text-gray-400">
                                    <FaUsers className="text-3xl" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{exec.name}</h3>
                                <p className="text-[#22C55E] font-bold text-sm uppercase tracking-wide">{exec.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. ORGANIZATIONAL STRUCTURE */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-4 border-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black mb-8 uppercase">Structure</h2>
                    <div className="flex flex-wrap justify-center gap-4 font-bold text-lg">
                        {["President", "Vice President", "General Secretary", "Academic Director", "Welfare Director", "Public Relations Officer"].map((role, i) => (
                            <div key={i} className="flex items-center">
                                <span className="bg-gray-100 border-2 border-black px-4 py-2 rounded-lg">{role}</span>
                                {i < 5 && <div className="hidden sm:block w-8 h-0.5 bg-black mx-2"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. MEMBERSHIP & 9. IMPACT (Combined for layout) */}
            <section className="bg-black text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Membership */}
                    <div className="p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 border-white/20">
                        <div className="inline-block bg-[#22C55E] text-black px-4 py-1 rounded-full font-bold text-sm mb-6">
                            JOIN US
                        </div>
                        <h2 className="text-4xl font-black mb-6 uppercase">Membership</h2>
                        <p className="text-gray-300 text-xl font-medium mb-8 leading-relaxed">
                            Membership is open to students of the Electrical and Electronics Engineering department. Members gain access to exclusive academic resources, discounted events, and leadership opportunities within the association.
                        </p>
                        <Link href="/register" className="inline-block bg-white text-black px-8 py-4 rounded-xl font-black text-lg border-2 border-transparent hover:bg-[#EAB308] hover:border-white transition-all">
                            Become a Member
                        </Link>
                    </div>

                    {/* Impact */}
                    <div className="p-12 lg:p-24 bg-[#111]">
                        <h2 className="text-4xl font-black mb-10 uppercase text-[#EAB308]">Our Impact</h2>
                        <div className="space-y-8">
                            <div className="flex items-end gap-4 border-b border-gray-800 pb-4">
                                <span className="text-5xl font-black text-white">700+</span>
                                <span className="text-gray-400 font-bold mb-2 text-lg">Active Members</span>
                            </div>
                            <div className="flex items-end gap-4 border-b border-gray-800 pb-4">
                                <span className="text-5xl font-black text-white">10+</span>
                                <span className="text-gray-400 font-bold mb-2 text-lg">Academic Sessions</span>
                            </div>
                            <div className="flex items-end gap-4 border-b border-gray-800 pb-4">
                                <span className="text-5xl font-black text-white">10+</span>
                                <span className="text-gray-400 font-bold mb-2 text-lg">Workshops Conducted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. FOOTER CTA */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#22C55E] border-b-4 border-black text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase text-black max-w-3xl mx-auto">
                    Ready to Shape the Future of Engineering?
                </h2>
                <p className="text-xl font-bold text-black mb-10">
                    Join a community committed to academic excellence and professional growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/register" className="bg-black text-white px-10 py-5 rounded-2xl font-black text-xl border-2 border-black shadow-[6px_6px_0px_0px_white] hover:shadow-[4px_4px_0px_0px_white] hover:translate-y-[2px] transition-all">
                        Join NAEEES
                    </Link>
                    <Link href="/dashbaord" className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl border-2 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-y-[2px] transition-all">
                        Visit Portal
                    </Link>
                </div>
            </section>

            <FooterSectionWrapper />
        </main>
    );
}
