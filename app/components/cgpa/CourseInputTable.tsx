
import { FaTrash, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Course {
    id?: string;
    code: string;
    unit: string;
    grade: string;
    gradePoint: number;
}

interface CourseInputTableProps {
    courses: Course[];
    setCourses: (courses: Course[]) => void;
}

const GRADES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
    "E": 1,
    "F": 0
};

export default function CourseInputTable({ courses, setCourses }: CourseInputTableProps) {

    const handleAddRow = () => {
        setCourses([...courses, { code: "", unit: "", grade: "A", gradePoint: 5 }]);
    };

    const handleRemoveRow = (index: number) => {
        const newCourses = [...courses];
        newCourses.splice(index, 1);
        setCourses(newCourses);
    };

    const handleChange = (index: number, field: keyof Course, value: any) => {
        const newCourses = [...courses];

        // @ts-ignore
        newCourses[index][field] = value;

        // Auto-calculate grade point
        if (field === "grade") {
            // @ts-ignore
            newCourses[index].gradePoint = GRADES[value as keyof typeof GRADES] || 0;
        }

        setCourses(newCourses);
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-12 gap-2 mb-2 px-2">
                <div className="col-span-5 text-xs font-bold uppercase text-gray-500">Course Code</div>
                <div className="col-span-3 text-xs font-bold uppercase text-gray-500">Unit</div>
                <div className="col-span-3 text-xs font-bold uppercase text-gray-500">Grade</div>
                <div className="col-span-1"></div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                <AnimatePresence initial={false}>
                    {courses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-200"
                        >
                            <div className="col-span-5">
                                <input
                                    type="text"
                                    placeholder="EEE 101"
                                    className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-sm font-bold uppercase focus:border-black focus:outline-none"
                                    value={course.code}
                                    onChange={(e) => handleChange(index, "code", e.target.value)}
                                />
                            </div>
                            <div className="col-span-3">
                                <input
                                    type="number"
                                    placeholder="3"
                                    min="0"
                                    max="6"
                                    className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-sm font-bold focus:border-black focus:outline-none"
                                    value={course.unit}
                                    onChange={(e) => handleChange(index, "unit", e.target.value)}
                                />
                            </div>
                            <div className="col-span-3">
                                <select
                                    className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-sm font-bold focus:border-black focus:outline-none cursor-pointer"
                                    value={course.grade}
                                    onChange={(e) => handleChange(index, "grade", e.target.value)}
                                >
                                    {Object.keys(GRADES).map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button
                                    onClick={() => handleRemoveRow(index)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <button
                onClick={handleAddRow}
                className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold text-xs uppercase hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
            >
                <FaPlus /> Add Course
            </button>
        </div>
    );
}
