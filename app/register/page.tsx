"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import AuthLayout from "@/app/components/auth/AuthLayout";
import { AuthInput, AuthButton, FormSectionHeader } from "@/app/components/auth/AuthComponents";
import { FaUser, FaIdCard, FaCheckCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [isMember, setIsMember] = useState<boolean | null>(null);

    const totalSteps = 4;

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    // Animation variants for sliding steps
    const stepVariants: Variants = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
        exit: { x: -50, opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the NAEEES Digital Portal and access your digital engineering campus."
            contextText="Create your student account to access academic materials, track your CGPA, participate in events, and engage with fellow engineering students."
        >
            <div className="space-y-8">

                {/* --- PROGRESS BAR --- */}
                <div className="w-full mb-8">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
                    </div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                        <motion.div
                            className="h-full bg-[#22C55E]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / totalSteps) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* --- MULTI-STEP FORM CONTENT --- */}
                <div className="min-h-[400px]"> {/* Min-height prevents layout jump */}
                    <AnimatePresence mode="wait">

                        {/* STEP 1: PERSONAL INFO */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                variants={stepVariants}
                                initial="hidden" animate="visible" exit="exit"
                                className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                            >
                                <FormSectionHeader title="Student Information" />
                                <div className="space-y-6">
                                    <AuthInput
                                        label="Full Name"
                                        placeholder="e.g. 4our 0ero 4our"
                                        icon={<FaUser />}
                                        autoFocus
                                    />
                                    <AuthInput
                                        label="School Email Address"
                                        type="email"
                                        placeholder="e.g. 4our0ero4our@futminna.edu.ng"
                                        helperText="This will be used to verify your student identity."
                                    />
                                    <AuthInput
                                        label="Matric Number"
                                        placeholder="e.g. 2025/1/40404EE"
                                        helperText="Used to confirm department and membership eligibility."
                                        icon={<FaIdCard />}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: MEMBERSHIP */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                variants={stepVariants}
                                initial="hidden" animate="visible" exit="exit"
                                className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                            >
                                <FormSectionHeader title="NAEEES Membership" subtitle="Verify your status to unlock exclusive benefits." />

                                <div className="grid grid-cols-1 gap-6 pt-2">
                                    {/* Member Option */}
                                    <div
                                        onClick={() => setIsMember(true)}
                                        className={`cursor-pointer border-3 rounded-xl p-6 transition-all duration-200 relative overflow-hidden group ${isMember === true ? 'border-[#22C55E] bg-green-50 shadow-[4px_4px_0px_0px_#22C55E]' : 'border-gray-200 hover:border-black hover:shadow-md'}`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-lg text-black">✅ I am a Member</span>
                                            {isMember === true && <FaCheckCircle className="text-[#22C55E] text-xl" />}
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed">Verified members gain access to member-only events, discounts, and resources.</p>
                                    </div>

                                    {/* Non-Member Option */}
                                    <div
                                        onClick={() => setIsMember(false)}
                                        className={`cursor-pointer border-3 rounded-xl p-6 transition-all duration-200 relative overflow-hidden group ${isMember === false ? 'border-black bg-gray-50 shadow-[4px_4px_0px_0px_black]' : 'border-gray-200 hover:border-black hover:shadow-md'}`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-lg text-black">⭕ Not a Member</span>
                                            {isMember === false && <FaCheckCircle className="text-black text-xl" />}
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed">Non-members can still access selected resources and register for public events.</p>
                                    </div>
                                </div>

                                {/* Conditional Helper Text */}
                                {isMember === true && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-6 p-4 bg-[#EAB308]/10 border-l-4 border-[#EAB308] rounded-r-lg text-sm font-bold text-gray-800"
                                    >
                                        NOTE: Your membership status will be verified using your matric number against department records.
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* STEP 3: SECURITY */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                variants={stepVariants}
                                initial="hidden" animate="visible" exit="exit"
                                className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                            >
                                <FormSectionHeader title="Secure Your Account" />
                                <div className="space-y-6">
                                    <AuthInput
                                        label="Password"
                                        type="password"
                                        placeholder="••••••••"
                                        helperText="Use a strong password to protect your account."
                                        autoFocus
                                    />
                                    <AuthInput
                                        label="Confirm Password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: AGREEMENT */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                variants={stepVariants}
                                initial="hidden" animate="visible" exit="exit"
                                className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                            >
                                <FormSectionHeader title="Final Review" subtitle="Please review your details and accept the terms." />

                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                                    <h4 className="font-bold text-black mb-2">Account Summary</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Role: Student</li>
                                        <li>• Membership: {isMember === true ? "Claimed" : "Unclaimed"}</li>
                                    </ul>
                                </div>

                                <div className="flex items-start gap-4 p-4 border-2 border-[#EAB308]/30 bg-[#EAB308]/5 rounded-xl">
                                    <input type="checkbox" id="terms" className="mt-1 w-5 h-5 accent-[#22C55E] cursor-pointer" />
                                    <label htmlFor="terms" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                        I agree to the <span className="font-bold text-black underline decoration-[#EAB308] decoration-2">NAEEES Digital Portal Terms</span> and <span className="font-bold text-black underline decoration-[#EAB308] decoration-2">Privacy Policy</span>.
                                    </label>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* --- NAVIGATION BUTTONS --- */}
                <div className="flex gap-4 pt-4">
                    {step > 1 && (
                        <div className="flex-1">
                            <AuthButton variant="secondary" onClick={prevStep} type="button">
                                <span className="flex items-center justify-center gap-2"><FaArrowLeft /> Back</span>
                            </AuthButton>
                        </div>
                    )}

                    <div className={step > 1 ? "flex-1" : "w-full"}>
                        {step < totalSteps ? (
                            <AuthButton onClick={nextStep} type="button">
                                <span className="flex items-center justify-center gap-2">Next Step <FaArrowRight /></span>
                            </AuthButton>
                        ) : (
                            <AuthButton type="submit">
                                Create Account
                            </AuthButton>
                        )}
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-gray-600 font-medium mb-2">Already have an account?</p>
                    <Link href="/login" className="font-black text-black hover:text-[#22C55E] transition-colors underline decoration-2 underline-offset-4">
                        Sign In Instead
                    </Link>
                </div>

            </div>
        </AuthLayout>
    );
}