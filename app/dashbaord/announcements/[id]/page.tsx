"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaCalendar, FaUser, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AnnouncementDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const [announcement, setAnnouncement] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                const res = await axios.get(`/api/announcements/${id}`);
                if (res.data.success) {
                    setAnnouncement(res.data.data);

                    // Mark as read
                    if (!res.data.data.isRead) {
                        try {
                            await axios.post(`/api/announcements/${id}/read`);
                        } catch (err) {
                            console.error("Failed to mark read", err);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black"></div>
        </div>
    );

    if (!announcement) return <div>Not Found</div>;

    return (
        <div className="min-h-screen bg-white text-gray-900 pb-20">
            {/* --- HERO HEADER --- */}
            <div className="relative h-[50vh] md:h-[60vh] bg-gray-900 overflow-hidden">
                {announcement.featuredImage && (
                    <img
                        src={announcement.featuredImage}
                        alt={announcement.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent"></div>

                <div className="absolute top-6 left-6 z-10 flex gap-3">
                    <button
                        onClick={() => router.back()}
                        className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white hover:text-black transition-all"
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        onClick={() => router.push(`/dashbaord/announcements/create?id=${id}`)}
                        className="bg-white/20 backdrop-blur-md text-white px-4 py-3 rounded-full hover:bg-white hover:text-black transition-all font-bold text-sm uppercase tracking-wider"
                    >
                        Edit
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-16 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1.5 rounded uppercase tracking-widest inline-block shadow-lg">
                            {announcement.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight text-white mix-blend-normal drop-shadow-md">
                            {announcement.title}
                        </h1>

                        <div className="flex items-center gap-6 text-sm font-bold text-black">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                                    <FaUser className="text-xs" />
                                </div>
                                <span>{announcement.author?.fullName || announcement.author?.name || "Administrator"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendar className="text-gray-500" />
                                <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- CONTENT BODY --- */}
            <div className="max-w-3xl mx-auto px-6 md:px-0 -mt-10 relative z-10">
                <div
                    className="prose prose-xl max-w-none text-gray-800 leading-loose announcement-content font-sans"
                    dangerouslySetInnerHTML={{ __html: announcement.content }}
                />
            </div>

            {/* Custom Styles for Content Images */}
            <style jsx global>{`
                .announcement-content img {
                    width: 100%;
                    border-radius: 16px;
                    margin: 2rem 0;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                }
                .announcement-content p {
                    margin-bottom: 1.5em;
                }
                .announcement-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
                .announcement-content ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1em; }
            `}</style>
        </div>
    );
}
