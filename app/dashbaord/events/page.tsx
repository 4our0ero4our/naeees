
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaTicketAlt, FaClock } from "react-icons/fa";
import Link from "next/link";
import CreateEventModal from "@/app/components/events/CreateEventModal";
import CustomAlert from "@/app/components/CustomAlert";

export default function EventsPage() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "super_admin";

    interface Event {
        _id: string;
        title: string;
        venue: string;
        date: string;
        time: string;
        image: string;
        type: string;
        price: number;
        status: string;
    }

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [alert, setAlert] = useState<any>(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/events");
            if (res.data.success) {
                setEvents(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="min-h-screen pb-20 w-full">
            {alert && (
                <CustomAlert
                    isOpen={alert.isOpen}
                    onClose={() => setAlert(null)}
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-black font-heading tracking-tight mb-2">Events & Activities</h1>
                    <p className="text-gray-500 font-bold max-w-xl">
                        Discover bootcamps, workshops, seminars, and social gatherings. Register to secure your spot.
                    </p>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-black text-white px-6 py-3 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_#22C55E] hover:shadow-[6px_6px_0px_0px_#22C55E] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                    >
                        <FaPlus /> Create Event
                    </button>
                )}
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-20 text-gray-400 font-bold">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 border-3 border-dashed border-gray-200 rounded-3xl">
                    <FaCalendarAlt className="text-4xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold text-lg">No upcoming events found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <Link href={`/dashbaord/events/${event._id}`} key={event._id} className="group block h-full">
                            <div className="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_black] group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_0px_black] transition-all h-full flex flex-col">
                                {/* Image / Placeholder */}
                                <div className="h-48 bg-gray-100 relative overflow-hidden border-b-3 border-black">
                                    {event.image ? (
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                            <FaCalendarAlt className="text-4xl text-gray-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-black shadow-sm ${event.type === 'free' ? 'bg-[#22C55E] text-white' : 'bg-yellow-400 text-black'
                                            }`}>
                                            {event.type === 'free' ? 'Free' : `₦${event.price}`}
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                                        <FaCalendarAlt className="text-[#22C55E]" /> {formatDate(event.date)}
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <FaClock /> {event.time}
                                    </div>

                                    <h3 className="text-xl font-black font-heading leading-tight mb-2 group-hover:text-[#22C55E] transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-6">
                                        <FaMapMarkerAlt className="text-gray-400" /> {event.venue}
                                    </div>

                                    <div className="mt-auto pt-4 border-t-2 border-gray-100 flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase">View Details</span>
                                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#22C55E] transition-colors">
                                            <FaTicketAlt size={12} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <CreateEventModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => {
                    fetchEvents();
                    setAlert({ isOpen: true, type: "success", title: "Success", message: "Event created successfully!" });
                }}
            />
        </div>
    );
}
