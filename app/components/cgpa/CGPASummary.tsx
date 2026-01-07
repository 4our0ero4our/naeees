
import { motion } from "framer-motion";

interface CGPASummaryProps {
    cgpa: string;
    totalUnits: number;
    semesterCount: number;
}

export default function CGPASummary({ cgpa, totalUnits, semesterCount }: CGPASummaryProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black text-white p-6 rounded-2xl shadow-[6px_6px_0px_0px_#EAB308] border-2 border-black"
            >
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Current CGPA</p>
                <h2 className="text-5xl font-heading font-black">{cgpa}</h2>
                <p className="text-gray-400 text-xs mt-2">Based on your records</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-[6px_6px_0px_0px_black] border-2 border-black"
            >
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Units</p>
                <h2 className="text-5xl font-heading font-black text-black">{totalUnits}</h2>
                <p className="text-gray-400 text-xs mt-2">Courses completed</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-[6px_6px_0px_0px_black] border-2 border-black"
            >
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Semesters</p>
                <h2 className="text-5xl font-heading font-black text-black">{semesterCount}</h2>
                <p className="text-gray-400 text-xs mt-2">Recorded so far</p>
            </motion.div>
        </div>
    );
}
