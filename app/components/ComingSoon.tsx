"use client";

import { motion } from "framer-motion";
import { FaHardHat, FaTools } from "react-icons/fa";

interface ComingSoonProps {
    title?: string;
    description?: string;
}

export default function ComingSoon({
    title = "Coming Soon",
    description = "We're currently building something awesome here. Check back later!"
}: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="relative mb-8">
                {/* Animated Background Blob */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-yellow-100 rounded-full blur-xl opacity-50"
                />

                {/* Icon Container */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="relative w-24 h-24 bg-[#EAB308] border-4 border-black rounded-2xl flex items-center justify-center shadow-[8px_8px_0px_0px_black] rotate-3"
                >
                    <FaHardHat className="text-4xl text-black" />

                    {/* Floating Tool */}
                    <motion.div
                        animate={{
                            y: [-10, 10, -10],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                        className="absolute -right-6 -bottom-4 text-3xl text-black drop-shadow-lg bg-white p-2 rounded-lg border-2 border-black"
                    >
                        <FaTools />
                    </motion.div>
                </motion.div>
            </div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading font-black text-4xl mb-4 text-black"
            >
                {title}<motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-[#22C55E]"
                >.</motion.span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-md text-gray-600 font-bold text-lg"
            >
                {description}
            </motion.p>

            {/* Progress Bar (Fake) */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-xs h-4 bg-gray-200 rounded-full border-2 border-black mt-8 overflow-hidden relative"
            >
                <motion.div
                    className="h-full bg-[#22C55E] relative"
                    animate={{ width: ["10%", "45%", "60%", "75%"] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]" style={{
                        backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                        backgroundSize: '1rem 1rem'
                    }} />
                </motion.div>
            </motion.div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">Work in Progress</p>
        </div>
    );
}
