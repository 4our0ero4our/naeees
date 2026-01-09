"use client";

import React from "react";
import { FaCalendarAlt, FaUser, FaArrowRight, FaBullhorn, FaGraduationCap, FaStar, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface AnnouncementCardProps {
    announcement: any;
    onClick: () => void;
}

export default function AnnouncementCard({ announcement, onClick }: AnnouncementCardProps) {
    // Category Icons/Colors
    const getCategoryStyles = (cat: string) => {
        switch (cat) {
            case "Spotlight": return { color: "text-purple-600", bg: "bg-purple-100", icon: <FaStar /> };
            case "Scholarship": return { color: "text-blue-600", bg: "bg-blue-100", icon: <FaGraduationCap /> };
            case "Ad": return { color: "text-orange-600", bg: "bg-orange-100", icon: <FaBullhorn /> };
            default: return { color: "text-green-600", bg: "bg-green-100", icon: <FaInfoCircle /> }; // Update
        }
    };

    const style = getCategoryStyles(announcement.category);
    const isUnread = !announcement.isRead;

    return (
        <motion.div
            layoutId={`card-${announcement._id}`}
            onClick={onClick}
            className={`group relative bg-white rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:shadow-xl ${isUnread ? 'border-red-500 shadow-red-100' : 'border-gray-100 hover:border-black'
                }`}
            whileHover={{ y: -5 }}
        >
            {/* Featured Image */}
            <div className="h-48 overflow-hidden bg-gray-100 relative">
                {announcement.featuredImage ? (
                    <img
                        src={announcement.featuredImage}
                        alt={announcement.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center opacity-20 ${style.bg}`}>
                        <span className={`text-6xl ${style.color}`}>{style.icon}</span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-white shadow-sm ${style.bg} ${style.color}`}>
                        {style.icon} {announcement.category}
                    </span>
                </div>

                {/* Unread Indicator */}
                {isUnread && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wide border-2 border-white shadow-sm animate-pulse">
                        New
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-3 uppercase tracking-wide">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FaUser /> {announcement.author?.fullName || "Admin"}</span>
                </div>

                <h3 className="text-xl font-black font-heading leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {announcement.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {announcement.content.replace(/<[^>]*>?/gm, '') /* Simple strip HTML for preview */}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-400">Read More</span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <FaArrowRight size={12} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
