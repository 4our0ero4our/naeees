"use client";

import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaFilePdf, FaFileWord, FaDownload, FaEye, FaTrash, FaEdit } from "react-icons/fa";

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

export default function MaterialsPage() {
  const isAdmin = true; // TODO: Get the current user role from the database

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading font-black text-4xl text-black">Academic Materials</h1>
        <p className="text-gray-600 font-medium">Access lecture notes, past questions, and academic resources.</p>
      </div>

      {/* --- FILTERS SECTION --- */}
      <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_black] flex flex-col lg:flex-row gap-4 items-end lg:items-center">
        
        {/* Search */}
        <div className="w-full lg:flex-1">
            <label className="text-xs font-bold uppercase tracking-wider mb-1 block">Search Title</label>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="e.g. Circuit Theory" 
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 pl-10 font-bold focus:border-black focus:outline-none transition-colors"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
            {['Level', 'Semester', 'Course Code', 'Type'].map((filter) => (
                <div key={filter}>
                    <label className="text-xs font-bold uppercase tracking-wider mb-1 block">{filter}</label>
                    <select className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 font-medium focus:border-black focus:outline-none bg-transparent cursor-pointer">
                        <option>All</option>
                        {/* Mock options */}
                    </select>
                </div>
            ))}
        </div>

        {/* Filter Icon (Visual) */}
        <div className="hidden lg:flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg border-2 border-black">
            <FaFilter />
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
                className="bg-white border-3 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_#22C55E] transition-all flex flex-col justify-between group"
            >
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-2xl ${item.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            {item.type === 'pdf' ? <FaFilePdf /> : <FaFileWord />}
                        </div>
                        <span className="bg-[#EAB308] border-2 border-black px-2 py-1 rounded text-xs font-black uppercase">
                            {item.code}
                        </span>
                    </div>
                    
                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-[#22C55E] transition-colors">{item.title}</h3>
                    <p className="text-xs text-gray-500 font-mono mb-4">Uploaded: {item.date} • {item.level}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-medium">
                            {item.lecturer}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 font-medium">
                            Lecture Note
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 pt-4 border-t-2 border-gray-100">
                    <button className="flex-1 bg-black text-white py-2 rounded-lg font-bold text-sm border-2 border-black hover:bg-gray-800 flex items-center justify-center gap-2">
                        <FaDownload /> Download
                    </button>
                    <button className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-50 text-black">
                        <FaEye />
                    </button>
                    
                    {/* Admin Actions */}
                    {isAdmin && (
                        <>
                            <button className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-blue-50 text-blue-600">
                                <FaEdit />
                            </button>
                            <button className="w-10 flex items-center justify-center border-2 border-black rounded-lg hover:bg-red-50 text-red-600">
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