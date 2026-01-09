"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaEye, FaEyeSlash, FaCloudUploadAlt, FaSave, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "@/app/components/CustomDropdown";

// Basic Component for the Preview Mode (reusing logic from Card/Modal visually)
const PreviewView = ({ title, category, featuredImage, content, authorName }: any) => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-4xl mx-auto my-10">
        {/* Simple visualization of what it looks like */}
        <div className="h-64 sm:h-80 relative bg-gray-100">
            {featuredImage ? (
                <img
                    src={URL.createObjectURL(featuredImage)}
                    className="w-full h-full object-cover"
                    alt="Preview"
                />
            ) : (
                <div className="w-full h-full bg-linear-to-br from-gray-800 to-black flex items-center justify-center">
                    <span className="text-white/20 font-black text-6xl uppercase tracking-widest px-4">{category}</span>
                </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-3xl sm:text-4xl font-black font-heading leading-tight shadow-black drop-shadow-lg">{title || "Untitled Announcement"}</h1>
            </div>
        </div>
        <div className="p-10">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content || "Start typing your content..."}
            </div>
        </div>
    </div>
);

export default function CreateAnnouncementPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Update");
    const [visibility, setVisibility] = useState("Global");
    const [content, setContent] = useState("");
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [showSettings, setShowSettings] = useState(true);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [content]);

    const handleSubmit = async (status: "Draft" | "Published") => {
        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("category", category);
            formData.append("visibility", visibility);
            formData.append("status", status);
            if (featuredImage) {
                formData.append("featuredImage", featuredImage);
            }

            const res = await axios.post("/api/announcements", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data.success) {
                router.push("/dashbaord/announcements");
            }
        } catch (error) {
            console.error("Failed to create", error);
            alert("Failed to create announcement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-20">
            {/* Top Navigation Bar */}
            <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
                    >
                        <FaArrowLeft />
                    </button>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
                        {isPreview ? "Preview Mode" : "Editing Mode"}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${isPreview ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {isPreview ? <><FaEyeSlash /> Edit</> : <><FaEye /> Preview</>}
                    </button>

                    <div className="h-6 w-px bg-gray-300 mx-2"></div>

                    <button
                        onClick={() => handleSubmit("Draft")}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg font-bold text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit("Published")}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg font-bold text-sm bg-black text-white hover:bg-gray-800 transition-colors shadow-lg active:scale-95 flex items-center gap-2"
                    >
                        Publish <FaPaperPlane className="text-xs" />
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">

                {isPreview ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <PreviewView
                            title={title}
                            category={category}
                            featuredImage={featuredImage}
                            content={content}
                        />
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">

                        {/* 1. Header Image (Minimal) */}
                        <div
                            className={`group relative h-48 sm:h-64 rounded-3xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 ${featuredImage ? 'border-none' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {featuredImage ? (
                                <>
                                    <img
                                        src={URL.createObjectURL(featuredImage)}
                                        className="w-full h-full object-cover"
                                        alt="Cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm">
                                        Click to change cover
                                    </div>
                                </>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-4xl mb-2 opacity-50" />
                                    <span className="font-bold text-sm uppercase tracking-wide">Add Cover Image</span>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={e => setFeaturedImage(e.target.files?.[0] || null)}
                            />
                        </div>

                        {/* 2. Metadata Controls (Dropdowns) */}
                        {showSettings && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group">
                                <div className="absolute -top-3 left-4 bg-[#F8F9FA] px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Settings
                                </div>
                                <CustomDropdown
                                    label="Category"
                                    options={["Update", "Spotlight", "Scholarship", "Ad"]}
                                    value={category}
                                    onChange={setCategory}
                                    placeholder="Select Category"
                                />
                                <CustomDropdown
                                    label="Visibility"
                                    options={["Global", "MembersOnly"]}
                                    value={visibility}
                                    onChange={setVisibility}
                                    placeholder="Select Audience"
                                />
                            </div>
                        )}

                        {/* 3. The Editor (Notion-style) */}
                        <div className="space-y-4">
                            {/* Title Input */}
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Untitled Announcement"
                                className="w-full bg-transparent border-none p-0 text-4xl sm:text-5xl font-black font-heading text-black placeholder-gray-300 focus:ring-0 focus:outline-none leading-tight"
                            />

                            {/* Content Textarea */}
                            <textarea
                                ref={textareaRef}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Type something..."
                                className="w-full bg-transparent border-none p-0 text-lg sm:text-xl text-gray-700 placeholder-gray-300 focus:ring-0 focus:outline-none resize-none leading-relaxed min-h-[300px]"
                            ></textarea>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
