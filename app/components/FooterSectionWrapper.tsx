"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { FaShieldAlt, FaBolt, FaArrowRight, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaHeart } from "react-icons/fa";

// --- ANIMATION VARIANTS ---

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 } 
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

const widthGrow: Variants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
        width: "3rem", // w-12 equivalent
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

// --- 9. TRUST & AUTHORITY SECTION ---
const TrustSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="w-full bg-white py-24 px-4 border-t-4 border-black relative overflow-hidden">
      {/* Background Decor - Continuous Rotation */}
      <motion.div 
        animate={{ rotate: [12, 15, 12], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 text-[#EAB308]/20 text-9xl font-black select-none pointer-events-none origin-center"
      >
        NAEEES
      </motion.div>
      
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        
        {/* Animated Badge/Icon */}
        <motion.div variants={scaleIn} className="inline-block mb-10">
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-24 h-24 bg-[#EAB308] rounded-full border-4 border-black shadow-[6px_6px_0px_0px_black]"
            >
                <FaShieldAlt className="text-4xl text-black" />
            </motion.div>
        </motion.div>

        <motion.h2 
            variants={fadeInUp}
            className="font-heading font-black text-4xl sm:text-6xl text-black mb-8 uppercase tracking-tight leading-none"
        >
          Built for NAEEES.<br />
          <motion.span 
            variants={scaleIn}
            className="text-white bg-black px-4 inline-block transform -rotate-2 mt-2 shadow-[4px_4px_0px_0px_#22C55E]"
          >
              Powered by Students.
          </motion.span>
        </motion.h2>

        <motion.p 
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-gray-700 font-medium leading-relaxed max-w-3xl mx-auto"
        >
          This portal is officially developed to support NAEEES activities and empower Electrical and Electronics Engineering students with digital tools that enhance learning and engagement.
        </motion.p>

        {/* Decorative 'Official Seal' text */}
        <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center gap-4">
            <motion.div variants={widthGrow} className="h-1 bg-black"></motion.div>
            <div className="font-mono text-sm font-black text-black tracking-widest uppercase">
            EST. {new Date().getFullYear()} • OFFICIAL DEPARTMENTAL PORTAL
            </div>
            <motion.div variants={widthGrow} className="h-1 bg-black"></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- 10. FINAL CALL-TO-ACTION (Strong Close) ---
const FinalCTA = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] border-t-4 border-black relative">
      <div className="max-w-[1200px] mx-auto">
        
        {/* The Card Container */}
        <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative bg-black rounded-[2.5rem] border-4 border-black p-8 sm:p-20 text-center shadow-[16px_16px_0px_0px_#22C55E] overflow-hidden group hover:shadow-[24px_24px_0px_0px_#22C55E] hover:-translate-y-2 transition-all duration-500"
        >
          
          {/* Abstract Grid Background - Slow Pan */}
          <motion.div 
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            
            <motion.div variants={scaleIn}>
                <div className="inline-block bg-[#EAB308] border-2 border-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest text-black mb-2 shadow-[0px_0px_15px_rgba(234,179,8,0.5)]">
                    Ready to Launch?
                </div>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-white leading-[1] drop-shadow-lg">
              Join the NAEEES<br />
              <span className="text-[#22C55E]">Digital Campus</span> Today
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed">
              Access academic resources, track your progress, connect with peers, and stay informed — all from one platform.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 mt-8 w-full justify-center">
              {/* Primary Button - GREEN */}
              <Link href="/register" className="group">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#22C55E] text-black px-10 py-5 rounded-full font-black text-xl border-3 border-black shadow-[6px_6px_0px_0px_white] flex items-center justify-center gap-3 transition-all"
                  >
                     Create Student Account <FaBolt className="text-black group-hover:animate-pulse" />
                  </motion.div>
              </Link>

              {/* Secondary Button - WHITE OUTLINE */}
              <Link href="/login" className="group">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent text-white px-10 py-5 rounded-full font-bold text-xl border-3 border-white flex items-center justify-center gap-3 transition-colors"
                  >
                    Login to Portal <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

// --- 11. FOOTER (Animated Columns) ---
const Footer = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <footer ref={containerRef} className="w-full bg-black text-white border-t-4 border-black pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 border-b border-gray-800 pb-16"
        >
          
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 pr-8">
            <h3 className="font-heading font-black text-4xl text-white mb-6 tracking-tighter">
              NAEEES<span className="text-[#22C55E]">.</span>
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm mb-8 text-lg">
              The official digital environment for the National Association of Electrical and Electronics Engineering Students.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[FaTwitter, FaLinkedin, FaInstagram, FaGithub].map((Icon, i) => (
                <motion.a 
                    key={i} 
                    href="#" 
                    whileHover={{ y: -5, backgroundColor: "#EAB308", color: "#000000" }}
                    className="w-12 h-12 text-black bg-[#EAB308] border-black border-2 rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#22C55E]"
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <h4 className="font-black text-[#EAB308] mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Lecture Notes', 'Past Questions', 'CGPA Calculator', 'Software Library'].map((item, i) => (
                <motion.li key={item} whileHover={{ x: 5, color: "#ffffff" }} className="cursor-pointer">
                    <span className="hover:underline decoration-[#22C55E] underline-offset-4">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <h4 className="font-black text-[#EAB308] mb-6 uppercase tracking-wider text-sm">Community</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Events', 'Forum', 'Exco Members', 'News Feed'].map((item, i) => (
                <motion.li key={item} whileHover={{ x: 5, color: "#ffffff" }} className="cursor-pointer">
                    <span className="hover:underline decoration-[#22C55E] underline-offset-4">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <h4 className="font-black text-[#EAB308] mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span> <a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span> <a href="#" className="hover:text-white transition-colors">Submit Feedback</a></li>
              <motion.li 
                whileHover={{ scale: 1.02 }}
                className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800 text-sm cursor-default"
              >
                <span className="block text-[#EAB308] font-bold text-xs uppercase mb-1">Email Us</span>
                naeees@futminna.edu.ng
              </motion.li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-gray-500"
        >
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} NAEEES Digital Portal. 
            <span className="hidden md:inline">|</span> 
            <span className="flex items-center gap-1">Made with <FaHeart className="text-[#EAB308] animate-bounce" /> by 404.</span>
          </p>
          <div className="flex gap-8">
             <a href="#" className="hover:text-[#22C55E] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[#22C55E] transition-colors">Terms of Service</a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

// Exporting a wrapper to use them all at once
const FooterSectionWrapper = () => {
  return (
    <>
      <TrustSection />
      <FinalCTA />
      <Footer />
    </>
  );
};

export default FooterSectionWrapper;