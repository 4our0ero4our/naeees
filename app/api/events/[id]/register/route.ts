
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Event } from "@/app/models/Event.model";
import { EventRegistration } from "@/app/models/EventRegistration.model";
import { User } from "@/app/models/User.model";

function generateTicketCode() {
    return "TKT-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: "Please login to register" }, { status: 401 });
        }

        // Await params if it's a Promise (Next.js 15+)
        const resolvedParams = params instanceof Promise ? await params : params;

        const userId = (session.user as any).id;
        const userRole = (session.user as any).role;
        // Fetch fresh user data for membership check
        await connectDB();
        const user = await User.findById(userId);
        if (!user) return NextResponse.json({ success: false }, { status: 401 });

        const event = await Event.findById(resolvedParams.id);
        if (!event) return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });

        // Check if already registered
        const existingReg = await EventRegistration.findOne({ event: resolvedParams.id, user: userId });
        if (existingReg) {
            return NextResponse.json({ success: false, message: "Already registered" }, { status: 400 });
        }

        // Audience Check
        if (event.audience === "members" && user.membershipStatus !== "member") {
            return NextResponse.json({ success: false, message: "This event is for members only." }, { status: 403 });
        }
        // TODO: Department check if needed

        const body = await req.json();
        const { paymentReceipt } = body;
        // Note: For now assuming image URL is passed from frontend Cloudinary upload.

        let paymentStatus = "free";

        if (event.type === "paid") {
            // Calculate strictly? Or assume frontend handles it?
            // User requested that free events get instant ticket, paid get pending.
            if (!paymentReceipt && event.price > 0) {
                return NextResponse.json({ success: false, message: "Payment receipt required" }, { status: 400 });
            }
            paymentStatus = "pending_approval";
        } else {
            paymentStatus = "approved"; // Free events instantly approved
        }

        const newRegistration = await EventRegistration.create({
            event: resolvedParams.id,
            user: userId,
            paymentStatus,
            paymentReceipt: paymentReceipt || null,
            ticketCode: generateTicketCode(),
            checkedIn: false
        });

        return NextResponse.json({ success: true, message: "Registration successful", data: newRegistration });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
