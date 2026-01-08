
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaSave, FaTimes, FaImage, FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import CustomDropdown from "@/app/components/CustomDropdown";
import axios from "axios";

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateEventModal({ isOpen, onClose, onSuccess }: CreateEventModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const initialFormState = {
        title: "",
        description: "",
        venue: "",
        date: "",
        time: "",
        type: "free",
        price: "0",
        memberDiscount: "0", // Percentage
        audience: "all",
        targetDepartment: ""
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormState);
            setSelectedFile(null);
            setPreviewUrl(null);
            setError("");
            setSuccess(false);
            setIsUploading(false);
        }
    }, [isOpen]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("Image size exceeds 5MB limit.");
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.title || !formData.date || !formData.venue) {
            return setError("Please fill in key details (Title, Date, Venue).");
        }

        setIsUploading(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append("title", formData.title);
            uploadFormData.append("description", formData.description);
            uploadFormData.append("venue", formData.venue);
            uploadFormData.append("date", formData.date);
            uploadFormData.append("time", formData.time);
            uploadFormData.append("type", formData.type);
            uploadFormData.append("price", formData.price);
            uploadFormData.append("memberDiscount", formData.memberDiscount);
            uploadFormData.append("audience", formData.audience);
            if (formData.targetDepartment) uploadFormData.append("targetDepartment", formData.targetDepartment);

            if (selectedFile) {
                uploadFormData.append("image", selectedFile);
            }

            const res = await axios.post("/api/events", uploadFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 1500);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to create event.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-[8px_8px_0px_0px_black] border-3 border-black flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b-2 border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                            <h2 className="font-heading font-black text-xl flex items-center gap-2">
                                <FaCalendarAlt className="text-[#22C55E]" /> Create Event
                            </h2>
                            <button onClick={onClose} className="hover:bg-gray-200 p-2 rounded-full"><FaTimes /></button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm font-bold">{error}</div>}
                            {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg border border-green-200 text-sm font-bold flex items-center gap-2"><FaCheckCircle /> Event Created!</div>}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="text-xs font-bold uppercase block mb-1">Event Title *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Annual Tech Summit"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-xs font-bold uppercase block mb-1">Description</label>
                                    <textarea
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium focus:border-black outline-none h-24"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Event details..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Date */}
                                    <div>
                                        <label className="text-xs font-bold uppercase block mb-1">Date *</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none"
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    {/* Time */}
                                    <div>
                                        <label className="text-xs font-bold uppercase block mb-1">Time *</label>
                                        <input
                                            type="time"
                                            required
                                            className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none"
                                            value={formData.time}
                                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Venue */}
                                <div>
                                    <label className="text-xs font-bold uppercase block mb-1">Venue *</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-10 border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none"
                                            value={formData.venue}
                                            onChange={e => setFormData({ ...formData, venue: e.target.value })}
                                            placeholder="e.g. Lecture Theater 1"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Type */}
                                    <div>
                                        <label className="text-xs font-bold uppercase block mb-1">Type</label>
                                        <select
                                            className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none bg-white"
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="free">Free</option>
                                            <option value="paid">Paid</option>
                                        </select>
                                    </div>
                                    {/* Price */}
                                    <div>
                                        <label className="text-xs font-bold uppercase block mb-1">Price (NGN)</label>
                                        <input
                                            type="number"
                                            disabled={formData.type === 'free'}
                                            className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {formData.type === 'paid' && (
                                    <div>
                                        <label className="text-xs font-bold uppercase block mb-1">Member Discount (%)</label>
                                        <input
                                            type="number"
                                            min="0" max="100"
                                            className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none"
                                            value={formData.memberDiscount}
                                            onChange={e => setFormData({ ...formData, memberDiscount: e.target.value })}
                                            placeholder="e.g. 50"
                                        />
                                        <p className="text-[10px] text-gray-500 mt-1">Percentage off for registered members.</p>
                                    </div>
                                )}

                                {/* Audience */}
                                <div>
                                    <label className="text-xs font-bold uppercase block mb-1">Audience</label>
                                    <select
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none bg-white"
                                        value={formData.audience}
                                        onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                    >
                                        <option value="all">All Students</option>
                                        <option value="members">Members Only</option>
                                        <option value="department">Specific Department</option>
                                    </select>
                                </div>

                                {formData.audience === 'department' && (
                                    <div>
                                        <label className="text-xs font-bold uppercase block mb-1">Target Department</label>
                                        <input
                                            type="text"
                                            className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-black outline-none"
                                            value={formData.targetDepartment}
                                            onChange={e => setFormData({ ...formData, targetDepartment: e.target.value })}
                                            placeholder="e.g. Civil Engineering"
                                        />
                                    </div>
                                )}

                                {/* Image Upload */}
                                <div>
                                    <label className="text-xs font-bold uppercase block mb-1">Cover Image</label>
                                    {!selectedFile ? (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#22C55E] transition-all"
                                        >
                                            <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
                                            <span className="text-sm font-bold text-gray-500">Upload Image</span>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-xl overflow-hidden border-2 border-black group">
                                            <img src={previewUrl!} alt="Preview" className="w-full h-48 object-cover" />
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 text-red-600"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t-2 border-gray-100 bg-gray-50 flex-shrink-0">
                            <button
                                onClick={handleSubmit}
                                disabled={isUploading}
                                className="w-full bg-black text-white py-3 rounded-xl font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#22C55E] hover:shadow-[6px_6px_0px_0px_#22C55E] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                            >
                                {isUploading ? "Creating..." : "Create Event"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
