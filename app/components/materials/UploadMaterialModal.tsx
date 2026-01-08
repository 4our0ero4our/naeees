
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaSave, FaTimes, FaFile, FaCheckCircle } from "react-icons/fa";
import CustomDropdown from "@/app/components/CustomDropdown";
import axios from "axios";

interface UploadMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function UploadMaterialModal({ isOpen, onClose, onSuccess }: UploadMaterialModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const initialFormState = {
        title: "",
        courseCode: "",
        lecturer: "",
        level: "",
        materialType: "",
        semester: "",
        description: "",
        visibility: ""
    };

    const [formData, setFormData] = useState(initialFormState);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormState);
            setSelectedFile(null);
            setError("");
            setSuccess(false);
            setIsUploading(false);
        }
    }, [isOpen]);

    const handleDropdownChange = (key: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleFileSelect = (file: File) => {
        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Invalid file type. Only PDF, DOC, DOCX, PPT, PPTX are allowed.");
            return;
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError("File size exceeds 10MB limit.");
            return;
        }

        setSelectedFile(file);
        setError("");
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!selectedFile) return setError("Please select a file to upload.");
        if (!formData.title || !formData.courseCode || !formData.level || !formData.materialType || !formData.semester) {
            return setError("Please fill in all required fields.");
        }

        setIsUploading(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append("file", selectedFile);
            uploadFormData.append("title", formData.title);
            uploadFormData.append("courseCode", formData.courseCode);
            uploadFormData.append("lecturer", formData.lecturer || "");
            uploadFormData.append("level", formData.level);
            uploadFormData.append("type", formData.materialType);
            uploadFormData.append("semester", formData.semester);
            uploadFormData.append("description", formData.description || "");
            uploadFormData.append("visibility", formData.visibility || "All");

            const response = await axios.post("/api/materials/upload", uploadFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 1500);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to upload material.");
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
                        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-[8px_8px_0px_0px_black] border-3 border-black flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b-2 border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                            <div>
                                <h2 className="font-heading font-black text-xl flex items-center gap-2">
                                    <FaCloudUploadAlt className="text-[#22C55E]" /> Upload Material
                                </h2>
                                <p className="text-gray-500 text-sm font-bold">Add new resource to the library</p>
                            </div>
                            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border-2 border-black rounded hover:bg-black hover:text-white transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            {error && (
                                <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
                                    <FaCheckCircle /> Material uploaded successfully! Closing...
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-2">Title *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Intro to Logic"
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-black focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-2">Course Code *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. EEE 311"
                                            value={formData.courseCode}
                                            onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                                            className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-black focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-2">Lecturer</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Dr. Aliyu"
                                            value={formData.lecturer}
                                            onChange={(e) => setFormData(prev => ({ ...prev, lecturer: e.target.value }))}
                                            className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-black focus:outline-none"
                                        />
                                    </div>

                                    <div className="z-30 relative">
                                        <CustomDropdown
                                            label="Level"
                                            options={["100L", "200L", "300L", "400L", "500L"]}
                                            value={formData.level}
                                            onChange={(v: string) => handleDropdownChange("level", v)}
                                        />
                                    </div>
                                    <div className="z-20 relative">
                                        <CustomDropdown
                                            label="Type"
                                            options={["Lecture Note", "Past Question", "Textbook", "Assignment"]}
                                            value={formData.materialType}
                                            onChange={(v: string) => handleDropdownChange("materialType", v)}
                                        />
                                    </div>
                                    <div className="z-10 relative">
                                        <CustomDropdown
                                            label="Semester"
                                            options={["First Semester", "Second Semester"]}
                                            value={formData.semester}
                                            onChange={(v: string) => handleDropdownChange("semester", v)}
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-bold uppercase mb-2">Description</label>
                                        <textarea
                                            placeholder="Brief description..."
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                            rows={3}
                                            className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-black focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* File Dropzone */}
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">File Upload *</label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileInputChange}
                                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                                        className="hidden"
                                    />
                                    {!selectedFile ? (
                                        <div
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-3 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${isDragging
                                                ? "border-[#22C55E] bg-green-50"
                                                : "border-gray-300 hover:border-[#22C55E] hover:bg-green-50"
                                                }`}
                                        >
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-md transition-all shrink-0">
                                                <FaCloudUploadAlt className="text-2xl text-gray-400 group-hover:text-[#22C55E]" />
                                            </div>
                                            <p className="font-bold text-gray-700 text-sm">Click to upload or drag & drop</p>
                                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, PPT (Max 10MB)</p>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-[#22C55E] rounded-xl p-3 bg-green-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border-2 border-[#22C55E]">
                                                    <FaFile className="text-[#22C55E]" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-800 text-sm truncate">{selectedFile.name}</p>
                                                    <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t-2 border-gray-100 bg-gray-50 flex-shrink-0">
                            <button
                                onClick={handleSubmit}
                                disabled={isUploading}
                                className="w-full bg-black text-white py-3 rounded-xl font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#22C55E] hover:shadow-[6px_6px_0px_0px_#22C55E] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <FaSave /> {isUploading ? "Uploading..." : "Upload Material"}
                            </button>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
