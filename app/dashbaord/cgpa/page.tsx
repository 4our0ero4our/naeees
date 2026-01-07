"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaFilePdf } from "react-icons/fa";
import CGPASummary from "@/app/components/cgpa/CGPASummary";
import SemesterCard from "@/app/components/cgpa/SemesterCard";
import ManageSemesterModal from "@/app/components/cgpa/ManageSemesterModal";
import TargetCalculatorModal from "@/app/components/cgpa/TargetCalculatorModal";
import CustomAlert from "@/app/components/CustomAlert";
import { generateCGPAPdf } from "@/app/lib/utils/cgpa-export";
import { useSession } from "next-auth/react";

export default function CGPAPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [alert, setAlert] = useState<{
        isOpen: boolean;
        type: "success" | "error" | "warning" | "info";
        title: string;
        message: string;
    } | null>(null);

    // Fetch records
    const fetchRecords = async () => {
        try {
            const response = await axios.get("/api/cgpa");
            if (response.data.success) {
                setRecords(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch records", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // Calculate Global Stats
    const totalUnits = records.reduce((sum, r) => sum + (r.totalUnits || 0), 0);
    // Calculate CGPA: (Sum of all (unit * gradePoint)) / Total Units
    const totalPoints = records.reduce((sum, r) => {
        let semesterPoints = 0;
        r.courses?.forEach((c: any) => {
            semesterPoints += (parseFloat(c.unit) * parseFloat(c.gradePoint));
        });
        return sum + semesterPoints;
    }, 0);

    const cgpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "0.00";

    const handleSave = async (data: any) => {
        try {
            if (editingRecord) {
                // Update
                const response = await axios.put(`/api/cgpa/${editingRecord._id}`, data);
                if (response.data.success) {
                    setRecords(records.map(r => r._id === editingRecord._id ? response.data.data : r));
                    setAlert({ isOpen: true, type: "success", title: "Success", message: "Semester updated successfully!" });
                }
            } else {
                // Create
                const response = await axios.post("/api/cgpa", data);
                if (response.data.success) {
                    setRecords([response.data.data, ...records]); // Add to top
                    setAlert({ isOpen: true, type: "success", title: "Success", message: "Semester added successfully!" });
                }
            }
            setIsModalOpen(false);
            setEditingRecord(null);
        } catch (error: any) {
            console.error("Error saving record", error);
            setAlert({ isOpen: true, type: "error", title: "Error", message: error.response?.data?.message || "Failed to save record." });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this semester record?")) return;
        try {
            const response = await axios.delete(`/api/cgpa/${id}`);
            if (response.data.success) {
                setRecords(records.filter(r => r._id !== id));
                setAlert({ isOpen: true, type: "success", title: "Deleted", message: "Semester record deleted." });
            }
        } catch (error) {
            console.error("Error deleting", error);
        }
    };

    const openAddModal = () => {
        setEditingRecord(null);
        setIsModalOpen(true);
    };

    const openEditModal = (record: any) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    };

    const handleExport = () => {
        if (records.length === 0) {
            setAlert({ isOpen: true, type: "warning", title: "No Data", message: "Add some semester records first to export." });
            return;
        }
        generateCGPAPdf(records, session?.user);
    };

    return (
        <div className="min-h-screen pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-heading font-black text-3xl md:text-4xl text-black">CGPA Tracker</h1>
                    <p className="text-gray-500 font-bold mt-2">Track, calculate, and project your academic performance.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsCalculatorOpen(true)}
                        className="bg-white text-black border-2 border-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_gray]"
                    >
                        Target 🎯
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-white text-black border-2 border-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_gray]"
                    >
                        <FaFilePdf /> Export PDF
                    </button>
                    <button
                        onClick={openAddModal}
                        className="bg-black text-white border-2 border-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_#EAB308]"
                    >
                        <FaPlus /> Add Semester
                    </button>
                </div>
            </div>

            <CGPASummary cgpa={cgpa} totalUnits={totalUnits} semesterCount={records.length} />

            {/* Records List */}
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-2">
                Your Semester Records <span className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-500">{records.length}</span>
            </h2>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black"></div>
                </div>
            ) : records.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-gray-300 rounded-2xl">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FaPlus className="text-gray-400 text-xl" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-600 mb-2">No records found</h3>
                    <p className="text-gray-400 text-sm mb-6">Start by creating your first semester to track your CGPA.</p>
                    <button
                        onClick={openAddModal}
                        className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
                    >
                        Add First Semester
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {records.map((record) => (
                            <SemesterCard
                                key={record._id}
                                record={record}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Modal */}
            <ManageSemesterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingRecord}
            />

            <TargetCalculatorModal
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                currentCGPA={parseFloat(cgpa)}
                totalUnits={totalUnits}
            />

            {/* Alert */}
            {alert && (
                <CustomAlert
                    isOpen={alert.isOpen}
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
        </div>
    );
}
