"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaShareAlt,
  FaArrowRight,
  FaBullhorn,
  FaCheck
} from "react-icons/fa";
// --- MOCK DATA ---
import axios from "axios";
// ... imports

// --- ANIMATION VARIANTS ---
const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 }
  }
};

// Helper: Get Card & Badge styles based on Category
const getCategoryStyles = (cat: string) => {
  const category = cat?.toLowerCase() || "";

  if (category.includes("competition") || category.includes("hackathon") || category.includes("exam")) {
    return { color: "bg-white text-black", cardColor: "bg-black text-white" }; // Black Card
  }
  if (category.includes("career") || category.includes("fair") || category.includes("social")) {
    return { color: "bg-[#EAB308]", cardColor: "bg-white" }; // Yellow Badge
  }
  // Default (Workshop, Seminar, Class, etc.)
  return { color: "bg-[#22C55E]", cardColor: "bg-white" }; // Green Badge
};



const EventsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events?limit=3");
        if (res.data.success) {
          const mapped = res.data.data.slice(0, 3).map((evt: any) => ({
            id: evt._id,
            title: evt.title,
            category: evt.type,
            date: new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase(),
            time: evt.time,
            location: evt.venue,
            image: evt.image || "/Images/hero-bg.jpg",
            description: evt.description,
            link: `/dashbaord/events/${evt._id}`,
            ...getCategoryStyles(evt.type)
          }));
          setEvents(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch landing events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 border-t-4 border-black relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* --- HEADER --- */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left"
        >
          <div className="max-w-2xl">
            <motion.div variants={fadeInUp}>
              <div className="inline-block bg-[#EAB308] border-2 border-black px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_black] mb-4 transform -rotate-1">
                UPCOMING EVENTS
              </div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-heading font-black text-4xl sm:text-6xl text-black leading-[1.1]">
              Don't Miss Out on<br /> Campus Action.
            </motion.h2>
          </div>

          <motion.div variants={fadeInUp}>
            <Link
              href="dashbaord/events"
              className="group flex items-center gap-2 font-bold text-lg border-b-2 border-black pb-1 hover:text-[#22C55E] hover:border-[#22C55E] transition-all"
            >
              View Full Calendar <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* --- EVENTS GRID --- */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          // Increased margin-bottom (mb-32) to separate from CTA
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10"
        >
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-[500px] bg-gray-100 rounded-2xl animate-pulse border-2 border-gray-200"></div>
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <p className="text-gray-400 font-bold text-xl">No upcoming events found.</p>
            </div>
          )}
        </motion.div>

        {/* --- FEATURE REQUEST CTA --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, type: "spring" }}
          className="bg-black text-white border-4 border-black rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[12px_12px_0px_0px_#22C55E]"
        >
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#22C55E] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex w-20 h-20 bg-[#EAB308] border-2 border-white rounded-full items-center justify-center shrink-0 shadow-[0px_0px_15px_rgba(234,179,8,0.5)]">
                <FaBullhorn className="text-4xl text-black" />
              </div>
              <div>
                <h3 className="font-heading font-black text-3xl md:text-4xl mb-2 text-white">
                  Organizing an Event?
                </h3>
                <p className="text-gray-400 font-medium max-w-lg text-lg">
                  Does your organization have an upcoming seminar, workshop, or competition? Request to have it featured on the official portal.
                </p>
              </div>
            </div>

            {/* Link to whatsapp */}
            <Link
              href="https://wa.me/+2348112110878"
              className="bg-white text-black px-8 py-4 rounded-xl font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white] hover:translate-y-[2px] transition-all whitespace-nowrap"
            >
              Request Feature
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// --- SUB-COMPONENT: EVENT CARD ---
const EventCard = ({ event }: { event: any }) => {
  const [copied, setCopied] = useState(false);

  // Check if this is the "Black" card
  const isBlackCard = event.cardColor.includes("bg-black");

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(`https://naeeesfutminna.vercel.app/${event.link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      // Applied logic: If Black Card -> Green Shadow. If White Card -> Black Shadow.
      className={`group flex flex-col h-full ${event.cardColor} border-3 border-black rounded-2xl overflow-hidden transition-all duration-300 ${isBlackCard
        ? "shadow-[8px_8px_0px_0px_#22C55E] hover:shadow-[12px_12px_0px_0px_#22C55E]"
        : "shadow-[8px_8px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_#22C55E]"
        }`}
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden border-b-3 border-black" style={{ minHeight: '224px' }}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={event.id === 1}
        />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white border-2 border-black px-3 py-1 rounded-lg font-black text-center shadow-[4px_4px_0px_0px_black] z-10">
          <span className="block text-xs uppercase text-gray-500 tracking-wider">DATE</span>
          <span className="block text-xl leading-none text-black">{event.date}</span>
        </div>

        {/* Category Badge */}
        <div className={`absolute top-4 right-4 ${event.color} border-2 border-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10`}>
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className={`font-heading font-black text-2xl mb-3 leading-tight line-clamp-2 ${isBlackCard ? 'text-white' : 'text-black'}`}>
          {event.title}
        </h3>

        {/* Meta Data */}
        <div className="space-y-2 mb-4">
          <div className={`flex items-center gap-2 text-sm font-bold ${isBlackCard ? 'text-gray-300' : 'text-gray-600'}`}>
            <FaClock className={isBlackCard ? "text-[#EAB308]" : "text-[#22C55E]"} />
            {event.time}
          </div>
          <div className={`flex items-center gap-2 text-sm font-bold ${isBlackCard ? 'text-gray-300' : 'text-gray-600'}`}>
            <FaMapMarkerAlt className={isBlackCard ? "text-[#EAB308]" : "text-[#22C55E]"} />
            {event.location}
          </div>
        </div>

        <p className={`text-sm font-medium leading-relaxed mb-6 line-clamp-3 ${isBlackCard ? 'text-gray-400' : 'text-gray-600'}`}>
          {event.description}
        </p>

        {/* Action Row (Push to bottom) */}
        <div className={`mt-auto flex items-center gap-3 pt-4 border-t-2 ${isBlackCard ? 'border-gray-800' : 'border-gray-100'}`}>
          {/* View Details Button */}
          <Link
            href={event.link}
            className={`flex-1 text-center py-3 rounded-lg font-bold text-sm border-2 transition-all ${isBlackCard
              ? "bg-white text-black border-white hover:bg-[#EAB308] hover:border-[#EAB308]"
              : "bg-black text-white border-black hover:bg-gray-800"
              }`}
          >
            View Details
          </Link>

          {/* Share Button with Animation */}
          <button
            onClick={handleShare}
            className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all relative overflow-hidden ${isBlackCard
              ? "border-white text-white hover:bg-white/20"
              : "border-black text-black hover:bg-gray-100"
              }`}
            title="Copy Link"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <FaCheck className="text-[#22C55E]" />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <FaShareAlt />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventsSection;