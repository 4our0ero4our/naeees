"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaSave, FaTimes, FaFile } from "react-icons/fa";
import CustomDropdown from "@/app/components/CustomDropdown";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomAlert from "@/app/components/CustomAlert";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    lecturer: "",
    level: "",
    materialType: "",
    semester: "",
    description: "",
    visibility: ""
  });

  /**
   * Handle dropdown change
   * @param key - The key of the form data
   * @param value - The value of the form data
   */
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

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  /**
   * Handle drag over event
   * @param e - The event object
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event
   * @param e - The event object
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handle drop event
   * @param e - The event object
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  /**
   * Handle file input change
   * @param e - The event object
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  /**
   * Handle remove file
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Format file size
   * @param bytes - The file size in bytes
   * @returns The formatted file size
   */
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  /**
   * Handle submit
   * @param e - The event object
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    if (!formData.title || !formData.courseCode || !formData.level || !formData.materialType || !formData.semester) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: "",
          courseCode: "",
          lecturer: "",
          level: "",
          materialType: "",
          semester: "",
          description: "",
          visibility: ""
        });
        handleRemoveFile();

        setAlert({
          isOpen: true,
          type: "success",
          title: "Material Uploaded",
          message: `${formData.title} uploaded successfully! Redirecting...`,
        });
        
        // Redirect to materials page after 2 seconds
        setTimeout(() => {
          router.push("/dashbaord/materials");
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to upload material. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {alert && (
        <CustomAlert
          isOpen={alert.isOpen}
          onClose={() => setAlert(null)}
          type={alert.type}
          title={alert.title}
          message={alert.message}
        />
      )}
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white border-3 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_black]"
      >
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
            Material uploaded successfully! Redirecting...
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Row 1 - 3 inputs */}
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Material Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Introduction to logic gates" 
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" 
                />
            </div>

            <div>
                <label className="block text-sm font-bold uppercase mb-2">Course Code *</label>
                <input 
                  type="text" 
                  placeholder="e.g. EEE 311" 
                  value={formData.courseCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" 
                />
            </div>

            <div>
                <label className="block text-sm font-bold uppercase mb-2">Lecturer Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dr. Aliyu" 
                  value={formData.lecturer}
                  onChange={(e) => setFormData(prev => ({ ...prev, lecturer: e.target.value }))}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" 
                />
            </div>

            {/* Row 2 - 3 inputs */}
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

            {/* Row 3 - Description spans all 3 columns */}
            <div className="md:col-span-3">
                <label className="block text-sm font-bold uppercase mb-2">Description</label>
                <textarea 
                  placeholder="e.g. This is a lecture note for the course" 
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 font-medium focus:border-[#22C55E] focus:outline-none" 
                />
            </div>

            {/* Row 4 - Visibility */}
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
            <label className="block text-sm font-bold uppercase mb-2">File Upload *</label>
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
                className={`border-3 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${
                  isDragging
                    ? "border-[#22C55E] bg-green-50"
                    : "border-gray-300 hover:border-[#22C55E] hover:bg-green-50"
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all">
                  <FaCloudUploadAlt className="text-3xl text-gray-400 group-hover:text-[#22C55E]" />
                </div>
                <p className="font-bold text-gray-700">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX, PPT, PPTX (Max 10MB)</p>
              </div>
            ) : (
              <div className="border-2 border-[#22C55E] rounded-xl p-4 bg-green-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-[#22C55E]">
                    <FaFile className="text-[#22C55E]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            )}
        </div>

        {/* CTA */}
        <button 
          type="submit"
          disabled={isUploading}
          className="w-full bg-black text-white py-4 rounded-xl font-black text-lg uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#22C55E] hover:shadow-[6px_6px_0px_0px_#22C55E] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <FaSave /> {isUploading ? "Uploading..." : "Upload Material"}
        </button>

      </motion.form>
    </div>
  );
}