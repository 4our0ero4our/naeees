
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { SemesterRecord } from "@/app/models/SemesterRecord.model";
import { auth } from "@/auth";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;
        const body = await req.json();
        const { title, level, semester, courses } = body;

        // Recalculate if courses are updated
        let updateData: any = { title, level, semester };

        if (courses) {
            let totalUnits = 0;
            let totalPoints = 0;

            courses.forEach((course: any) => {
                const unit = parseFloat(course.unit);
                const gradePoint = parseFloat(course.gradePoint);

                if (!isNaN(unit) && !isNaN(gradePoint)) {
                    totalUnits += unit;
                    totalPoints += unit * gradePoint;
                }
            });

            const gpa = totalUnits > 0 ? parseFloat((totalPoints / totalUnits).toFixed(2)) : 0;

            updateData.courses = courses;
            updateData.totalUnits = totalUnits;
            updateData.gpa = gpa;
        }

        await connectDB();

        const updatedRecord = await SemesterRecord.findOneAndUpdate(
            { _id: id, userId: session.user.id },
            updateData,
            { new: true }
        );

        if (!updatedRecord) {
            return NextResponse.json(
                { success: false, message: "Record not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedRecord });
    } catch (error: any) {
        console.error("Error updating CGPA record:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update record" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;
        await connectDB();

        const deletedRecord = await SemesterRecord.findOneAndDelete({
            _id: id,
            userId: session.user.id,
        });

        if (!deletedRecord) {
            return NextResponse.json(
                { success: false, message: "Record not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Record deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting CGPA record:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete record" },
            { status: 500 }
        );
    }
}
