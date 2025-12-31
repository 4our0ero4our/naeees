"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaInfoCircle, 
  FaTimes 
} from "react-icons/fa";

export type AlertType = 'success' | 'warning' | 'error' | 'info';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  type?: AlertType;
  title: string;
  message?: string;
  duration?: number; // Time in ms before auto-close (default: 5000)
}

// --- CONFIGURATION ---
const alertConfig = {
  success: {
    bgColor: "bg-[#22C55E]", // Brand Green
    borderColor: "border-black",
    textColor: "text-black",
    icon: <FaCheckCircle className="text-2xl" />,
    shadow: "shadow-[6px_6px_0px_0px_black]",
  },
  warning: {
    bgColor: "bg-[#EAB308]", // Brand Yellow
    borderColor: "border-black",
    textColor: "text-black",
    icon: <FaExclamationTriangle className="text-2xl" />,
    shadow: "shadow-[6px_6px_0px_0px_black]",
  },
  error: {
    bgColor: "bg-black", // Brand Black (High Contrast)
    borderColor: "border-black",
    textColor: "text-white",
    icon: <FaTimesCircle className="text-2xl text-[#EAB308]" />, // Yellow icon for contrast
    shadow: "shadow-[6px_6px_0px_0px_#EAB308]", // Yellow shadow
  },
  info: {
    bgColor: "bg-white",
    borderColor: "border-black",
    textColor: "text-black",
    icon: <FaInfoCircle className="text-2xl" />,
    shadow: "shadow-[6px_6px_0px_0px_black]",
  }
};

const CustomAlert = ({ 
  isOpen, 
  onClose, 
  type = 'info', 
  title, 
  message, 
  duration = 5000 
}: CustomAlertProps) => {
  
  // Auto-close logic
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const config = alertConfig[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-6 right-4 sm:right-6 z-[10000] w-[90vw] max-w-md"
        >
          <div className={`relative ${config.bgColor} border-3 ${config.borderColor} ${config.textColor} p-5 rounded-xl ${config.shadow} flex items-start gap-4 overflow-hidden`}>
            
            {/* --- Progress Bar (Timer) --- */}
            {duration > 0 && (
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1.5 ${type === 'error' ? 'bg-[#EAB308]' : 'bg-black/20'}`}
              />
            )}

            {/* Icon Box */}
            <div className="shrink-0 pt-1">
                {config.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="font-heading font-black text-lg uppercase tracking-tight leading-none mb-1">
                {title}
              </h4>
              {message && (
                <p className={`text-sm font-bold ${type === 'error' ? 'text-gray-300' : 'text-gray-700'} leading-snug`}>
                  {message}
                </p>
              )}
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className={`shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors ${type === 'error' ? 'hover:bg-white/20' : ''}`}
            >
              <FaTimes />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;