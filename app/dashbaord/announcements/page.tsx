"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaPlus, FaSearch, FaFilter, FaBullhorn } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementCard from "@/app/components/announcements/AnnouncementCard";
// We will create these next
import { useRouter } from "next/navigation";
import AnnouncementModal from "@/app/components/announcements/AnnouncementModal";
// CreateAnnouncementModal removed in favor of /create page

export default function AnnouncementsPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "super_admin";

    // Data State
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filter State
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    // Modal State
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
    // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Removed

    // Fetch Data
    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const params: any = { page, limit: 12 };
            if (category !== "All") params.category = category;
            if (search) params.search = search;

            const res = await axios.get("/api/announcements", { params });
            if (res.data.success) {
                setAnnouncements(res.data.data);
                setTotalPages(res.data.pagination.pages);
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            fetchAnnouncements();
        }, 300);
        return () => clearTimeout(timer);
    }, [page, category, search]);

    // Handle Open (Mark as Read)
    const handleOpenAnnouncement = async (item: any) => {
        setSelectedAnnouncement(item);

        // Optimistically update read status locally
        if (!item.isRead) {
            const updatedList = announcements.map(a =>
                a._id === item._id ? { ...a, isRead: true } : a
            );
            setAnnouncements(updatedList);

            // Call API silently
            try {
                await axios.post(`/api/announcements/${item._id}/read`);
            } catch (err) {
                console.error("Failed to mark read", err);
            }
        }
    };

    return (
        <div className="font-sans min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    {/* Title is handled by Layout, but we can add breadcrumbs or extra info if needed */}
                </div>

                {isAdmin && (
                    <button
                        onClick={() => router.push("/dashbaord/announcements/create")}
                        className="bg-black text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                    >
                        <FaPlus /> Create Announcement
                    </button>
                )}
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                    {["All", "Spotlight", "Scholarship", "Update", "Ad"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setCategory(cat); setPage(1); }}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors border-2 ${category === cat
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
                    ))}
                </div>
            ) : announcements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {announcements.map((item) => (
                        <AnnouncementCard
                            key={item._id}
                            announcement={item}
                            onClick={() => router.push(`/dashbaord/announcements/${item._id}`)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <FaBullhorn size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400">No announcements found.</h3>
                    <p className="text-gray-400">Check back later for updates.</p>
                </div>
            )}

            {/* Pagination (Simple) */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-10 h-10 rounded-lg font-bold flex items-center justify-center transition-colors ${page === i + 1 ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            <AnnouncementModal
                isOpen={!!selectedAnnouncement}
                onClose={() => setSelectedAnnouncement(null)}
                announcement={selectedAnnouncement}
            />
        </div>
    );
}
