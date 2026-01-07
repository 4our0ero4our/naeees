"use client";

import React, { useState, FormEvent, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthLayout from "@/app/components/auth/AuthLayout";
import { AuthInput, AuthButton } from "@/app/components/auth/AuthComponents";
import { FaEye, FaLock, FaEnvelope } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import CustomAlert from "@/app/components/CustomAlert";

// Component that uses useSearchParams - must be wrapped in Suspense
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    // All hooks must be declared before any conditional returns
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{
        isOpen: boolean;
        type: "success" | "error" | "warning" | "info";
        title: string;
        message: string;
    } | null>(null);

    // Get callbackUrl from query params if it exists
    const callbackUrl = searchParams.get("callbackUrl") || "/dashbaord";

    // Redirect authenticated users to dashboard or callbackUrl
    useEffect(() => {
        if (status === "authenticated" && session) {
            // Use replace instead of push to prevent back button from going back to login
            router.replace(callbackUrl);
        }
    }, [status, session, router, callbackUrl]);

    // Show loading state while checking session
    if (status === "loading") {
        return (
            <AuthLayout
                title="Welcome Back"
                subtitle="Sign in to continue your academic journey on the NAEEES Digital Portal."
                contextText="Access your personalized academic dashboard, learning resources, events, and discussions — all in one secure place."
            >
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#22C55E] mb-4"></div>
                        <p className="text-gray-600 font-medium">Checking session...</p>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    // Don't render login form if already authenticated (redirect will happen)
    if (status === "authenticated") {
        return null;
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            // 1. Check User Status
            try {
                const statusRes = await axios.post("/api/auth/check-status", { email });
                if (statusRes.data.success && statusRes.data.exists) {
                    if (!statusRes.data.isActive) {
                        const suspendedMsg = "Your account has been suspended. Please contact the administrator.";
                        setError(suspendedMsg);
                        setAlert({
                            isOpen: true,
                            type: "error",
                            title: "Account Suspended",
                            message: suspendedMsg,
                        });
                        setLoading(false);
                        return; // Stop login process
                    }
                }
            } catch (statusErr) {
                console.error("Status check failed", statusErr);
                // Continue to login if check fails (fallback)
            }

            // 2. Proceed to Login
            const result = await signIn("credentials", {
                email,
                password,
                // callbackUrl: "/dashboard",
                redirect: false,
            });

            if (result?.error) {
                let errorMessage = "Invalid email or password";
                if (result.error === "account_suspended") {
                    errorMessage = "Your account has been suspended. Please contact the administrator.";
                } else if (result.error === "CredentialsSignin") {
                    errorMessage = "Invalid email or password.";
                }

                setError(errorMessage);
                setAlert({
                    isOpen: true,
                    type: "error",
                    title: "Login Failed",
                    message: errorMessage,
                });
                return;
            }

            if (result?.ok) {
                setAlert({
                    isOpen: true,
                    type: "success",
                    title: "Login Successful",
                    message: "You have been logged in successfully",
                });
                // Redirect to callbackUrl or dashboard after successful login
                router.replace(callbackUrl);
                router.refresh();
            }
        } catch (error: any) {
            setError("An unexpected error occurred");
            setAlert({
                isOpen: true,
                type: "error",
                title: "Login Failed",
                message: error.message || "An error occurred",
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue your academic journey on the NAEEES Digital Portal."
            contextText="Access your personalized academic dashboard, learning resources, events, and discussions — all in one secure place."
        >
            {alert && (
                <CustomAlert
                    isOpen={alert.isOpen}
                    onClose={() => setAlert(null)}
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                />
            )}
            <form className="space-y-6" onSubmit={handleLogin}>

                {/* Email */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <AuthInput
                        label="Email Address"
                        type="email"
                        placeholder="4our0ero4our@st.futminna.edu.ng"
                        helperText="Use the email address you registered with."
                        icon={<FaEnvelope />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="flex justify-end mt-2">
                        <Link href="/forgot-password">
                            <span className="text-sm font-bold text-[#EAB308] hover:text-black hover:underline transition-colors cursor-pointer">
                                Forgot your password?
                            </span>
                        </Link>
                    </div>
                </motion.div>

                {/*/!* REMOVED INLINE ERROR DISPLAY *!/*/}

                {/* CTAs */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4 space-y-4"
                >
                    <AuthButton type="submit" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In to Dashboard"}
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

// Main page component with Suspense boundary
export default function LoginPage() {
    return (
        <Suspense fallback={
            <AuthLayout
                title="Welcome Back"
                subtitle="Sign in to continue your academic journey on the NAEEES Digital Portal."
                contextText="Access your personalized academic dashboard, learning resources, events, and discussions — all in one secure place."
            >
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#22C55E] mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading...</p>
                    </div>
                </div>
            </AuthLayout>
        }>
            <LoginForm />
        </Suspense>
    );
}