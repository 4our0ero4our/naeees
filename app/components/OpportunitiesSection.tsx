"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaLongArrowAltRight, FaLongArrowAltLeft, FaRegCommentDots } from "react-icons/fa";

const opportunities = [
  {
    id: 1,
    category: "Internships",
    title: "Real-World Experience",
    description: "Access exclusive internship postings from top engineering firms and industrial partners directly through our portal.",
    image: "/Images/Students in industry.jpg", // Replace with: Student in industry/office
    color: "bg-[#EAB308]",
  },
  {
    id: 2,
    category: "Scholarships",
    title: "Financial Support",
    description: "Stay updated on departmental, national, and international scholarship opportunities available for high-performing students.",
    image: "/Images/Students Graduating Celebration.jpg", // Replace with: Student holding certificate/smiling
    color: "bg-[#22C55E]",
  },
  {
    id: 3,
    category: "Competitions",
    title: "Challenge Yourself",
    description: "Form teams and register for engineering hackathons, robotics competitions, and debate championships.",
    image: "/Images/Student hackathon.jpg", // Replace with: Students building robot/project
    color: "bg-[#000000]",
    textColor: "text-white",
  },
  {
    id: 4,
    category: "Updates",
    title: "Stay Informed",
    description: "Never miss a lecture change, departmental memo, or urgent announcement with our centralized update feed.",
    image: "/Images/Students looking at notice board.jpg", // Replace with: Students looking at notice board
    color: "bg-[#EAB308]",
  },
];

const OpportunitiesSection = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="w-full bg-[#F8F9FA] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* --- LEFT COLUMN: Sticky Header --- */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 flex flex-col items-start space-y-6">
              <div className="inline-block bg-[#EAB308] border-2 border-black px-4 py-1 rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_black] transform -rotate-1">
                OPPORTUNITIES
              </div>
              <h2 className="font-heading font-black text-5xl lg:text-7xl text-black leading-[0.9]">
                Beyond the<br />Classroom
              </h2>
              <p className="text-xl text-gray-700 font-medium leading-relaxed max-w-md">
                The portal connects you to real-world opportunities that enhance your career readiness, ensuring you graduate with more than just a degree.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }} // <--- Added this line
                viewport={{ once: true }} // Ensures it doesn't disappear when you scroll away
                transition={{ delay: 0.5, duration: 0.5 }}
                className="pt-4"
              >
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 border-2 border-transparent hover:bg-gray-900 hover:scale-105 shadow-[6px_6px_0px_0px_#22C55E] hover:shadow-[3px_3px_0px_0px_#22C55E] hover:translate-y-[3px]"
                >
                  <FaArrowRight className="w-5 h-5" />
                  View All Opportunities
                </Link>
              </motion.div>

            </div>
          </div>

          {/* --- RIGHT COLUMN: Zig-Zag Content List --- */}
          <div className="lg:col-span-7 flex flex-col gap-20 relative pt-12 lg:pt-0">

            {opportunities.map((item, index) => (
              <OpportunityCard key={item.id} item={item} index={index} />
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

// --- Sub-Component for Individual Cards ---
const OpportunityCard = ({ item, index }: { item: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // LOGIC:
  // Even Index (0, 2): Text Left | Image Right (Matches inspiration top row)
  // Odd Index (1, 3): Image Left | Text Right (Matches inspiration middle row)
  const isEven = index % 2 === 0;

  // SHAPE LOGIC:
  // If Image is on Right (Even): Curve the Left side (facing text). Flat Right side.
  // If Image is on Left (Odd): Curve the Right side (facing text). Flat Left side.
  const shapeClass = isEven
    ? "rounded-l-full rounded-r-3xl" // Semi-circle pointing Left <|
    : "rounded-r-full rounded-l-3xl"; // Semi-circle pointing Right |>

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      // Flex direction logic matches layout description above
      className={`relative flex flex-col lg:items-center gap-6 lg:gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* --- TEXT BLOCK --- */}
      <div className={`w-full lg:w-1/2 flex flex-col ${isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
        <h3 className="font-heading font-black text-3xl sm:text-4xl text-black mb-4 leading-tight">
          {item.title}
        </h3>
        <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-sm">
          {item.description}
        </p>

        {/* Arrow pointing to image */}
        <div className={`hidden lg:block mt-4 text-4xl text-[#EAB308]`}>
          {isEven ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft />}
        </div>
      </div>

      {/* --- IMAGE BLOCK --- */}
      <div className="w-full lg:w-1/2 relative group shrink-0">
        <div className={`relative h-[320px] w-full overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_black] transition-transform duration-500 group-hover:translate-y-[-5px] group-hover:shadow-[12px_12px_0px_0px_#22C55E] ${shapeClass}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Badge - Position changes based on curve to avoid getting cut off */}
          <div className={`absolute top-6 ${isEven ? 'right-6' : 'left-6'} ${item.color} border-2 border-black px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider z-10 ${item.textColor || 'text-black'}`}>
            {item.category}
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default OpportunitiesSection;