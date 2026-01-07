"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface CustomDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "All"
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedValue = value || placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-xs font-black uppercase tracking-widest mb-2 block text-gray-500">
        {label}
      </label>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border-2 rounded-xl px-4 py-3 font-bold bg-white text-left flex items-center justify-between transition-colors relative z-10 ${isOpen ? 'border-black shadow-[4px_4px_0px_0px_black]' : 'border-gray-200 hover:border-black'
          }`}
      >
        <span className={`truncate mr-2 ${value ? "text-black" : "text-gray-500"}`}>
          {selectedValue}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <FaChevronDown className={`shrink-0 ${isOpen ? "text-black" : "text-gray-400"}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
            className="absolute z-50 w-full mt-2 bg-white border-2 border-black rounded-xl shadow-[6px_6px_0px_0px_black] overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
              {/* "All" Option (Reset) */}
              <motion.button
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left font-bold transition-all rounded-lg text-sm mb-1 ${!value
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-yellow-100 hover:text-black"
                  }`}
              >
                {placeholder}
              </motion.button>

              {/* Other Options */}
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + (index * 0.03) }}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left font-bold transition-all rounded-lg text-sm mb-1 ${value === option
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-yellow-100 hover:text-black"
                    }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}