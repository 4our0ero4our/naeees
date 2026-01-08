
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Student } from "@/app/models/Student.model";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Security Check: Must be super_admin
        if (!session || (session.user as any).role !== "super_admin") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        await connectDB();

        let successCount = 0;
        let errors = [];

        for (const row of jsonData as any[]) {
            try {
                // Normalize keys (handle case sensitivity if needed, but assuming exact match based on user request)
                // Expected: name, email, matricNumber, department, level, member

                if (!row.email || !row.matricNumber) {
                    continue; // Skip invalid rows
                }

                // Map 'member' (boolean) to 'isMember' schema field
                // Handle different boolean representations just in case (e.g. "TRUE", "true", 1)
                let isMember = false;
                if (typeof row.member === 'boolean') {
                    isMember = row.member;
                } else if (typeof row.member === 'string') {
                    isMember = row.member.toLowerCase() === 'true';
                }

                const studentData = {
                    name: row.name,
                    email: row.email,
                    matricNumber: row.matricNumber,
                    department: row.department,
                    level: row.level ? String(row.level) : "", // Ensure level is string
                    member: isMember
                };

                // Upsert: Update if exists, Insert if new
                await Student.findOneAndUpdate(
                    { email: row.email },
                    studentData,
                    { upsert: true, new: true }
                );
                successCount++;

            } catch (err: any) {
                console.error("Error processing row:", row, err);
                errors.push({ email: row.email, error: err.message });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully processed ${successCount} students.`,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Server error processing file" }, { status: 500 });
    }
}
