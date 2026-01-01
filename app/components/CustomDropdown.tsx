"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

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
      <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-700">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-medium focus:border-black focus:outline-none bg-white cursor-pointer transition-colors hover:border-gray-400 flex items-center justify-between text-left ${isOpen ? 'border-black' : ''}`}
      >
        <span className={`truncate mr-2 ${value ? "text-black font-bold" : "text-gray-500 font-medium"}`}>
          {selectedValue}
        </span>
        <FaChevronDown
          className={`text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-black" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_black] overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {/* "All" Option (Reset) */}
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left font-medium transition-colors cursor-pointer 
                ${!value 
                  ? "bg-gray-100 font-bold text-black border-l-4 border-black" 
                  : "hover:bg-[#EAB308] hover:text-black text-gray-600"
                }`}
            >
              {placeholder}
            </button>

            {/* Other Options */}
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left font-medium transition-colors border-t border-gray-200 cursor-pointer
                  ${value === option 
                    ? "bg-gray-100 font-bold text-black border-l-4 border-black" 
                    : "hover:bg-[#EAB308] hover:text-black text-gray-600"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}