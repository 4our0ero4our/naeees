import { Schema, models, model } from "mongoose";

const CourseSchema = new Schema({
    code: { type: String, required: true },
    unit: { type: Number, required: true },
    grade: { type: String, required: true },
    gradePoint: { type: Number, required: true }, // Calculated value (A=5, B=4, etc.)
});

const SemesterRecordSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true, // e.g. "100 Level - First Semester"
        },
        level: {
            type: String,
            enum: ["100L", "200L", "300L", "400L", "500L"],
            required: true,
        },
        semester: {
            type: String,
            enum: ["First", "Second"],
            required: true,
        },
        courses: [CourseSchema],
        totalUnits: {
            type: Number,
            default: 0,
        },
        gpa: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const SemesterRecord =
    models.SemesterRecord || model("SemesterRecord", SemesterRecordSchema);
