"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBookOpen, 
  FaChartLine, 
  FaCalendarAlt, 
  FaComments, 
  FaBriefcase,
  FaArrowRight 
} from "react-icons/fa";

// --- DATA DEFINITION ---
const featuresData = [
  {
    id: "resources",
    title: "Access Academic Resources",
    description: "Easily download lecture notes, past examination questions, and curated study materials organized by course, level, and semester.",
    icon: <FaBookOpen className="w-6 h-6" />,
    image: "/Images/Access Academic Resources.png",
    color: "bg-[#22C55E]", // Green
  },
  {
    id: "progress",
    title: "Track Your Academic Progress",
    description: "Use the built-in CGPA tracker to calculate semester results, monitor cumulative performance, and simulate future outcomes.",
    icon: <FaChartLine className="w-6 h-6" />,
    image: "/Images/Academic Tracking.png",
    color: "bg-[#EAB308]", // Yellow
  },
  {
    id: "events",
    title: "Register for Events & Trainings",
    description: "Stay informed about workshops and conferences. Members get automatic discounts on technical training registrations.",
    icon: <FaCalendarAlt className="w-6 h-6" />,
    image: "/Images/Register for Events and Trainings.png",
    color: "bg-[#22C55E]", 
  },
  {
    id: "discuss",
    title: "Engage in Academic Discussions",
    description: "Participate in course-based discussions where students ask questions, share insights, and support one another.",
    icon: <FaComments className="w-6 h-6" />,
    image: "/Images/Academic Tracking Image.png",
    color: "bg-[#EAB308]",
  },
  {
    id: "opportunities",
    title: "Discover Opportunities",
    description: "Explore internship openings, scholarships, competitions, and official announcements tailored specifically for EEE students.",
    icon: <FaBriefcase className="w-6 h-6" />,
    image: "/Images/Discover Opportunities.png",
    color: "bg-[#22C55E]",
  },
];

const FeatureSection = () => {
  // We manage the order of items in state. 
  // Index 2 (the middle one) is always the "Active" one visually.
  const [items, setItems] = useState(featuresData);

  // This function swaps the hovered item with the center item (index 2)
  const handleHover = (hoveredIndex: number) => {
    // The center index in a 5-item array is 2
    const centerIndex = 2;

    // If we hover the one already in the center, do nothing
    if (hoveredIndex === centerIndex) return;

    // Create a copy of the array
    const newItems = [...items];

    // Swap the content of the hovered index and the center index
    const temp = newItems[centerIndex];
    newItems[centerIndex] = newItems[hoveredIndex];
    newItems[hoveredIndex] = temp;

    setItems(newItems);
  };

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- Section Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <div className="inline-block bg-[#EAB308] border-2 border-black px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_black] transform -rotate-2">
            Core Features
          </div>
          <h2 className="font-heading font-black text-4xl lg:text-5xl text-black leading-tight">
            What the NAEEES<br />Digital Portal Offers
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Built as a full digital academic environment, the portal provides students with the tools and resources they need to succeed academically and professionally.
          </p>
        </motion.div>

        {/* --- DESKTOP INTERACTIVE LAYOUT (Hidden on mobile) --- */}
        <div className="hidden xl:grid grid-cols-12 gap-6 h-[600px] items-center">
          
          {/* LEFT COLUMN (Items 0 and 1) */}
          <div className="col-span-3 flex flex-col gap-6 h-full justify-center">
            {items.slice(0, 2).map((feature, idx) => (
              <SideCard 
                key={feature.id} 
                feature={feature} 
                index={idx} // Actual index in current array (0 or 1)
                onHover={handleHover} 
                direction="left"
              />
            ))}
          </div>

          {/* CENTER COLUMN (Item 2 - Active) */}
          <div className="col-span-6 h-full">
            <CenterCard feature={items[2]} />
          </div>

          {/* RIGHT COLUMN (Items 3 and 4) */}
          <div className="col-span-3 flex flex-col gap-6 h-full justify-center">
            {items.slice(3, 5).map((feature, idx) => (
              <SideCard 
                key={feature.id} 
                feature={feature} 
                index={idx + 3} // Actual index in current array (3 or 4)
                onHover={handleHover} 
                direction="right"
              />
            ))}
          </div>
        </div>

        {/* --- MOBILE/TABLET LAYOUT (Grid) --- */}
        <div className="grid xl:hidden grid-cols-1 md:grid-cols-2 gap-6">
          {featuresData.map((feature, i) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_black] flex flex-col gap-4"
            >
              <div className={`w-12 h-12 ${feature.color} border-2 border-black rounded-full flex items-center justify-center shrink-0`}>
                <div className="text-black">{feature.icon}</div>
              </div>
              <div>
                <h3 className="font-black text-xl text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- SUB-COMPONENTS ---

// The smaller cards on the side
const SideCard = ({ 
  feature, 
  index, 
  onHover,
  direction 
}: { 
  feature: any, 
  index: number, 
  onHover: (i: number) => void,
  direction: "left" | "right"
}) => {
  return (
    <motion.div 
      layoutId={feature.id}
      layout // Allow smooth layout transitions
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseEnter={() => onHover(index)}
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        boxShadow: "8px 8px 0px 0px black",
        transition: { duration: 0.2 }
      }}
      className="group bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_black] cursor-pointer h-[240px] flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <motion.div 
          className={`w-12 h-12 ${feature.color} border-2 border-black rounded-full flex items-center justify-center`}
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          <div className="text-black">{feature.icon}</div>
        </motion.div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <FaArrowRight className="w-5 h-5 text-black" />
        </div>
      </div>
      
      <div>
        <h3 className="font-black text-lg text-black mb-2 line-clamp-2 leading-tight">
          {feature.title}
        </h3>
        {/* Truncate description on side cards to keep them clean */}
        <p className="text-gray-500 text-xs font-medium line-clamp-3">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

// The Large Center Card
const CenterCard = ({ feature }: { feature: any }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={feature.id}
        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 2 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full h-full bg-black border-4 border-black rounded-[2.5rem] p-8 shadow-[16px_16px_0px_0px_#22C55E] relative overflow-hidden flex flex-col justify-end"
      >
        
        {/* Background Decor */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-64 h-64 bg-[#22C55E] rounded-full blur-[80px] opacity-20 pointer-events-none"
        />

        {/* Image Container */}
        <motion.div 
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[350px] lg:h-[350px]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
           {/* Decorative Circle behind image */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full ${feature.color} border-4 border-black/20`} />
           
           <Image 
             src={feature.image} 
             alt={feature.title}
             fill
             className="object-contain z-10 drop-shadow-2xl"
           />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-3">
             <div className={`w-10 h-10 ${feature.color} border-2 border-white rounded-full flex items-center justify-center`}>
                <div className="text-black">{feature.icon}</div>
             </div>
             <h3 className="font-black text-2xl lg:text-3xl text-white tracking-tight">
               {feature.title}
             </h3>
          </div>
          <p className="text-gray-200 text-base lg:text-lg font-medium leading-relaxed max-w-xl">
            {feature.description}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeatureSection;