
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { EventRegistration } from "@/app/models/EventRegistration.model";

// PATCH: Approve/Reject Registration
export async function PATCH(req: Request, { params }: { params: { id: string } }) { // id here is Registration ID
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { status } = body; // 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
        }

        await connectDB();

        // Await params if Promise
        const resolvedParams = params instanceof Promise ? await params : params;

        const registration = await EventRegistration.findByIdAndUpdate(
            resolvedParams.id,
            { paymentStatus: status },
            { new: true }
        );

        if (!registration) {
            return NextResponse.json({ success: false, message: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: `Registration ${status}`, data: registration });

    } catch (error) {
        console.error("Update registration error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
