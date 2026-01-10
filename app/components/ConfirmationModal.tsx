"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaQuestionCircle, FaTimes } from "react-icons/fa";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean; // If true, confirm button is red
}

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDangerous = false,
}: ConfirmationModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white border-3 border-black w-full max-w-md rounded-2xl shadow-[8px_8px_0px_0px_black] overflow-hidden"
                    >
                        {/* Header */}
                        <div className={`p-6 border-b-2 border-gray-100 flex items-start gap-4 ${isDangerous ? "bg-red-50" : "bg-gray-50"}`}>
                            <div className={`shrink-0 text-3xl ${isDangerous ? "text-red-500" : "text-black"}`}>
                                {isDangerous ? <FaExclamationTriangle /> : <FaQuestionCircle />}
                            </div>
                            <div>
                                <h3 className="text-xl font-black font-heading uppercase tracking-tight mb-1">{title}</h3>
                                <p className="text-gray-600 font-medium leading-snug">{message}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 flex justify-end gap-3 bg-white">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`px-8 py-3 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 ${isDangerous
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "bg-[#22C55E] text-white hover:bg-green-600"
                                    }`}
                            >
                                {confirmText}
                            </button>
                        </div>

                        {/* Close Icon Absolute */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
                        >
                            <FaTimes />
                        </button>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
