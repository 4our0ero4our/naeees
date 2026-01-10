
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimes, FaQrcode, FaDownload, FaArrowLeft, FaReceipt, FaUsers, FaImages, FaCloudUploadAlt, FaEye, FaEdit, FaSave } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CustomAlert from "@/app/components/CustomAlert";
import jsPDF from "jspdf";
import DigitalTicketCard from "@/app/components/events/DigitalTicketCard";
import ConfirmationModal from "@/app/components/ConfirmationModal";

export default function EventDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "super_admin";
    const isMember = (session?.user as any)?.membershipStatus === "member";

    // Data State
    const [event, setEvent] = useState<any>(null);
    const [registration, setRegistration] = useState<any>(null);
    const [attendees, setAttendees] = useState<any[]>([]);

    // UI State
    const [activeTab, setActiveTab] = useState("overview"); // overview, highlights, manage
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [alert, setAlert] = useState<any>(null);

    // Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editData, setEditData] = useState<any>({});

    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => { },
        isDangerous: false
    });

    // Receipt Upload State
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Gallery Upload State
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    // Gallery Selection State (Delete)
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
    const [isDeletingGallery, setIsDeletingGallery] = useState(false);

    // Admin Receipt View State
    const [viewReceiptUrl, setViewReceiptUrl] = useState<string | null>(null);

    // Gallery Lightbox State
    const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

    // --- Fetch Data ---
    const fetchEventDetails = async () => {
        try {
            const res = await axios.get(`/api/events/${id}`);
            if (res.data.success) {
                setEvent(res.data.data);
                setRegistration(res.data.registration);
            }
        } catch (error) {
            console.error("Fetch error", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendees = async () => {
        if (!isAdmin) return;
        try {
            const res = await axios.get(`/api/events/${id}/registrations`);
            if (res.data.success) {
                setAttendees(res.data.data);
            }
        } catch (error) {
            console.error("Fetch attendees error", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEventDetails();
            if (isAdmin) fetchAttendees();
        }
    }, [id, isAdmin]);


    // --- Actions ---

    // --- Actions ---

    const handleEditClick = () => {
        setEditData({
            title: event.title,
            description: event.description,
            venue: event.venue,
            date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
            time: event.time,
            type: event.type,
            price: event.price,
            memberDiscount: event.memberDiscount,
            status: event.status
        });
        setIsEditing(true);
    };

    const handleUpdateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await axios.patch(`/api/events/${id}`, editData);
            if (res.data.success) {
                setEvent(res.data.data);
                setIsEditing(false);
                setAlert({ isOpen: true, type: "success", title: "Success", message: "Event updated successfully." });
            }
        } catch (error: any) {
            setAlert({ isOpen: true, type: "error", title: "Error", message: error.response?.data?.message || "Failed to update event." });
        } finally {
            setSaving(false);
        }
    };

    const handleRegister = async () => {
        if (event.type === 'paid' && !receiptFile) {
            setIsUploadModalOpen(true);
            return;
        }

        setRegistering(true);
        try {
            const formData = new FormData();
            if (receiptFile) formData.append("paymentReceiptImage", receiptFile);

            const res = await axios.post(`/api/events/${id}/register`,
                event.type === 'paid' ? formData : {},
                { headers: event.type === 'paid' ? { "Content-Type": "multipart/form-data" } : {} }
            );

            if (res.data.success) {
                setAlert({ isOpen: true, type: "success", title: "Registered!", message: "You have successfully registered." });
                fetchEventDetails();
                setIsUploadModalOpen(false);
            }
        } catch (error: any) {
            setAlert({ isOpen: true, type: "error", title: "Failed", message: error.response?.data?.message || "Registration failed" });
        } finally {
            setRegistering(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingGallery(true);
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append("images", file));

        try {
            const res = await axios.post(`/api/events/${id}/gallery`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res.data.success) {
                // Force refresh data from server to ensure sync
                await fetchEventDetails();
                setAlert({ isOpen: true, type: "success", title: "Uploaded", message: "Gallery images uploaded successfully." });
            }
        } catch (error: any) {
            setAlert({ isOpen: true, type: "error", title: "Failed", message: "Gallery upload failed." });
        } finally {
            setUploadingGallery(false);
            if (galleryInputRef.current) galleryInputRef.current.value = "";
        }
    };

    const toggleImageSelection = (imgUrl: string) => {
        const newSet = new Set(selectedImages);
        if (newSet.has(imgUrl)) {
            newSet.delete(imgUrl);
        } else {
            newSet.add(imgUrl);
        }
        setSelectedImages(newSet);
    };

    const deleteSelectedImages = async () => {
        if (selectedImages.size === 0) return;

        setConfirmModal({
            isOpen: true,
            title: "Delete Images?",
            message: `Are you sure you want to delete ${selectedImages.size} images? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                setIsDeletingGallery(true);
                try {
                    const res = await axios.delete(`/api/events/${id}/gallery`, {
                        data: { imageUrls: Array.from(selectedImages) }
                    });

                    if (res.data.success) {
                        setAlert({ isOpen: true, type: "success", title: "Deleted", message: "Images deleted successfully." });
                        setSelectedImages(new Set());
                        fetchEventDetails();
                    }
                } catch (error) {
                    setAlert({ isOpen: true, type: "error", title: "Failed", message: "Failed to delete images." });
                } finally {
                    setIsDeletingGallery(false);
                }
            }
        });
    };

    const updateRegistrationStatus = async (regId: string, status: 'approved' | 'rejected') => {
        try {
            const res = await axios.patch(`/api/events/registrations/${regId}`, { status });
            if (res.data.success) {
                fetchAttendees(); // Refresh list
                setAlert({ isOpen: true, type: "success", title: "Updated", message: `Registration ${status}.` });
            }
        } catch (error) {
            setAlert({ isOpen: true, type: "error", title: "Error", message: "Failed to update status." });
        }
    };

    // --- Ticket Design ---
    // --- Ticket Design (Advanced PDF) ---
    // --- Ticket Design (Advanced PDF) ---
    // --- Ticket Design (Advanced PDF) ---
    const downloadTicket = async () => {
        const QRCode = await import("qrcode");

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [210, 80] // Slim Landscape Ticket
        });

        const width = 210;
        const height = 80;
        const fontTitle = "helvetica"; // Default bold font for tech look
        const primaryColor = [34, 197, 94]; // NAEEES Green
        const secondaryColor = [234, 179, 8]; // NAEEES Yellow
        const darkColor = [20, 20, 20]; // Almost Black

        // == STUB SECTION (Left) [0 - 60] ==
        doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.rect(0, 0, 60, height, "F");

        // Vertical Ticket Code
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("courier", "bold");

        // Manual rotation for text
        doc.text(registration.ticketCode, 48, 70, { angle: 90 });

        // -- QR CODE GENERATION --
        try {
            const qrData = JSON.stringify({
                id: registration.ticketCode,
                event: event.title,
                user: (session?.user as any).fullName
            });
            const qrDataUrl = await QRCode.toDataURL(qrData, { width: 100, margin: 1 });
            // Add QR Image to PDF (stub area)
            // Centered in 60mm width stub. Image size approx 25x25mm
            doc.addImage(qrDataUrl, "PNG", 17.5, 20, 25, 25);
        } catch (err) {
            console.error("QR Gen Error", err);
        }

        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(10);
        doc.text("01", 45, 15, { angle: 90 }); // Series Number


        // == MAIN BODY SECTION (Right) [60 - 210] ==
        // Background
        doc.setFillColor(255, 255, 255);
        doc.rect(60, 0, width - 60, height, "F");

        // -- DECORATION: Triangle / Geometric Patterns --

        // Top Right: Geometric Cube-like Structure
        // Drawing manual isometric-looking shapes
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.7);

        // Cube 1 (Small)
        const cubeX = 185, cubeY = 20;
        doc.line(cubeX, cubeY, cubeX + 5, cubeY - 3);
        doc.line(cubeX + 5, cubeY - 3, cubeX + 10, cubeY);
        doc.line(cubeX + 10, cubeY, cubeX + 5, cubeY + 3);
        doc.line(cubeX + 5, cubeY + 3, cubeX, cubeY);
        doc.line(cubeX, cubeY, cubeX, cubeY + 5);
        doc.line(cubeX + 5, cubeY + 3, cubeX + 5, cubeY + 8);
        doc.line(cubeX + 10, cubeY, cubeX + 10, cubeY + 5);

        // Cube 2 (Big Main)
        const mainCubeX = 175, mainCubeY = 55;
        // Front face
        doc.rect(mainCubeX, mainCubeY, 15, 15);
        // Side/Top (Simple 3D extrusion)
        doc.line(mainCubeX, mainCubeY, mainCubeX + 5, mainCubeY - 5);
        doc.line(mainCubeX + 15, mainCubeY, mainCubeX + 20, mainCubeY - 5);
        doc.line(mainCubeX + 20, mainCubeY - 5, mainCubeX + 5, mainCubeY - 5);
        doc.line(mainCubeX + 20, mainCubeY - 5, mainCubeX + 20, mainCubeY + 10);
        doc.line(mainCubeX + 20, mainCubeY + 10, mainCubeX + 15, mainCubeY + 15);
        // Inner detail
        doc.rect(mainCubeX + 4, mainCubeY + 4, 7, 7);

        // Bottom Right: Black Corner Block with X
        doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.path([
            { op: 'm', c: [width, height] },
            { op: 'l', c: [width - 40, height] }, // Bottom left of triangle
            { op: 'l', c: [width, height - 40] }, // Top right of triangle
            { op: 'l', c: [width, height] }
        ], "F");

        // Orange X (Cross) inside the black corner
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]); // Yellow/Orange
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("+", 195, 72);


        // -- DECORATION: Plus Pattern (Left of Title) --
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]); // Green
        doc.setFontSize(16);
        // 2x2 Grid of Pluses
        doc.text("+", 65, 30);
        doc.text("+", 72, 30);
        doc.text("+", 65, 37);


        // -- HEADER TITLE --
        doc.setTextColor(0, 0, 0);
        doc.setFont("courier", "bold"); // Monospace for 'TECH' feel
        doc.setFontSize(26);
        // Split title if too long
        const cleanTitle = event.title.toUpperCase();
        if (cleanTitle.length > 20) {
            doc.text(cleanTitle.substring(0, 20), 82, 25);
            doc.text(cleanTitle.substring(20, 35), 82, 35);
        } else {
            doc.text(cleanTitle, 80, 28);
        }


        // -- SUBTITLES (Date / Admit One) --
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]); // Green
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);

        doc.text(`${new Date(event.date).toLocaleDateString()}`, 80, 50);

        doc.setTextColor(0, 0, 0); // Black
        doc.text("ADMIT ONE", 130, 50);

        // -- ATTENDEE DATA --
        // Small tech lines details
        doc.setLineWidth(0.2);
        doc.line(80, 55, 100, 55);
        doc.line(130, 55, 150, 55);

        doc.setFont("courier", "normal");
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text("ATTENDEE ID:", 80, 65);
        doc.text("VENUE:", 130, 65);

        doc.setFont("courier", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text((session?.user as any).fullName.toUpperCase(), 80, 70);
        const venueText = doc.splitTextToSize(event.venue, 50);
        doc.text(venueText, 130, 70);


        // -- FOOTER BAR --
        doc.setFillColor(0, 0, 0);
        doc.rect(80, 75, 50, 2, "F"); // Horizontal thick bar
        doc.rect(135, 76, 2, 2, "F"); // Dot
        doc.rect(140, 76, 2, 2, "F"); // Dot

        // Divider Line (Dashed)
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.setLineDashPattern([3, 3], 0);
        doc.line(60, 0, 60, height);

        doc.save(`${event.title}_Ticket.pdf`);
    };

    // Calculate Price for display
    const finalPrice = event ? (event.type === 'free' ? 0 : (isMember ? event.price * (1 - event.memberDiscount / 100) : event.price)) : 0;

    if (loading || !event) return <div className="p-20 text-center font-bold text-gray-400">Loading...</div>;

    const isUpcoming = event.status === 'upcoming' || event.status === 'ongoing';

    return (
        <div className="min-h-screen pb-20 w-full font-sans">
            {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                isDangerous={confirmModal.isDangerous}
                confirmText={confirmModal.isDangerous ? "Delete" : "Confirm"}
            />

            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
                <Link href="/dashbaord/events" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black transition-colors">
                    <FaArrowLeft /> Back to Events
                </Link>

                {isAdmin && (
                    <button
                        onClick={handleEditClick}
                        className="bg-black text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        <FaEdit /> Edit Event
                    </button>
                )}
            </div>

            {/* TABS */}
            <div className="flex gap-6 border-b-2 border-gray-200 mb-8 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-3 font-bold uppercase text-sm tracking-wide border-b-4 transition-colors ${activeTab === 'overview' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab("highlights")}
                    className={`pb-3 font-bold uppercase text-sm tracking-wide border-b-4 transition-colors ${activeTab === 'highlights' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Event Highlights
                </button>
                {isAdmin && (
                    <button
                        onClick={() => { setActiveTab("manage"); fetchAttendees(); }}
                        className={`pb-3 font-bold uppercase text-sm tracking-wide border-b-4 transition-colors ${activeTab === 'manage' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        Manage Attendees
                    </button>
                )}
            </div>


            {/* === OVERVIEW TAB === */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Use Hero Image in Card */}
                        <div className="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_black]">
                            <div className="h-64 md:h-96 bg-gray-100 relative">
                                {event.image ? (
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <FaCalendarAlt size={64} />
                                    </div>
                                )}
                                <div className="absolute top-6 right-6">
                                    <span className={`px-4 py-2 rounded-full font-black uppercase tracking-wider border-2 border-black shadow-sm ${event.type === 'free' ? 'bg-[#22C55E] text-white' : 'bg-yellow-400 text-black'
                                        }`}>
                                        {event.type === 'free' ? 'Free Event' : `₦${event.price}`}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h1 className="text-4xl font-black font-heading tracking-tight mb-4">{event.title}</h1>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                                        <FaCalendarAlt className="text-gray-400 text-lg" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                                        <FaClock className="text-gray-400 text-lg" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 font-medium sm:col-span-2">
                                        <FaMapMarkerAlt className="text-gray-400 text-lg" />
                                        {event.venue}
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">About Event</h3>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="sticky top-6">
                            {/* IF REGISTERED AND APPROVED: SHOW DIGITAL TICKET */}
                            {registration && (registration.paymentStatus === 'approved' || registration.paymentStatus === 'free') ? (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black font-heading mb-2">My Ticket</h3>
                                    <DigitalTicketCard event={event} registration={registration} user={session?.user} />
                                    <button
                                        onClick={downloadTicket}
                                        className="w-full bg-black text-white py-3 rounded-xl font-bold border-2 border-black flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_gray]"
                                    >
                                        <FaDownload /> Download PDF
                                    </button>
                                </div>
                            ) : (
                                /* NOT REGISTERED or PENDING */
                                <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_black]">
                                    <h3 className="text-xl font-black font-heading mb-4">Registration</h3>
                                    {registration ? (
                                        <div className={`p-4 rounded-xl border-2 font-bold text-center flex flex-col items-center gap-2 ${registration.paymentStatus === 'pending_approval' ? 'bg-yellow-100 border-yellow-200 text-yellow-700' : 'bg-red-100 border-red-200 text-red-700'
                                            }`}>
                                            {registration.paymentStatus === 'pending_approval' && <><FaClock size={24} /> Approval Pending</>}
                                            {registration.paymentStatus === 'rejected' && <><FaTimes size={24} /> Registration Rejected</>}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {event.type === 'paid' && (
                                                <>
                                                    <div className="flex justify-between items-center py-2 border-b-2 border-gray-100">
                                                        <span className="font-medium text-gray-500">Ticket Price</span>
                                                        <span className="font-bold text-xl">₦{event.price}</span>
                                                    </div>
                                                    {isMember && event.memberDiscount > 0 && (
                                                        <div className="flex justify-between items-center py-2 border-b-2 border-gray-100 text-[#22C55E]">
                                                            <span className="font-bold text-xs uppercase">Member Discount</span>
                                                            <span className="font-bold text-xl">-{event.memberDiscount}%</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-center py-4 text-xl">
                                                        <span className="font-black">Total</span>
                                                        <span className="font-black">₦{finalPrice}</span>
                                                    </div>
                                                </>
                                            )}

                                            <button
                                                onClick={handleRegister}
                                                disabled={registering}
                                                className="w-full bg-[#22C55E] text-white py-4 rounded-xl font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_black] transition-all"
                                            >
                                                {registering ? "Processing..." : "Register Now"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* === HIGHLIGHTS TAB === */}
            {activeTab === 'highlights' && (
                <div className="bg-white border-3 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_black] min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black font-heading flex items-center gap-2"><FaImages className="text-[#EAB308]" /> Event Gallery</h2>
                        {isAdmin && (
                            <div className="flex gap-2">
                                {selectedImages.size > 0 && (
                                    <button
                                        onClick={deleteSelectedImages}
                                        disabled={isDeletingGallery}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg animate-pulse"
                                    >
                                        <FaTimes /> Delete ({selectedImages.size})
                                    </button>
                                )}
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    ref={galleryInputRef}
                                    className="hidden"
                                    onChange={handleGalleryUpload}
                                />
                                <button
                                    onClick={() => galleryInputRef.current?.click()}
                                    disabled={uploadingGallery}
                                    className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2 hover:bg-gray-800"
                                >
                                    <FaCloudUploadAlt /> {uploadingGallery ? "Uploading..." : "Upload Photos"}
                                </button>
                            </div>
                        )}
                    </div>

                    {event.galleryImages && event.galleryImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {event.galleryImages.map((img: string, idx: number) => {
                                const isSelected = selectedImages.has(img);
                                return (
                                    <div
                                        key={idx}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 relative group transition-all ${isSelected ? 'border-red-500 ring-4 ring-red-500/30 scale-95' : 'border-black'}`}
                                    >
                                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                                        {/* Admin Selection Overlay */}
                                        {isAdmin && (
                                            <div
                                                className={`absolute top-2 left-2 z-20 cursor-pointer p-2 rounded-full transition-all ${isSelected ? 'bg-red-500 text-white' : 'bg-white/50 text-transparent hover:bg-white hover:text-gray-400'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleImageSelection(img);
                                                }}
                                            >
                                                <div className={`w-4 h-4 rounded border-2 border-current flex items-center justify-center ${isSelected ? 'bg-white' : ''}`}>
                                                    {isSelected && <div className="w-2 h-2 bg-red-500 rounded-sm" />}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions Overlay */}
                                        <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-4 z-10 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            <a
                                                href={img}
                                                // target="_blank" // Open in new tab fallback
                                                // rel="noopener noreferrer"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    try {
                                                        const response = await fetch(img);
                                                        const blob = await response.blob();
                                                        const url = window.URL.createObjectURL(blob);
                                                        const link = document.createElement('a');
                                                        link.href = url;
                                                        // Extract filename from URL or default
                                                        const filename = img.split('/').pop() || `event_image_${idx}.jpg`;
                                                        link.download = filename;
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                        window.URL.revokeObjectURL(url);
                                                    } catch (err) {
                                                        console.error("Download failed, opening in new tab", err);
                                                        window.open(img, '_blank');
                                                    }
                                                }}
                                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-[#EAB308] hover:scale-110 transition-all cursor-pointer shadow-lg"
                                                title="Download Image"
                                            >
                                                <FaDownload size={20} />
                                            </a>
                                            <button
                                                onClick={() => setSelectedGalleryImage(img)}
                                                className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all shadow-lg border-2 border-white cursor-pointer"
                                                title="View Fullscreen"
                                            >
                                                <FaEye size={20} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                <FaImages size={32} />
                            </div>
                            {isUpcoming ? (
                                <p className="text-gray-500 font-bold text-lg">Event is yet to hold.</p>
                            ) : (
                                <p className="text-gray-500 font-bold text-lg">Pics not uploaded yet.</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* === MANAGE TAB (ADMIN) === */}
            {activeTab === 'manage' && isAdmin && (
                <div className="bg-white border-3 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_black]">
                    <div className="p-6 border-b-2 border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h2 className="text-xl font-black font-heading flex items-center gap-2"><FaUsers className="text-blue-500" /> Attendees ({attendees.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-500 font-bold">
                                <tr>
                                    <th className="p-4">Student</th>
                                    <th className="p-4">Matric No</th>
                                    <th className="p-4">Reg Date</th>
                                    <th className="p-4">Payment</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {attendees.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-bold">No registrations yet.</td></tr>
                                ) : (
                                    attendees.map(att => (
                                        <tr key={att._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-bold">{att.user?.fullName || "Unknown"}</td>
                                            <td className="p-4 text-sm font-mono text-gray-600">{att.user?.matricNumber}</td>
                                            <td className="p-4 text-sm text-gray-500">{new Date(att.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${att.paymentStatus === 'approved' || att.paymentStatus === 'free' ? 'bg-green-100 text-green-700' :
                                                    att.paymentStatus === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {att.paymentStatus.replace('_', ' ')}
                                                </span>
                                                {att.paymentReceipt && (
                                                    <button onClick={() => setViewReceiptUrl(att.paymentReceipt)} className="ml-2 text-blue-500 underline text-xs font-bold">View Receipt</button>
                                                )}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                {att.paymentStatus !== 'approved' && (
                                                    <button
                                                        onClick={() => updateRegistrationStatus(att._id, 'approved')}
                                                        className="bg-[#22C55E] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm hover:brightness-110"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {att.paymentStatus !== 'rejected' && (
                                                    <button
                                                        onClick={() => updateRegistrationStatus(att._id, 'rejected')}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm hover:brightness-110"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Receipt Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsUploadModalOpen(false)}>
                    <div className="bg-white max-w-md w-full p-6 rounded-2xl border-3 border-black shadow-xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-black font-heading mb-2">Upload Payment Receipt</h3>
                        <p className="text-sm text-gray-600 mb-4 font-medium">Please upload a screenshot of your payment to complete registration.</p>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                            className="w-full border-2 border-gray-200 rounded-xl p-3 mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button onClick={handleRegister} disabled={!receiptFile || registering} className="px-6 py-2 bg-black text-white rounded-lg font-bold border-2 border-black hover:bg-gray-800">
                                {registering ? "Uploading..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Event Modal */}
            {isEditing && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsEditing(false)}
                >
                    <div
                        className="bg-white max-w-2xl w-full p-6 rounded-2xl border-3 border-black shadow-xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-black font-heading mb-6">Edit Event</h2>
                        <form onSubmit={handleUpdateEvent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0 min-h-[100px]"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={editData.date}
                                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Time</label>
                                    <input
                                        type="time"
                                        value={editData.time}
                                        onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Venue</label>
                                <input
                                    type="text"
                                    value={editData.venue}
                                    onChange={(e) => setEditData({ ...editData, venue: e.target.value })}
                                    className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                                    <select
                                        value={editData.type}
                                        onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                    >
                                        <option value="free">Free</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (₦)</label>
                                    <input
                                        type="number"
                                        value={editData.price}
                                        onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                        disabled={editData.type === 'free'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                                    <select
                                        value={editData.status}
                                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Member Discount (%)</label>
                                <input
                                    type="number"
                                    value={editData.memberDiscount}
                                    onChange={(e) => setEditData({ ...editData, memberDiscount: Number(e.target.value) })}
                                    className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black focus:ring-0"
                                />
                            </div>


                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-black text-white px-8 py-3 rounded-xl font-bold border-2 border-black hover:bg-gray-800 transition-colors flex items-center gap-2"
                                >
                                    {saving ? "Saving..." : <><FaSave /> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Receipt Modal (Admin) */}
            {viewReceiptUrl && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setViewReceiptUrl(null)}>
                    <div className="relative max-w-3xl w-full max-h-[90vh] bg-black rounded-xl overflow-hidden shadow-2xl">
                        <img src={viewReceiptUrl} alt="Receipt" className="w-full h-full object-contain" />
                        <button onClick={() => setViewReceiptUrl(null)} className="absolute top-4 right-4 bg-white rounded-full p-2 text-black hover:bg-gray-200">
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

            {/* Gallery Lightbox Modal */}
            <AnimatePresence>
                {selectedGalleryImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedGalleryImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedGalleryImage} alt="Gallery Fullscreen" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border-4 border-black" />

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedGalleryImage(null)}
                                className="absolute top-4 right-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full p-3 transition-colors backdrop-blur-md border border-white/20"
                            >
                                <FaTimes size={24} />
                            </button>

                            {/* Download Button in Lightbox */}
                            <a
                                href={selectedGalleryImage}
                                onClick={async (e) => {
                                    e.preventDefault();
                                    try {
                                        const response = await fetch(selectedGalleryImage);
                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        const filename = selectedGalleryImage.split('/').pop() || 'image.jpg';
                                        link.download = filename;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        window.URL.revokeObjectURL(url);
                                    } catch (err) {
                                        window.open(selectedGalleryImage, '_blank');
                                    }
                                }}
                                className="absolute bottom-6 right-6 bg-[#EAB308] text-black px-6 py-2 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2 border-2 border-white"
                            >
                                <FaDownload /> Download
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
