"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaFilePdf, FaFileWord, FaDownload, FaEye, FaTrash, FaEdit } from "react-icons/fa";
import CustomDropdown from "@/app/components/CustomDropdown";

// MOCK DATA
const materials = [
    { id: 1, title: "Circuit Theory I - Lecture 4", code: "EEE 311", level: "300L", lecturer: "Dr. Ahmed", type: "pdf", date: "Oct 20, 2025" },
    { id: 2, title: "Introduction to C++ Programming", code: "CPE 202", level: "200L", lecturer: "Prof. Sarah", type: "doc", date: "Oct 18, 2025" },
    { id: 3, title: "2023 Exam Past Questions", code: "EEE 501", level: "500L", lecturer: "N/A", type: "pdf", date: "Sep 12, 2025" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Filter options
const filterOptions = {
    level: ["100L", "200L", "300L", "400L", "500L"],
    semester: ["First Semester", "Second Semester"],
    courseCode: ["EEE 311", "CPE 202", "EEE 501", "EEE 201", "CPE 301"],
    type: ["Lecture Note", "Past Question", "Textbook", "Assignment"]
};

export default function MaterialsPage() {
    const isAdmin = true; 
    const [filters, setFilters] = useState({
        level: "",
        semester: "",
        courseCode: "",
        type: ""
    });

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8 w-full pb-20">
            {/* --- FILTERS SECTION --- */}
            <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_black]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-end">

                    {/* Search - Span 3 */}
                    <div className="md:col-span-2 xl:col-span-4">
                        <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-700">Search Title</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                <FaSearch className="text-gray-400 text-lg" />
                            </div>
                            <input
                                type="text"
                                placeholder="e.g. Circuit Theory"
                                // Added pl-12 to prevent text overlap with icon
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pl-12 font-bold focus:border-black focus:outline-none transition-colors hover:border-gray-400 text-black placeholder:text-gray-400"
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

            {/* --- MATERIALS GRID --- */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                {materials.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                        whileHover={{ y: -5 }}
                        className="bg-white border-3 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_#22C55E] transition-all flex flex-col justify-between group h-full min-h-[250px]"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-2xl ${item.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {item.type === 'pdf' ? <FaFilePdf /> : <FaFileWord />}
                                </div>
                                <span className="bg-[#EAB308] border-2 border-black px-2 py-1 rounded text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_black]">
                                    {item.code}
                                </span>
                            </div>

                            <h3 className="font-heading font-black text-xl leading-tight mb-2 group-hover:text-[#22C55E] transition-colors text-black line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-wide">
                                {item.date} • {item.level}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-bold text-gray-600">
                                    {item.lecturer}
                                </span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-bold text-gray-600">
                                    Lecture Note
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t-2 border-gray-100 mt-auto">
                            <button className="flex-1 bg-black text-white py-2 rounded-lg font-bold text-sm border-2 border-black hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors">
                                <FaDownload /> Download
                            </button>
                            <button className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-50 text-black transition-colors">
                                <FaEye />
                            </button>

                            {/* Admin Actions */}
                            {isAdmin && (
                                <>
                                    <button className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                                        <FaEdit />
                                    </button>
                                    <button className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                                        <FaTrash />
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}