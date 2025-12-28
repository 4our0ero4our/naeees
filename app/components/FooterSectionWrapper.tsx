"use client";

import React from "react";
import Link from "next/link";
import { FaShieldAlt, FaBolt, FaArrowRight, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaHeart } from "react-icons/fa";

// --- 9. TRUST & AUTHORITY SECTION ---
const TrustSection = () => {
  return (
    <section className="w-full bg-white py-24 px-4 border-t-4 border-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-[#EAB308]/20 text-9xl font-black select-none pointer-events-none rotate-12">NAEEES</div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Animated Badge/Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#EAB308] rounded-full border-4 border-black shadow-[6px_6px_0px_0px_black] mb-10 animate-bounce">
          <FaShieldAlt className="text-4xl text-black" />
        </div>

        <h2 className="font-heading font-black text-4xl sm:text-6xl text-black mb-8 uppercase tracking-tight leading-none">
          Built for NAEEES.<br />
          <span className="text-white bg-black px-4 inline-block transform -rotate-2 mt-2 shadow-[4px_4px_0px_0px_#22C55E]">Powered by Students.</span>
        </h2>

        <p className="text-xl sm:text-2xl text-gray-700 font-medium leading-relaxed max-w-3xl mx-auto">
          This portal is officially developed to support NAEEES activities and empower Electrical and Electronics Engineering students with digital tools that enhance learning and engagement.
        </p>

        {/* Decorative 'Official Seal' text */}
        <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-black"></div>
            <div className="font-mono text-sm font-black text-black tracking-widest uppercase">
            EST. 2024 • OFFICIAL DEPARTMENTAL PORTAL
            </div>
            <div className="h-1 w-12 bg-black"></div>
        </div>
      </div>
    </section>
  );
};

// --- 10. FINAL CALL-TO-ACTION (Strong Close) ---
const FinalCTA = () => {
  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] border-t-4 border-black relative">
      <div className="max-w-[1200px] mx-auto">
        
        {/* The Card Container - BLACK Background with GREEN Shadow */}
        <div className="relative bg-black rounded-[2.5rem] border-4 border-black p-8 sm:p-20 text-center shadow-[16px_16px_0px_0px_#22C55E] overflow-hidden group hover:translate-y-[-4px] hover:shadow-[20px_20px_0px_0px_#22C55E] transition-all duration-300">
          
          {/* Abstract Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            
            <div className="inline-block bg-[#EAB308] border-2 border-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest text-black mb-2">
                Ready to Launch?
            </div>

            <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-white leading-[1] drop-shadow-lg">
              Join the NAEEES<br />
              <span className="text-[#22C55E]">Digital Campus</span> Today
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed">
              Access academic resources, track your progress, connect with peers, and stay informed — all from one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full justify-center">
              {/* Primary Button - GREEN */}
              <Link 
                href="/register" 
                className="bg-[#22C55E] text-black px-10 py-5 rounded-full font-black text-xl border-3 border-black shadow-[6px_6px_0px_0px_white] transition-all duration-300 hover:scale-105 hover:shadow-[10px_10px_0px_0px_white] flex items-center justify-center gap-3"
              >
                Create Student Account <FaBolt className="text-black animate-pulse" />
              </Link>

              {/* Secondary Button - WHITE OUTLINE */}
              <Link 
                href="/login" 
                className="bg-transparent text-white px-10 py-5 rounded-full font-bold text-xl border-3 border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
              >
                Login to Portal <FaArrowRight />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// --- 11. FOOTER (Professional & Simple) ---
const Footer = () => {
  return (
    <footer className="w-full bg-black text-white border-t-4 border-black pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 border-b border-gray-800 pb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 pr-8">
            <h3 className="font-heading font-black text-4xl text-white mb-6 tracking-tighter">
              NAEEES<span className="text-[#22C55E]">.</span>
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm mb-8 text-lg">
              The official digital environment for the National Association of Electrical and Electronics Engineering Students.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[FaTwitter, FaLinkedin, FaInstagram, FaGithub].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-gray-900 border-2 border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-[#EAB308] hover:border-black hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#22C55E] transition-all duration-300">
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-[#EAB308] mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Lecture Notes', 'Past Questions', 'CGPA Calculator', 'Software Library'].map(item => (
                <li key={item}><a href="#" className="hover:text-white hover:underline decoration-[#22C55E] underline-offset-4 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-[#EAB308] mb-6 uppercase tracking-wider text-sm">Community</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Events', 'Forum', 'Exco Members', 'News Feed'].map(item => (
                <li key={item}><a href="#" className="hover:text-white hover:underline decoration-[#22C55E] underline-offset-4 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-black text-[#EAB308] mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#22C55E] rounded-full"></span> <a href="#" className="hover:text-white">Help & Support</a></li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#22C55E] rounded-full"></span> <a href="#" className="hover:text-white">Submit Feedback</a></li>
              <li className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800 text-sm">
                <span className="block text-[#EAB308] font-bold text-xs uppercase mb-1">Email Us</span>
                naeees@futminna.edu.ng
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-gray-500">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} NAEEES Digital Portal. 
            <span className="hidden md:inline">|</span> 
            <span className="flex items-center gap-1">Made with <FaHeart className="text-[#EAB308]" /> by 404.</span>
          </p>
          <div className="flex gap-8">
             <a href="#" className="hover:text-[#22C55E] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[#22C55E] transition-colors">Terms of Service</a>
          </div>
        </div>

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