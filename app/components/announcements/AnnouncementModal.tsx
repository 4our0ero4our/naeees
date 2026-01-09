"use client";

import React from "react";
import { FaTimes, FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementModalProps {
    isOpen: boolean;
    onClose: () => void;
    announcement: any;
}

export default function AnnouncementModal({ isOpen, onClose, announcement }: AnnouncementModalProps) {
    if (!isOpen || !announcement) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    layoutId={`card-${announcement._id}`}
                    className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative my-10"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full p-2 backdrop-blur-md transition-all border border-white/30"
                    >
                        <FaTimes size={20} />
                    </button>

                    {/* Featured Image Header */}
                    <div className="h-64 sm:h-80 relative">
                        {announcement.featuredImage ? (
                            <img
                                src={announcement.featuredImage}
                                alt={announcement.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-gray-800 to-black flex items-center justify-center">
                                <span className="text-white/20 font-black text-6xl uppercase tracking-widest text-center px-4">{announcement.category}</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="flex items-center gap-3 text-sm font-bold mb-3 opacity-80">
                                <span className="bg-[#EAB308] text-black px-2 py-0.5 rounded text-xs uppercase tracking-wide flex items-center gap-1">
                                    <FaTag size={10} /> {announcement.category}
                                </span>
                                <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black font-heading leading-tight shadow-black drop-shadow-lg">
                                {announcement.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 sm:p-10">
                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-8">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                <FaUser />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Posted by {announcement.author?.fullName || "Admin"}</p>
                                <p className="text-xs text-gray-500 font-medium">Department Update</p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {/* Render content - if we had a rich text editor we'd use dangerouslySetInnerHTML */}
                            <p className="whitespace-pre-wrap">{announcement.content}</p>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
