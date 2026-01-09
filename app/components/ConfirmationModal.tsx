"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
}

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDanger = false
}: ConfirmationModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[10001] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[10002] flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="bg-white pointer-events-auto w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5">
                            <div className="p-6 text-center">
                                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${isDanger ? 'bg-red-100' : 'bg-yellow-100'} mb-4`}>
                                    <FaExclamationTriangle className={`text-2xl ${isDanger ? 'text-red-600' : 'text-yellow-600'}`} />
                                </div>
                                <h3 className="text-xl font-black font-heading text-gray-900 mb-2">
                                    {title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-bold">
                                    {message}
                                </p>
                            </div>
                            <div className="flex border-t border-gray-100">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors uppercase tracking-wider"
                                >
                                    {cancelText}
                                </button>
                                <div className="w-px bg-gray-100"></div>
                                <button
                                    onClick={() => { onConfirm(); onClose(); }}
                                    className={`flex-1 py-4 text-sm font-bold transition-colors uppercase tracking-wider ${isDanger ? 'text-red-600 hover:bg-red-50' : 'text-black hover:bg-gray-50'}`}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
