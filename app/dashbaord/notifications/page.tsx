"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaCheck, FaBullhorn, FaCalendarAlt, FaBookOpen } from "react-icons/fa";

interface Notification {
    _id: string;
    type: string;
    title: string;
    message: string;
    referenceId: string;
    isRead: boolean;
    createdAt: string;
}

const FilterTab = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${active
                ? "bg-black text-white shadow-lg"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
    >
        {label}
    </button>
);

export default function NotificationsPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/notifications");
            if (res.data.success) {
                setNotifications(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notif: Notification) => {
        if (!notif.isRead) {
            try {
                // Mark as read API call
                await axios.patch(`/api/notifications/${notif._id}/read`);
                // Update local state to reflect read status immediately
                setNotifications(prev =>
                    prev.map(n => n._id === notif._id ? { ...n, isRead: true } : n)
                );
            } catch (err) {
                console.error("Failed to mark read", err);
            }
        }

        // Redirect based on type
        if (notif.type === "event") {
            router.push(`/dashbaord/events`); // Could go to specific ID if detail page exists
        } else if (notif.type === "announcement") {
            router.push(`/dashbaord/announcements`);
        } else if (notif.type === "material") {
            router.push(`/dashbaord/materials`);
        } else {
            // Fallback
        }
    };

    const markAllRead = async () => {
        // Optional feature: Mark all displayed as read
        // For now, implementing one by one in UI or loop
        // User request didn't strictly specify "Mark All Read" button but it's good UX.
        // Will stick to single click logic for now as requested: "Click on the notifications and it'd take them..."
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'event': return <FaCalendarAlt className="text-blue-500" />;
            case 'announcement': return <FaBullhorn className="text-orange-500" />;
            case 'material': return <FaBookOpen className="text-green-500" />;
            default: return <FaBell className="text-gray-500" />;
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === "All") return true;
        if (filter === "Unread") return !n.isRead;
        if (filter === "Events") return n.type === "event";
        if (filter === "Announcements") return n.type === "announcement";
        if (filter === "Materials") return n.type === "material";
        return true;
    });

    return (
        <div className="space-y-6">
            {/* Header & Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Notifications</h2>
                    <p className="text-sm text-gray-500">Stay updated with latest activities.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {["All", "Unread", "Events", "Announcements", "Materials"].map(f => (
                        <FilterTab key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-3xl p-2 shadow-sm min-h-[400px]">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading notifications...</div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <FaBell className="text-4xl mb-4 opacity-20" />
                        <p>No notifications found.</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <AnimatePresence>
                            {filteredNotifications.map((notif) => (
                                <motion.div
                                    key={notif._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`group p-4 mb-2 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-gray-200 hover:shadow-md flex gap-4 items-start ${notif.isRead ? "bg-white opacity-60 hover:opacity-100" : "bg-blue-50/50"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.isRead ? "bg-gray-100" : "bg-white shadow-sm"
                                        }`}>
                                        {getIcon(notif.type)}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className={`font-bold text-sm ${notif.isRead ? "text-gray-700" : "text-black"}`}>
                                                {notif.title}
                                            </h4>
                                            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">
                                                {new Date(notif.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                                            {notif.message}
                                        </p>
                                        {!notif.isRead && (
                                            <span className="inline-block mt-2 text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
