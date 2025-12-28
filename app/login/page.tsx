"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthLayout from "@/app/components/auth/AuthLayout";
import { AuthInput, AuthButton } from "@/app/components/auth/AuthComponents";
import { FaEye, FaLock, FaEnvelope } from "react-icons/fa";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your academic journey on the NAEEES Digital Portal."
      contextText="Access your personalized academic dashboard, learning resources, events, and discussions — all in one secure place."
    >
      <form className="space-y-6">
        
        {/* Email */}
        <motion.div 
            initial={{ x: 20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
        >
            <AuthInput 
                label="Email Address"
                type="email"
                placeholder="student@school.edu"
                helperText="Use the email address you registered with."
                icon={<FaEnvelope />}
            />
        </motion.div>

        {/* Password */}
        <motion.div 
            initial={{ x: 20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.3 }}
        >
            <AuthInput 
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<FaEye className="cursor-pointer hover:text-black transition-colors" />}
            />
            <div className="flex justify-end mt-2">
                <Link href="/forgot-password">
                    <span className="text-sm font-bold text-[#EAB308] hover:text-black hover:underline transition-colors cursor-pointer">
                        Forgot your password?
                    </span>
                </Link>
            </div>
        </motion.div>

        {/* CTAs */}
        <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="pt-4 space-y-4"
        >
            <AuthButton type="submit">
                Sign In to Dashboard
            </AuthButton>
            
            <div className="text-center">
                <p className="text-gray-600 font-medium mb-2">Don't have an account yet?</p>
                <Link href="/register">
                    <AuthButton variant="secondary" type="button">
                        Create a Student Account
                    </AuthButton>
                </Link>
            </div>
        </motion.div>

        {/* Trust Text */}
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-200"
        >
            <FaLock className="text-gray-400 text-xs" />
            <p className="text-xs text-gray-400 font-medium text-center">
                Your data is protected and used only for academic and NAEEES-related activities.
            </p>
        </motion.div>

      </form>
    </AuthLayout>
  );
}