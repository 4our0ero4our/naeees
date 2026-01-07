
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import CustomDropdown from "@/app/components/CustomDropdown";
import CourseInputTable from "./CourseInputTable";

interface ManageSemesterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
    initialData?: any;
}

export default function ManageSemesterModal({ isOpen, onClose, onSave, initialData }: ManageSemesterModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        level: "",
        semester: "",
        courses: [{ code: "", unit: "", grade: "A", gradePoint: 5 }]
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                level: initialData.level || "",
                semester: initialData.semester || "",
                courses: initialData.courses && initialData.courses.length > 0
                    ? initialData.courses
                    : [{ code: "", unit: "", grade: "A", gradePoint: 5 }]
            });
        } else {
            // Reset for new entry
            setFormData({
                title: "",
                level: "100L",
                semester: "First",
                courses: [{ code: "", unit: "", grade: "A", gradePoint: 5 }]
            });
        }
        setStep(1);
    }, [initialData, isOpen]);

    const handleNext = () => {
        if (!formData.title || !formData.level || !formData.semester) {
            // Simple validation visualization could be added here
            return;
        }
        setStep(2);
    };

    const handleSave = async () => {
        setLoading(true);
        await onSave(formData);
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-[8px_8px_0px_0px_black] border-3 border-black flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b-2 border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                    <div>
                        <h2 className="font-heading font-black text-xl">{initialData ? "Edit Semester" : "New Semester"}</h2>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Step {step} of 2</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border-2 border-black rounded hover:bg-black hover:text-white transition-colors">
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div className={`p-6 flex-1 ${step === 1 ? 'overflow-visible relative z-20' : 'overflow-y-auto custom-scrollbar relative z-0'}`}>
                    {step === 1 ? (
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-700">Semester Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 100 Level - First Semester"
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-bold focus:border-black focus:outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                <p className="text-[10px] text-gray-400 font-bold mt-1">Give this record a unique name</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <CustomDropdown
                                        label="Level"
                                        options={["100L", "200L", "300L", "400L", "500L"]}
                                        value={formData.level}
                                        onChange={(val) => setFormData({ ...formData, level: val })}
                                    />
                                </div>
                                <div>
                                    <CustomDropdown
                                        label="Semester"
                                        options={["First", "Second"]}
                                        value={formData.semester}
                                        onChange={(val) => setFormData({ ...formData, semester: val })}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="bg-[#EAB308]/10 border border-[#EAB308] rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase text-[#EAB308] tracking-wider">Projected GPA</span>
                                    <span className="text-2xl font-black text-black">
                                        {(() => {
                                            let units = 0;
                                            let points = 0;
                                            formData.courses.forEach(c => {
                                                const u = parseFloat(c.unit) || 0;
                                                // @ts-ignore
                                                const p = c.gradePoint || 0;
                                                units += u;
                                                points += (u * p);
                                            });
                                            return units > 0 ? (points / units).toFixed(2) : "0.00";
                                        })()}
                                    </span>
                                </div>
                            </div>
                            <CourseInputTable courses={formData.courses} setCourses={(courses) => setFormData({ ...formData, courses })} />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t-2 border-gray-100 bg-gray-50 flex justify-between rounded-b-2xl relative z-10">
                    {step === 2 ? (
                        <button
                            onClick={() => setStep(1)}
                            className="px-6 py-3 font-bold text-gray-500 hover:text-black transition-colors"
                        >
                            Back
                        </button>
                    ) : (
                        <div></div> // Spacer
                    )}

                    {step === 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!formData.title || !formData.level || !formData.semester}
                            className="bg-black text-white px-8 py-3 rounded-xl font-bold border-2 border-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_#EAB308]"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-[#22C55E] text-white px-8 py-3 rounded-xl font-bold border-2 border-[#16a34a] hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_black] flex items-center gap-2"
                        >
                            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                            Save Record
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
