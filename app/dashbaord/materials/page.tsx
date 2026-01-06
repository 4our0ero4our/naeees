"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaFilePdf, FaFileWord, FaDownload, FaEye, FaTrash, FaEdit } from "react-icons/fa";
import CustomDropdown from "@/app/components/CustomDropdown";
import { useSession } from "next-auth/react";
import axios from "axios";
import CustomAlert from "@/app/components/CustomAlert";
import { fixCloudinaryUrl } from "@/app/lib/utils/cloudinary-url";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } } // Faster stagger
};

// Filter options
const filterOptions = {
    level: ["100L", "200L", "300L", "400L", "500L"],
    semester: ["First Semester", "Second Semester"],
    courseCode: ["EEE 311", "CPE 202", "EEE 501", "EEE 201", "CPE 301"],
    type: ["Lecture Note", "Past Question", "Textbook", "Assignment"]
};

export default function MaterialsPage() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "super_admin";
    const [materials, setMaterials] = useState<any[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true); // Renamed for clarity
    const [isFiltering, setIsFiltering] = useState(false); // New state for filter loading
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [confirmationModalData, setConfirmationModalData] = useState<any>(null);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [detailsModalData, setDetailsModalData] = useState<any>(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        level: "",
        semester: "",
        courseCode: "",
        type: ""
    });

    /**
     * Debounce Search Term
     */
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    /**
     * Trigger "Filtering" loader when filters or search changes
     */
    useEffect(() => {
        setIsFiltering(true);
        const timer = setTimeout(() => {
            setIsFiltering(false);
        }, 500); // Artificial delay to show loader and prevent jitter
        return () => clearTimeout(timer);
    }, [filters, debouncedSearchTerm]);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    /**
     * Use effect to fetch materials
     */
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                setIsInitialLoading(true);
                const response = await axios.get("/api/materials");
                if (response.data.success) {
                    setMaterials(response.data.data || []);
                }
            } catch (error) {
                console.error("Error fetching materials:", error);
            } finally {
                setIsInitialLoading(false);
            }
        };
        fetchMaterials();
    }, []);

    // Apply filters + search to materials list (normalize/trim for consistency)
    // Memoized to prevent re-calculation on every render
    const filteredMaterials = useMemo(() => {
        return materials.filter((item: any) => {
            const norm = (v: any) => (typeof v === 'string' ? v.toLowerCase().trim() : "");
            const normSearch = norm(debouncedSearchTerm);

            const typeFilter = norm(filters.type);
            const levelFilter = norm(filters.level);
            const semesterFilter = norm(filters.semester);
            const courseCodeFilter = norm(filters.courseCode);

            // Treat "all" as no filter for any dropdown
            if (typeFilter && typeFilter !== "all" && norm(item.type) !== typeFilter) return false;
            if (levelFilter && levelFilter !== "all" && norm(item.level) !== levelFilter) return false;

            // Robust semester check: match if one includes the other to handle "First" vs "First Semester"
            if (semesterFilter && semesterFilter !== "all") {
                const itemSemester = norm(item.semester);
                if (!itemSemester.includes(semesterFilter) && !semesterFilter.includes(itemSemester)) {
                    return false;
                }
            }

            if (courseCodeFilter && courseCodeFilter !== "all" && norm(item.courseCode) !== courseCodeFilter) return false;

            // Expanded Search: Title, Course Code, Lecturer, Uploaded By
            if (normSearch) {
                const titleMatch = norm(item.title).includes(normSearch);
                const codeMatch = norm(item.courseCode).includes(normSearch);
                const lecturerMatch = norm(item.lecturer).includes(normSearch);
                const uploaderMatch = item.uploadedBy ? norm(item.uploadedBy.fullName).includes(normSearch) : false;

                if (!titleMatch && !codeMatch && !lecturerMatch && !uploaderMatch) return false;
            }

            return true;
        });
    }, [materials, filters, debouncedSearchTerm]);

    const handleFileDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/materials/${id}`);
            if (response.data.success) {
                setMaterials(materials.filter((item: any) => item._id !== id));
            }
        } catch (error) {
            console.error("Error deleting material:", error);
        }
    };

    const openConfirmationModal = (id: string) => {
        setConfirmationModalData({ id, title: materials.find((item: any) => item._id === id)?.title || "Material" });
        setConfirmationModalOpen(true);
    };

    const openDetailsModal = (item: any) => {
        setDetailsModalData(item);
        setDetailsModalOpen(true);
    };

    return (
        <div className="space-y-8 w-full pb-20">
            {/* --- FILTERS SECTION --- */}
            <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_black]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-end">

                    {/* Search - Span 3 */}
                    <div className="md:col-span-2 xl:col-span-4">
                        <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-700">Search</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                <FaSearch className="text-gray-400 text-lg" />
                            </div>
                            <input
                                type="text"
                                placeholder="e.g. Circuit Theory"
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pl-12 font-bold focus:border-black focus:outline-none transition-colors hover:border-gray-400 text-black placeholder:text-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Type - Span 2 */}
                    <div className="xl:col-span-2">
                        <CustomDropdown
                            label="Type"
                            options={filterOptions.type}
                            value={filters.type}
                            onChange={(value: string) => handleFilterChange("type", value)}
                        />
                    </div>

                    {/* Level - Span 2 */}
                    <div className="xl:col-span-2">
                        <CustomDropdown
                            label="Level"
                            options={filterOptions.level}
                            value={filters.level}
                            onChange={(value: string) => handleFilterChange("level", value)}
                        />
                    </div>

                    {/* Semester - Span 2 */}
                    <div className="xl:col-span-2">
                        <CustomDropdown
                            label="Semester"
                            options={filterOptions.semester}
                            value={filters.semester}
                            onChange={(value: string) => handleFilterChange("semester", value)}
                        />
                    </div>

                    {/* Course Code - Span 2 (Replacing the Filter button for better layout) */}
                    <div className="xl:col-span-2">
                        <CustomDropdown
                            label="Course Code"
                            options={filterOptions.courseCode}
                            value={filters.courseCode}
                            onChange={(value: string) => handleFilterChange("courseCode", value)}
                        />
                    </div>
                </div>
            </div>

            {/* --- CONFIRMATION MODAL --- */}
            {confirmationModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setConfirmationModalOpen(false)}>
                    <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_black] w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h2 className="font-heading font-black text-xl leading-tight mb-4 text-black">Confirm Deletion</h2>
                        <p className="text-gray-600 font-bold mb-4">Are you sure you want to delete <span className="font-black">"{confirmationModalData.title}"</span>? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button className="bg-black text-white px-4 py-2 rounded-lg font-bold text-sm border-2 border-black hover:bg-gray-800 transition-colors" onClick={() => setConfirmationModalOpen(false)}>Cancel</button>
                            <button className="bg-red-500 text-black px-4 py-2 rounded-lg font-bold text-sm border-2 border-black hover:bg-red-600 transition-colors" onClick={() => {
                                handleFileDelete(confirmationModalData.id);
                                setConfirmationModalOpen(false);
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DETAILS MODAL --- */}
            <AnimatePresence>
                {detailsModalOpen && detailsModalData && (
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setDetailsModalOpen(false)}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] w-full max-w-2xl h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Scrollable Content */}
                        <div className="overflow-y-auto flex-1 p-4 sm:p-6 min-h-0 custom-scrollbar">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4 sm:mb-6 bg-white pb-2">
                                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-black flex items-center justify-center text-xl sm:text-2xl shrink-0 ${(detailsModalData.cloudinaryFormat || "").toLowerCase().includes('pdf') ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {(detailsModalData.cloudinaryFormat || "").toLowerCase().includes('pdf') ? <FaFilePdf /> : <FaFileWord />}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="font-heading font-black text-base sm:text-lg md:text-xl leading-tight text-black mb-1 line-clamp-2">
                                            {detailsModalData.title}
                                        </h2>
                                        <span className="bg-[#EAB308] border-2 border-black px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_black] inline-block">
                                            {detailsModalData.courseCode || "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setDetailsModalOpen(false)}
                                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-100 text-black transition-colors font-black text-lg sm:text-xl shrink-0 ml-2"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">Level</p>
                                    <p className="font-bold text-black text-sm sm:text-base">{detailsModalData.level || "N/A"}</p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">Semester</p>
                                    <p className="font-bold text-black text-sm sm:text-base">{detailsModalData.semester || "N/A"}</p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">Type</p>
                                    <p className="font-bold text-black text-sm sm:text-base">{detailsModalData.type || "N/A"}</p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">Lecturer</p>
                                    <p className="font-bold text-black text-sm sm:text-base break-words">{detailsModalData.lecturer || "N/A"}</p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">Uploaded By</p>
                                    <p className="font-bold text-black text-sm sm:text-base break-words">
                                        {detailsModalData.uploadedBy?.fullName || detailsModalData.uploadedBy?.email || "Unknown"}
                                    </p>
                                </div>
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">Upload Date</p>
                                    <p className="font-bold text-black text-sm sm:text-base">
                                        {new Date(detailsModalData.createdAt).toLocaleDateString('en-US', { 
                                            day: 'numeric', 
                                            month: 'short', 
                                            year: 'numeric' 
                                        })}
                                    </p>
                                </div>
                                {detailsModalData.fileSize && (
                                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">File Size</p>
                                        <p className="font-bold text-black text-sm sm:text-base">
                                            {(detailsModalData.fileSize / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                )}
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">Format</p>
                                    <p className="font-bold text-black text-sm sm:text-base uppercase">
                                        {detailsModalData.cloudinaryFormat || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            {detailsModalData.description && (
                                <div className="mb-4 sm:mb-6">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Description</p>
                                    <p className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                        {detailsModalData.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Actions - Fixed at bottom */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 sm:p-6 pt-3 sm:pt-4 border-t-2 border-gray-200 bg-white shrink-0">
                            <a
                                href={fixCloudinaryUrl(detailsModalData.fileUrl || '')}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={`${(detailsModalData.title || "material").replace(/\s+/g, "_")}.${(detailsModalData.cloudinaryFormat || "").toLowerCase() || "pdf"}`}
                                className="flex-1 bg-black text-white py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm border-2 border-black hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors"
                            >
                                <FaDownload /> Download File
                            </a>
                            <button
                                onClick={() => setDetailsModalOpen(false)}
                                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm border-2 border-black hover:bg-gray-100 text-black transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>

            {/* --- MATERIALS GRID --- */}
            {isInitialLoading || isFiltering ? (
                <div className="flex items-center justify-center py-24 min-h-[400px]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#22C55E] mb-4"></div>
                        <p className="text-gray-600 font-bold uppercase tracking-wide animate-pulse">
                            {isInitialLoading ? "Loading Materials..." : "Filtering..."}
                        </p>
                    </div>
                </div>
            ) : filteredMaterials.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <p className="text-gray-600 font-medium">No materials found for the selected filters.</p>
                    </div>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                    {filteredMaterials.map((item: any) => {
                        const format = (item.cloudinaryFormat || "").toLowerCase();
                        const isPdf = format === 'pdf' || format.includes('pdf') || item.fileUrl?.toLowerCase().includes('.pdf');
                        // Fix URL for existing files that might have wrong resource type
                        const fixedFileUrl = fixCloudinaryUrl(item.fileUrl || '');
                        return (
                            <motion.div
                                key={item._id || item.id}
                                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                whileHover={{ y: -5 }}
                                className="bg-white border-3 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_#22C55E] transition-all flex flex-col justify-between group h-full min-h-[250px]"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-2xl ${isPdf ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {isPdf ? <FaFilePdf /> : <FaFileWord />}
                                        </div>
                                        <span className="bg-[#EAB308] border-2 border-black px-2 py-1 rounded text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_black]">
                                            {item.courseCode || item.code}
                                        </span>
                                    </div>

                                    <h3 className="font-heading font-black text-xl leading-tight mb-2 group-hover:text-[#22C55E] transition-colors text-black line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-wide">
                                        {new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} • {item.level}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {item.lecturer && (
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-bold text-gray-600">
                                                {item.lecturer}
                                            </span>
                                        )}
                                        {item.type && (
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-bold text-gray-600">
                                                {item.type}
                                            </span>
                                        )}
                                        {item.uploadedBy && (
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-bold text-gray-600">
                                                By: {item.uploadedBy.fullName}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t-2 border-gray-100 mt-auto">
                                    <a
                                        href={fixedFileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={`${(item.title || "material").replace(/\\s+/g, "_")}.${format || (isPdf ? "pdf" : "doc")}`}
                                        className="flex-1 bg-black text-white py-2 rounded-lg font-bold text-sm border-2 border-black hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <FaDownload /> Download
                                    </a>
                                    <button
                                        onClick={() => openDetailsModal(item)}
                                        className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-50 text-black transition-colors"
                                        title="View Details"
                                    >
                                        <FaEye />
                                    </button>

                                    {/* Admin Actions */}
                                    {isAdmin && (
                                        <>
                                            <button className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-red-50 text-red-600 transition-colors" onClick={() => openConfirmationModal(item._id)}>
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
}