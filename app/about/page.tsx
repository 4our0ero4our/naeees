"use client";

import React, { useState } from "react";
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
    FaArrowRight,
    FaUserTie
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
    { icon: <FaGraduationCap />, title: "Academic Excellence", desc: " Commitment to high academic and professional standards." },
    { icon: <FaLightbulb />, title: "Innovation", desc: "Encouraging creativity, research, and technological advancement." },
    { icon: <FaBolt />, title: "Integrity", desc: "Upholding honesty, ethics, and responsibility in all activities." },
    { icon: <FaUserTie />, title: "Professionalism", desc: "Preparing members for industry readiness and global relevance." },
    { icon: <FaHandshake />, title: "Teamwork &amp; Unity", desc: "Fostering collaboration, inclusiveness, and mutual respect." },
    { icon: <FaUserTie />, title: "Leadership", desc: "Developing responsible, visionary, and service-oriented leaders." },
];

// --- FOCUS AREAS DATA ---
const focusAreas = [
    { title: "Academic Support", desc: "Access to lecture materials, past questions, and academic tools.", icon: <FaBook /> },
    { title: "Skill Development", desc: "Trainings, workshops, and hands-on technical sessions.", icon: <FaBolt /> },
    { title: "Professional Exposure", desc: "Internship, scholarship, and career-related updates.", icon: <FaHandshake /> },
    { title: "Community Engagement", desc: "Peer discussions, forums, and collaborative learning.", icon: <FaComments /> },
    { title: "Leadership Development", desc: "Student representation and organizational experience.", icon: <FaUsers /> },
];


// --- EXECUTIVES DATA ---
const executivesData = [
    { id: 1, name: "Anas Hamza", role: "President", image: "/Images/President.jpeg", category: "Leadership" },
    { id: 2, name: "Isaiah Gift Dakoh", role: "Vice President", image: "/Images/Vice President.jpeg", category: "Leadership" },
    { id: 3, name: "Ishaq-Lawal Abdulrahman Hisbullah", role: "Gen. Secretary", image: "/Images/General Secretary.jpeg", category: "Secretariat" },
    { id: 11, name: "Dibal Gideon Abbagana", role: "Director of Sports", image: "/Images/Director of Sports.jpeg", category: "Social" },
    { id: 4, name: "Kwaghfan A. Matthew", role: "Director of Projects", image: "/Images/Director of Projects.jpeg", category: "Academic" },
    { id: 9, name: "Meshak Peter Dakat", role: "Asst. Director of Projects", image: "/Images/Asst. Director of Projects.jpeg", category: "Secretariat" },
    { id: 14, name: "Mathias Onoja", role: "Director of Social", image: null, category: "Welfare" },
    { id: 7, name: "Akwu Lawrence Onuche-Ojo", role: "Fin. Secretary", image: null, category: "Finance" },
    { id: 13, name: "Yunusa Salihu", role: "Asst. Gen. Secretary", image: null, category: "Secretariat" },
    { id: 5, name: "Modrecai Mana Shaaba", role: "Welfare Director", image: null, category: "Welfare" },
    { id: 6, name: "Muhammad Rabiu Idris", role: "P.R.O.", image: null, category: "Media" },
    // { id: 8, name: "Tunde Bakare", role: "Social Director", image: null, category: "Social" },
    // { id: 10, name: "Samuel Kalu", role: "Technical Director", image: null, category: "Academic" },
    { id: 12, name: "Amhiedamen Osaze Great", role: "Librarian", image: null, category: "Secretariat" },
];

const galleryImages = [
    { id: 1, src: "", alt: "Students in Lab" }, // Placeholders
    { id: 2, src: "", alt: "Workshop Session" },
    { id: 3, src: "", alt: "Group Photo" },
    { id: 4, src: "", alt: "Award Ceremony" },
    { id: 5, src: "", alt: "Field Trip" },
    { id: 6, src: "", alt: "Conference" },
];

// --- SUB-COMPONENT: EXECUTIVE SECTION ---
const ExecutiveSection = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [page, setPage] = useState(0);
    const itemsPerPage = 6;

    const tabs = ["All", "Leadership", "Academic", "Welfare", "Social", "Finance"];

    const filtered = activeTab === "All"
        ? executivesData
        : executivesData.filter(e => e.category === activeTab);

    const paginated = filtered.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    // Reset page when tab changes
    React.useEffect(() => { setPage(0); }, [activeTab]);

    return (
        <section id="executives" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-b-4 border-black relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Headers & Filters */}
                    <div className="lg:col-span-4 flex flex-col items-start">
                        <div className="inline-block bg-[#EAB308] text-black px-4 py-1 rounded-full font-bold text-sm mb-6 border-2 border-white">
                            NAEEES LEADERSHIP
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase leading-none">
                            Meet The<br /><span className="text-[#22C55E]">Executives</span>.
                        </h2>
                        <p className="text-white text-lg mb-12 max-w-sm font-medium">
                            The dedicated students working behind the scenes to drive innovation and success for the department.
                        </p>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-full font-bold text-sm border-2 transition-all ${activeTab === tab
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-gray-500 border-gray-700 hover:border-white hover:text-white"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Pagination Controls (Desktop) */}
                        <div className="hidden lg:flex gap-4 mt-auto">
                            <button
                                disabled={page === 0}
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all"
                            >
                                <FaArrowRight className="rotate-180" />
                            </button>
                            <span className="flex items-center font-bold text-xl">
                                {page + 1} <span className="text-gray-600 mx-2">/</span> {Math.max(1, totalPages)}
                            </span>
                            <button
                                disabled={page >= totalPages - 1}
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>

                    {/* Right: Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full content-start">
                            {paginated.map((exec) => (
                                <motion.div
                                    key={exec.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative bg-[#111] border-2 border-gray-800 rounded-2xl overflow-hidden hover:border-[#22C55E] transition-colors"
                                >
                                    {/* Larger Image Area */}
                                    <div className="aspect-[4/5] bg-gray-900 relative">
                                        {/* Placeholder for Image */}
                                        {/* <div className="w-full h-full flex items-center justify-center text-gray-700">
                                            <FaUsers className="text-6xl" />
                                        </div> */}
                                        {/* <Image src={exec.image} alt={exec.name} width={1000} height={1000} className="w-full h-full object-cover" /> */}
                                        {exec.image && (
                                            <Image src={exec.image} alt={exec.name} width={1000} height={1000} className="w-full h-full object-cover" />
                                        )}
                                        {!exec.image && (
                                            <div className="w-full h-full flex items-center justify-center text-gray-700">
                                                <FaUsers className="text-6xl" />
                                            </div>
                                        )}

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                                        {/* Text Bottom */}
                                        <div className="absolute bottom-0 left-0 w-full p-6">
                                            <h3 className="text-white font-bold text-xl leading-tight mb-1 group-hover:text-[#22C55E] transition-colors">{exec.name}</h3>
                                            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{exec.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination Controls (Mobile) */}
                        <div className="flex lg:hidden gap-4 mt-8 justify-center">
                            <button
                                disabled={page === 0}
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all"
                            >
                                <FaArrowRight className="rotate-180" />
                            </button>
                            <span className="flex items-center font-bold text-xl">
                                {page + 1} <span className="text-gray-600 mx-2">/</span> {Math.max(1, totalPages)}
                            </span>
                            <button
                                disabled={page >= totalPages - 1}
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// --- SUB-COMPONENT: GALLERY SECTION ---
const GallerySection = () => {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b-4 border-black">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">Life at <span className="text-[#22C55E]">NAEEES</span></h2>
                        <p className="text-lg text-gray-700 font-medium max-w-lg">
                            Capturing the moments, innovations, and spirit of our engineering community.
                        </p>
                    </div>
                    <Link href="#" className="hidden md:flex items-center gap-2 font-bold text-lg border-b-2 border-black pb-1 hover:text-[#22C55E] hover:border-[#22C55E] transition-all">
                        View Full Gallery <FaArrowRight />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
                    {/* 1. Large Feature */}
                    {/* <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-gray-100 rounded-2xl border-4 border-black relative overflow-hidden group"> */}
                        {/* <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span className="font-black text-gray-400 text-6xl">1</span>
                        </div> */}
                        {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <FaComments className="text-white text-6xl" />
                        </div> */}
                        <Image src="/Images/Gallery 1.jpeg" alt="Gallery 1" width={1000} height={1000} className="w-full h-full object-cover" />
                    {/* </div> */}

                    {/* 2. Portrait */}
                    <div className="bg-gray-100 rounded-2xl border-4 border-black relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span className="font-black text-gray-400 text-4xl">2</span>
                        </div>
                    </div>

                    {/* 3. Portrait */}
                    <div className="bg-gray-100 rounded-2xl border-4 border-black relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span className="font-black text-gray-400 text-4xl">3</span>
                        </div>
                    </div>

                    {/* 4. Wide */}
                    <div className="md:col-span-2 bg-gray-100 rounded-2xl border-4 border-black relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span className="font-black text-gray-400 text-4xl">4</span>
                        </div>
                    </div>

                    {/* 5. Portrait */}
                    <div className="bg-gray-100 rounded-2xl border-4 border-black relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span className="font-black text-gray-400 text-4xl">5</span>
                        </div>
                    </div>

                    {/* 6. Portrait */}
                    <div className="bg-gray-100 rounded-2xl border-4 border-black relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span className="font-black text-gray-400 text-4xl">6</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="#" className="inline-flex items-center gap-2 font-bold text-lg border-b-2 border-black pb-1">
                        View Full Gallery <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

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
                                {/* <div className="grid grid-cols-2 gap-4 w-full h-full opacity-10">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="border-2 border-dashed border-black rounded-lg"></div>
                                    ))}
                                </div> */}
                                <Image src="/Images/About Featured Image.jpeg" alt="About Hero" width={1000} height={1000} className="w-full h-full object-cover" />
                                {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                    <FaBolt className="text-8xl text-black mb-4" />
                                    <h3 className="font-black text-3xl uppercase">Empowering<br />Students</h3>
                                </div> */}
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
                                To promote academic excellence, skills development, professional growth, and unity among electrical and electronic engineering students through learning, innovation, mentorship, extracurricular activities and industry engagement.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white text-black p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_black]">
                            <div className="w-12 h-12 bg-[#EAB308] rounded-full flex items-center justify-center border-2 border-black mb-6">
                                <FaLightbulb />
                            </div>
                            <h3 className="text-3xl font-black mb-4 uppercase">Our Vision</h3>
                            <p className="text-gray-700 text-lg font-medium leading-relaxed">
                                To be a leading student engineering association that supports innovative, competent, and ethically sound electrical and electronic engineers who positively impact society and industry.
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
                                    <p className="text-sm mt-6">Connecting Students Digitally</p>
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

            {/* 6. EXECUTIVE TEAM (Redesigned) */}
            <ExecutiveSection />

            {/* 7. GALLERY SECTION */}
            <GallerySection />

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


