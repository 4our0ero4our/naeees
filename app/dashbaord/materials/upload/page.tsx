"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";
import CustomDropdown from "@/app/components/CustomDropdown";

export default function UploadPage() {
  const [formData, setFormData] = useState({
    level: "",
    materialType: "",
    semester: "",
    visibility: ""
  });

  const handleDropdownChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">

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
                <CustomDropdown
                    label="Level"
                    options={["100L", "200L", "300L", "400L", "500L"]}
                    value={formData.level}
                    onChange={(value: string) => handleDropdownChange("level", value)}
                    placeholder="Select Level"
                />
            </div>

            <div>
                <CustomDropdown
                    label="Material Type"
                    options={["Lecture Note", "Past Question", "Textbook", "Assignment"]}
                    value={formData.materialType}
                    onChange={(value: string) => handleDropdownChange("materialType", value)}
                    placeholder="Select Type"
                />
            </div>

            <div>
                <CustomDropdown
                    label="Semester"
                    options={["First Semester", "Second Semester"]}
                    value={formData.semester}
                    onChange={(value: string) => handleDropdownChange("semester", value)}
                    placeholder="Select Semester"
                />
            </div>

            {/* Description Input */}
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Description</label>
                <textarea placeholder="e.g. This is a lecture note for the course" className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" />
            </div>

            {/* Visibility Input */}
            <div>
                <CustomDropdown
                    label="Visibility"
                    options={["All", "Members"]}
                    value={formData.visibility}
                    onChange={(value: string) => handleDropdownChange("visibility", value)}
                    placeholder="Select Visibility"
                />
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