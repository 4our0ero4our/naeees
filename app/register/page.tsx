"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import AuthLayout from "@/app/components/auth/AuthLayout";
import { AuthInput, AuthButton, FormSectionHeader } from "@/app/components/auth/AuthComponents";
import { FaUser, FaIdCard, FaCheckCircle, FaArrowRight, FaArrowLeft, FaEnvelope, FaClock, FaExclamationTriangle } from "react-icons/fa";
import CustomAlert from "../components/CustomAlert";

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [isMember, setIsMember] = useState<boolean | null>(null);
    const [isStudentVerified, setIsStudentVerified] = useState<boolean>(false);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
    const [otpCode, setOtpCode] = useState<string>("");
    const [isSendingOTP, setIsSendingOTP] = useState<boolean>(false);
    const [otpCooldown, setOtpCooldown] = useState<number>(0);
    const [alert, setAlert] = useState<{
        isOpen: boolean;
        type: "success" | "error" | "warning" | "info";
        title: string;
        message: string;
    } | null>(null);
    const [userData, setUserData] = useState<{
        fullName: string;
        email: string;
        matricNumber: string;
        password: string;
        confirmPassword: string;
        role: string;
        membershipStatus: string;
        terms?: boolean;
    }>({
        fullName: "",
        email: "",
        matricNumber: "",
        password: "",
        confirmPassword: "",
        role: "student",
        membershipStatus: "non-member",
        terms: false,
    });

    // TODO: Change back to 5 when email verification is enabled i.e when I get a domain name
    const totalSteps = 4; // Temporarily 4 steps (email verification step 2 is commented out)
    // const totalSteps = 5; // With email verification enabled

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    // Animation variants for sliding steps
    const stepVariants: Variants = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
        exit: { x: -50, opacity: 0, transition: { duration: 0.2 } }
    };

    const handleCreateAccount = async () => {
        // Check if all required fields are filled
        if (!userData.fullName 
            || !userData.email 
            || !userData.matricNumber 
            || !userData.password 
            || !userData.confirmPassword 
            || !userData.role 
            || !userData.membershipStatus 
            || !userData.terms) {
            setAlert({
                isOpen: true,
                type: "error",
                title: "Missing Information",
                message: "Please fill in all the required fields",
            });
            return;
        }

        // Check if passwords match
        if (userData.password !== userData.confirmPassword) {
            setAlert({
                isOpen: true,
                type: "error",
                title: "Password Mismatch",
                message: "Your passwords do not match. Please check and try again.",
            });
            return;
        }

        // Verify that either membership or studentship has been verified
        // isMember === true means verified member
        // isMember === false && isStudentVerified === true means verified non-member student
        if (isMember !== true && !(isMember === false && isStudentVerified === true)) {
            setAlert({
                isOpen: true,
                type: "error",
                title: "Verification Required",
                message: "Please verify your membership or studentship status before creating an account",
            });
            return;
        }

        try {
            const response = await axios.post("/api/auth/register", userData);
            if (response.status === 201) {
                setAlert({
                    isOpen: true,
                    type: "success",
                    title: "Account created successfully",
                    message: "Your account has been created successfully",
                });
                // Optionally redirect to login after a delay
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error: any) {
            setAlert({
                isOpen: true,
                type: "error",
                title: "Failed to create account",
                message: error.response?.data?.error || "An error occurred",
            });
        }
    }

    // const handleVerifyMembership = async () => {
    //     if (!userData.email || !userData.matricNumber) {
    //         setAlert({
    //             isOpen: true,
    //             type: "warning",
    //             title: "Missing Information",
    //             message: "Please fill in your email and matric number first",
    //         });
    //         return;
    //     }

    //     try {
    //         const response = await axios.post("/api/auth/verify-membership", {
    //             email: userData.email,
    //             matricNumber: userData.matricNumber,
    //         });
    //         setIsMember(response.data.isMember);
    //     } catch (error: any) {
    //         setAlert({
    //             isOpen: true,
    //             type: "error",
    //             title: "Verification Failed",
    //             message: error.response?.data?.error || "Failed to verify membership",
    //         });
    //         setIsMember(false);
    //     }
    // }

    // Handle sending OTP
    const handleSendOTP = async () => {
        if (!userData.email) {
            setAlert({
                isOpen: true,
                type: "warning",
                title: "Email Required",
                message: "Please enter your email address first",
            });
            return;
        }

        setIsSendingOTP(true);
        try {
            await axios.post("/api/auth/send-otp", { email: userData.email });
            setAlert({
                isOpen: true,
                type: "success",
                title: "Code Sent",
                message: "A verification code has been sent to your email. Please check your inbox.",
            });
            setOtpCooldown(60); // 60 second cooldown
            const interval = setInterval(() => {
                setOtpCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error: any) {
            setAlert({
                isOpen: true,
                type: "error",
                title: "Failed to Send Code",
                message: error.response?.data?.error || "Failed to send verification code. Please try again.",
            });
        } finally {
            setIsSendingOTP(false);
        }
    };

    // Handle verifying OTP
    const handleVerifyOTP = async () => {
        if (!otpCode || otpCode.length !== 6) {
            setAlert({
                isOpen: true,
                type: "warning",
                title: "Invalid Code",
                message: "Please enter the 6-digit verification code",
            });
            return;
        }

        try {
            await axios.post("/api/auth/verify-otp", {
                email: userData.email,
                code: otpCode,
            });
            setIsEmailVerified(true);
            setAlert({
                isOpen: true,
                type: "success",
                title: "Email Verified",
                message: "Your email address has been successfully verified!",
            });
        } catch (error: any) {
            setAlert({
                isOpen: true,
                type: "error",
                title: "Verification Failed",
                message: error.response?.data?.error || "Invalid verification code. Please try again.",
            });
            setOtpCode("");
        }
    };

    const handleVerifyMembership = async (data: { email: string, matricNumber: string }) => {
        if (!data.email || !data.matricNumber) {
            setAlert({
                isOpen: true,
                type: "warning",
                title: "Missing Information",
                message: "Please fill in your email and matric number first",
            });
            return;
        }

        try {
            const response = await axios.post("/api/auth/verify-membership", {
                email: data.email,
                matricNumber: data.matricNumber,
            });
            
            if (response.data.isMember === true) {
                setIsMember(true);
                setIsStudentVerified(false); // Reset studentship verification when membership is verified
                setUserData({ ...userData, membershipStatus: "member" });
                setAlert({
                    isOpen: true,
                    type: "success",
                    title: "Membership Verified",
                    message: "Your matric number has been verified as a NAEEES member",
                });
            } else {
                // If not a member, reset state but don't allow proceeding
                setIsMember(null);
                setIsStudentVerified(false);
                setUserData({ ...userData, membershipStatus: "non-member" });
                setAlert({
                    isOpen: true,
                    type: "info",
                    title: "Not a Member",
                    message: "This matric number is not registered as a NAEEES member. You can still verify your studentship instead.",
                });
            }
        } catch (error: any) {
            setIsMember(null);
            setIsStudentVerified(false);
            setAlert({
                isOpen: true,
                type: "error",
                title: "Verification Failed",
                message: error.response?.data?.error || "Failed to verify membership. Please try again.",
            });
        }
    }

    const handleVerifyStudentship = async (data: { email: string, matricNumber: string }) => {
        if (!data.email || !data.matricNumber) {
            setAlert({
                isOpen: true,
                type: "warning",
                title: "Missing Information",
                message: "Please fill in your email and matric number first",
            });
            return;
        }

        try {
            const response = await axios.post("/api/auth/verify-studentship", {
                email: data.email,
                matricNumber: data.matricNumber,
            });
            if (response.data.isStudent === true) {
                setIsMember(false); // Explicitly set to false for verified non-member
                setIsStudentVerified(true); // Mark studentship as verified
                setUserData({ ...userData, membershipStatus: "non-member" });
                setAlert({
                    isOpen: true,
                    type: "success",
                    title: "Studentship Confirmed",
                    message: "Your studentship has been confirmed as a student of the Federal University of Technology, Minna",
                });
            } else {
                setIsMember(null);
                setIsStudentVerified(false);
                setAlert({
                    isOpen: true,
                    type: "error",
                    title: "Not a Student",
                    message: "This matric number is not registered as a student of the Federal University of Technology, Minna",
                });
            }
        } catch (error: any) {
            setIsMember(null);
            setIsStudentVerified(false);
            setAlert({
                isOpen: true,
                type: "error",
                title: "Failed to Confirm Studentship",
                message: error.response?.data?.error || "Failed to confirm studentship. Please try again.",
            });
        }
    }
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the NAEEES Digital Portal and access your digital engineering campus."
            contextText="Create your student account to access academic materials, track your CGPA, participate in events, and engage with fellow engineering students."
        >
            <div className="space-y-8">

                {/* THE ALERT COMPONENT */}
                {alert && (
                    <CustomAlert
                        isOpen={alert.isOpen}
                        onClose={() => setAlert(null)}
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                    />
                )}

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
                                        value={userData.fullName}
                                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                    />
                                    <AuthInput
                                        label="School Email Address"
                                        type="email"
                                        placeholder="4our0ero4our@st.futminna.edu.ng"
                                        helperText="This will be used to verify your student identity."
                                        value={userData.email}
                                        onChange={(e) => {
                                            const newEmail = e.target.value;
                                            // Reset verification if email changes
                                            if (newEmail !== userData.email && isEmailVerified) {
                                                setIsEmailVerified(false);
                                                setOtpCode("");
                                            }
                                            setUserData({ ...userData, email: newEmail });
                                        }}
                                    />
                                    <AuthInput
                                        label="Matric Number"
                                        placeholder="e.g. 2025/1/40404EE"
                                        helperText="Used to confirm department and membership eligibility."
                                        icon={<FaIdCard />}
                                        value={userData.matricNumber}
                                        onChange={(e) => setUserData({ ...userData, matricNumber: e.target.value })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: EMAIL VERIFICATION - DISABLED FOR DEVELOPMENT */}
                        {/* TODO: Change false to (step === 2) when email verification is set up in production */}
                        {false && step === 2 && (
                            <motion.div
                                key="step2"
                                variants={stepVariants}
                                initial="hidden" animate="visible" exit="exit"
                                className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                            >
                                <FormSectionHeader 
                                    title="Verify Your Email" 
                                    subtitle="We'll send a verification code to confirm your email address." 
                                />

                                <div className="space-y-6">
                                    {/* Email Display */}
                                    <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email Address</p>
                                        <p className="text-lg font-bold text-black flex items-center gap-2">
                                            <FaEnvelope className="text-[#22C55E]" />
                                            {userData.email || "Not provided"}
                                        </p>
                                    </div>

                                    {/* Send OTP Button */}
                                    {!isEmailVerified && (
                                        <div>
                                            <AuthButton
                                                onClick={handleSendOTP}
                                                type="button"
                                                disabled={isSendingOTP || otpCooldown > 0}
                                            >
                                                {isSendingOTP ? (
                                                    "Sending..."
                                                ) : otpCooldown > 0 ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <FaClock /> Resend Code ({otpCooldown}s)
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <FaEnvelope /> Send Verification Code
                                                    </span>
                                                )}
                                            </AuthButton>
                                        </div>
                                    )}

                                    {/* OTP Input */}
                                    {!isEmailVerified && (
                                        <div className="space-y-4">
                                            <AuthInput
                                                label="Verification Code"
                                                type="text"
                                                placeholder="Enter 6-digit code"
                                                helperText="Enter the 6-digit code sent to your email"
                                                icon={<FaEnvelope />}
                                                value={otpCode}
                                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                                maxLength={6}
                                                autoFocus
                                            />
                                            <AuthButton
                                                onClick={handleVerifyOTP}
                                                type="button"
                                                disabled={otpCode.length !== 6}
                                            >
                                                Verify Email
                                            </AuthButton>
                                        </div>
                                    )}

                                    {/* Verification Success */}
                                    {isEmailVerified && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-6 bg-[#22C55E]/10 border-2 border-[#22C55E] rounded-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FaCheckCircle className="text-[#22C55E] text-2xl shrink-0" />
                                                <div>
                                                    <p className="font-bold text-black text-lg">Email Verified!</p>
                                                    <p className="text-sm text-gray-600 font-medium">
                                                        Your email address has been successfully verified. You can proceed to the next step.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Helper Text */}
                                    {!isEmailVerified && (
                                        <div className="p-4 bg-[#EAB308]/10 border-l-4 border-[#EAB308] rounded-r-lg text-sm font-bold text-gray-800">
                                            <p className="mb-1">💡 Didn't receive the code?</p>
                                            <p>Check your spam folder or wait {otpCooldown > 0 ? `${otpCooldown} seconds` : "a moment"} and try resending.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: MEMBERSHIP (was step 3, renumbered for development) */}
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
                                        onClick={() => handleVerifyMembership({ email: userData.email, matricNumber: userData.matricNumber })}
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
                                        onClick={() => handleVerifyStudentship({ email: userData.email, matricNumber: userData.matricNumber })}
                                        className={`cursor-pointer border-3 rounded-xl p-6 transition-all duration-200 relative overflow-hidden group ${isMember === false && isStudentVerified ? 'border-black bg-gray-50 shadow-[4px_4px_0px_0px_black]' : 'border-gray-200 hover:border-black hover:shadow-md'}`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-lg text-black">⭕ Not a Member</span>
                                            {isMember === false && isStudentVerified && <FaCheckCircle className="text-black text-xl" />}
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed">Non-members can still access selected resources and register for public events. Your studentship will be verified.</p>
                                    </div>
                                </div>

                                {/* Conditional Helper Text */}
                                {isMember === true && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-6 p-4 bg-[#22C55E]/10 border-l-4 border-[#22C55E] rounded-r-lg text-sm font-bold text-gray-800"
                                    >
                                        ✓ Your membership has been verified. You can proceed to the next step.
                                    </motion.div>
                                )}
                                {isMember === false && isStudentVerified && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-6 p-4 bg-[#22C55E]/10 border-l-4 border-[#22C55E] rounded-r-lg text-sm font-bold text-gray-800"
                                    >
                                        ✓ Your studentship has been verified. You can proceed to the next step.
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* STEP 3: SECURITY (was step 4, renumbered for development) */}
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
                                        value={userData.password}
                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                    />
                                    {userData.confirmPassword !== userData.password && (<div className="flex items-center gap-2 text-red-500">
                                        <FaExclamationTriangle className="text-red-500 text-xl" />
                                        <span className="text-sm text-red-500 font-medium leading-relaxed">
                                            Your confirmation password does not match your password.
                                        </span>
                                    </div>)}
                                    <AuthInput
                                        label="Confirm Password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={userData.confirmPassword}
                                        onChange={(e) =>  setUserData({ ...userData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: AGREEMENT (was step 5, renumbered for development) */}
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
                                        <li>• Role: {userData?.role}</li>
                                        <li>• Membership: {isMember === true ? "Verified Member" : isMember === false && isStudentVerified ? "Verified Student (Non-Member)" : "Not Verified"}</li>
                                        <li>• Full Name: {userData?.fullName}</li>
                                        <li>• Email: {userData?.email}</li>
                                        <li>• Matric Number: {userData?.matricNumber}</li>
                                        <li>• Membership Status: {userData?.membershipStatus}</li>
                                        <li>• Terms: {userData?.terms ? "Accepted" : "Not Accepted"}</li>
                                    </ul>
                                </div>

                                <div className="flex items-start gap-4 p-4 border-2 border-[#EAB308]/30 bg-[#EAB308]/5 rounded-xl">
                                    <input type="checkbox" id="terms" className="mt-1 w-5 h-5 accent-[#22C55E] cursor-pointer" checked={userData.terms || false} onChange={(e) => setUserData({ ...userData, terms: e.target.checked })} />
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
                            <AuthButton 
                                onClick={nextStep} 
                                type="button"
                                disabled={
                                    // Email verification step is commented out
                                    // (step === 2 && !isEmailVerified) || // Email verification step - COMMENTED OUT
                                    (step === 1 && (!userData.fullName || !userData.email || !userData.matricNumber)) || // Personal info step
                                    (step === 2 && !(isMember === true || (isMember === false && isStudentVerified === true))) // Membership/Studentship verification step
                                }
                            >
                                <span className="flex items-center justify-center gap-2">Next Step <FaArrowRight /></span>
                            </AuthButton>
                        ) : (
                            <AuthButton type="submit" onClick={handleCreateAccount}>
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