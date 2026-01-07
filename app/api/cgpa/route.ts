
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { SemesterRecord } from "@/app/models/SemesterRecord.model";
import { auth } from "@/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        const userId = session.user.id;

        // Fetch records sorted by updated time (or could be level/semester logic)
        // For now, sorting by creation descending so newest added is first
        const records = await SemesterRecord.find({ userId }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: records });
    } catch (error: any) {
        console.error("Error fetching CGPA records:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch records" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { title, level, semester, courses } = body;

        if (!title || !level || !semester || !courses) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Calculate GPA and Total Units
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

        await connectDB();
        const newRecord = await SemesterRecord.create({
            userId: session.user.id,
            title,
            level,
            semester,
            courses,
            totalUnits,
            gpa,
        });

        return NextResponse.json({ success: true, data: newRecord }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating CGPA record:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create record" },
            { status: 500 }
        );
    }
}
