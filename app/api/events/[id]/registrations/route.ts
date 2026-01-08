
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { EventRegistration } from "@/app/models/EventRegistration.model";
import { User } from "@/app/models/User.model";

// GET: List all registrations for an event (Admin Only)
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        await connectDB();

        // Await params if it's a Promise
        const resolvedParams = params instanceof Promise ? await params : params;

        const registrations = await EventRegistration.find({ event: resolvedParams.id })
            .populate("user", "fullName email matricNumber membershipStatus")
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: registrations });

    } catch (error) {
        console.error("List registrations error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
