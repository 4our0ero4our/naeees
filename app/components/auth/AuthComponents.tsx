"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

// --- ANIMATED INPUT FIELD ---
interface AuthInputProps extends HTMLMotionProps<"input"> {
  label: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const AuthInput = ({ label, helperText, icon, ...props }: AuthInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-sm uppercase tracking-wider text-gray-800">
        {label}
      </label>
      <div className="relative group">
        <motion.input
          whileFocus={{ scale: 1.01, boxShadow: "4px 4px 0px 0px #22C55E" }}
          className="w-full bg-white border-2 border-black px-4 py-3 text-lg font-medium outline-none transition-all placeholder:text-gray-400 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] focus:border-black"
          {...props}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-gray-500 font-medium">{helperText}</p>
      )}
    </div>
  );
};

// --- ANIMATED BUTTON ---
interface AuthButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export const AuthButton = ({ children, variant = "primary", disabled, ...props }: AuthButtonProps) => {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -2, boxShadow: isPrimary ? "6px 6px 0px 0px black" : "6px 6px 0px 0px #EAB308" } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0, boxShadow: "0px 0px 0px 0px black" } : {}}
      disabled={disabled}
      className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wide border-2 border-black transition-all duration-200 
        ${isPrimary
          ? disabled
            ? "bg-gray-300 text-gray-500 shadow-[4px_4px_0px_0px_gray] cursor-not-allowed"
            : "bg-[#22C55E] text-black shadow-[4px_4px_0px_0px_black]"
          : disabled
            ? "bg-gray-100 text-gray-400 shadow-[4px_4px_0px_0px_gray] cursor-not-allowed"
            : "bg-white text-black shadow-[4px_4px_0px_0px_gray]"
        }`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// --- SECTION HEADER (For Register Page) ---
export const FormSectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-6 border-b-2 border-gray-100 pb-2">
    <h3 className="font-black text-xl text-black flex items-center gap-2">
      <span className="w-3 h-3 bg-[#EAB308] rounded-full border-2 border-black"></span>
      {title}
    </h3>
    {subtitle && <p className="text-sm text-gray-500 mt-1 pl-5">{subtitle}</p>}
  </div>
);