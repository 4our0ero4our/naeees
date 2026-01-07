
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaChevronRight } from "react-icons/fa";

interface SemesterCardProps {
    record: any;
    onEdit: (record: any) => void;
    onDelete: (id: string) => void;
}

export default function SemesterCard({ record, onEdit, onDelete }: SemesterCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className="bg-white border-3 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_#22C55E] transition-all group cursor-default"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="bg-[#EAB308] border-2 border-black px-2 py-1 rounded text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_black]">
                        {record.level}
                    </span>
                    <span className="ml-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                        {record.semester} Semester
                    </span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(record)}
                        className="w-8 h-8 flex items-center justify-center border-2 border-black rounded bg-gray-50 hover:bg-black hover:text-white transition-colors"
                    >
                        <FaEdit size={12} />
                    </button>
                    <button
                        onClick={() => onDelete(record._id)}
                        className="w-8 h-8 flex items-center justify-center border-2 border-black rounded bg-red-50 hover:bg-red-500 hover:text-white text-red-500 transition-colors"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>

            <h3 className="font-heading font-black text-xl leading-tight mb-4 text-black line-clamp-2">
                {record.title}
            </h3>

            <div className="grid grid-cols-2 gap-4 py-4 border-t-2 border-gray-100">
                <div>
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">GPA</p>
                    <p className="text-2xl font-black text-black">{record.gpa?.toFixed(2)}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Units</p>
                    <p className="text-2xl font-black text-black">{record.totalUnits}</p>
                </div>
            </div>

            <div className="mt-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>{record.courses?.length || 0} Courses Recorded</span>
                    <FaChevronRight className="text-gray-400" />
                </div>
            </div>
        </motion.div>
    );
}
