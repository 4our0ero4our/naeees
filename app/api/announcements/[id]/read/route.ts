import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Announcement } from "@/app/models/Announcement.model";

// POST: Mark Announcement as Read
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const userId = (session.user as any).id;

        // Add user ID to readBy array if not already present
        await Announcement.findByIdAndUpdate(
            id,
            { $addToSet: { readBy: userId } },
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Marked as read" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
