"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";

export default function UploadPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-black">Upload Academic Material</h1>
        <p className="text-gray-600 font-medium">Add new resources to the student database.</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-3 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_black]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Title */}
            <div className="md:col-span-2">
                <label className="block text-sm font-bold uppercase mb-2">Material Title</label>
                <input type="text" placeholder="e.g. Introduction to logic gates" className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" />
            </div>

            {/* Course Code */}
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Course Code</label>
                <input type="text" placeholder="e.g. EEE 311" className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" />
            </div>

            {/* Lecturer */}
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Lecturer Name</label>
                <input type="text" placeholder="e.g. Dr. Aliyu" className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" />
            </div>

            {/* Selects */}
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Level</label>
                <select className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none bg-white">
                    <option>100L</option>
                    <option>200L</option>
                    <option>300L</option>
                    <option>400L</option>
                    <option>500L</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-bold uppercase mb-2">Material Type</label>
                <select className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none bg-white">
                    <option>Lecture Note</option>
                    <option>Past Question</option>
                    <option>Textbook</option>
                </select>
            </div>
        </div>

        {/* File Dropzone */}
        <div className="mb-8">
            <label className="block text-sm font-bold uppercase mb-2">File Upload</label>
            <div className="border-3 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-[#22C55E] hover:bg-green-50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all">
                    <FaCloudUploadAlt className="text-3xl text-gray-400 group-hover:text-[#22C55E]" />
                </div>
                <p className="font-bold text-gray-700">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PDF, DOCX, PPTX (Max 10MB)</p>
            </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-black text-white py-4 rounded-xl font-black text-lg uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#22C55E] hover:shadow-[6px_6px_0px_0px_#22C55E] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3">
            <FaSave /> Upload Material
        </button>

      </motion.form>
    </div>
  );
}