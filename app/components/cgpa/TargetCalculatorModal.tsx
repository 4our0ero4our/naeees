
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaCalculator } from "react-icons/fa";

interface TargetCalculatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentCGPA: number;
    totalUnits: number;
}

export default function TargetCalculatorModal({ isOpen, onClose, currentCGPA, totalUnits }: TargetCalculatorModalProps) {
    const [targetCGPA, setTargetCGPA] = useState("");
    const [nextUnits, setNextUnits] = useState("");
    const [result, setResult] = useState<{ requiredGPA: number; possible: boolean } | null>(null);

    useEffect(() => {
        if (isOpen) {
            setTargetCGPA("");
            setNextUnits("");
            setResult(null);
        }
    }, [isOpen]);

    const calculate = () => {
        const target = parseFloat(targetCGPA);
        const units = parseFloat(nextUnits);

        if (isNaN(target) || isNaN(units) || units <= 0) return;

        // Logic:
        // Current Points = currentCGPA * totalUnits
        // Total Expected Units = totalUnits + units
        // Target Points = target * Total Expected Units
        // Required Points = Target Points - Current Points
        // Required GPA = Required Points / units

        const currentPoints = currentCGPA * totalUnits;
        const totalExpectedUnits = totalUnits + units;
        const targetPoints = target * totalExpectedUnits;
        const requiredPoints = targetPoints - currentPoints;
        const requiredGPA = requiredPoints / units;

        setResult({
            requiredGPA: parseFloat(requiredGPA.toFixed(2)),
            possible: requiredGPA <= 5.0 && requiredGPA >= 0
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="bg-white w-full max-w-md rounded-2xl shadow-[8px_8px_0px_0px_black] border-3 border-black overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b-2 border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="font-heading font-black text-xl flex items-center gap-2">
                            <FaCalculator className="text-[#EAB308]" /> Target Calculator
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border-2 border-black rounded hover:bg-black hover:text-white transition-colors">
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between text-sm font-bold text-gray-500 mb-1">
                            <span>Current CGPA</span>
                            <span>Total Units</span>
                        </div>
                        <div className="flex justify-between text-xl font-black text-black">
                            <span>{currentCGPA.toFixed(2)}</span>
                            <span>{totalUnits}</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-700">Target CGPA</label>
                        <input
                            type="number"
                            placeholder="e.g. 4.50"
                            step="0.01"
                            max="5.00"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-bold focus:border-black focus:outline-none"
                            value={targetCGPA}
                            onChange={(e) => setTargetCGPA(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-700">Next Semester Units</label>
                        <input
                            type="number"
                            placeholder="e.g. 24"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-bold focus:border-black focus:outline-none"
                            value={nextUnits}
                            onChange={(e) => setNextUnits(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={calculate}
                        disabled={!targetCGPA || !nextUnits}
                        className="w-full bg-black text-white py-3 rounded-xl font-bold border-2 border-black hover:bg-gray-800 disabled:opacity-50 transition-all shadow-[4px_4px_0px_0px_#EAB308] active:translate-y-1 active:shadow-none"
                    >
                        Calculate
                    </button>

                    {result && (
                        <div className={`p-4 rounded-xl border-2 ${result.possible ? "bg-[#22C55E]/10 border-[#22C55E]" : "bg-red-50 border-red-500"}`}>
                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${result.possible ? "text-[#15803d]" : "text-red-600"}`}>
                                {result.possible ? "Required GPA" : "Target Unreachable"}
                            </p>
                            <div className="flex items-end gap-2">
                                <span className={`text-4xl font-black ${result.possible ? "text-[#15803d]" : "text-red-600"}`}>
                                    {result.possible ? result.requiredGPA.toFixed(2) : "Impossible"}
                                </span>
                                {result.possible && <span className="text-sm font-bold text-gray-500 mb-1"> / 5.00</span>}
                            </div>
                            {!result.possible && (
                                <p className="text-xs text-red-500 mt-2 font-bold">
                                    You would need a GPA of {result.requiredGPA.toFixed(2)} to hit this target, which is above the maximum 5.00.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
