
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Event } from "@/app/models/Event.model";
import { EventRegistration } from "@/app/models/EventRegistration.model";

// GET: Get Single Event Details + User Registration Status
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        await connectDB();

        // Await params if it's a Promise (Next.js 15+)
        // const resolvedParams = params instanceof Promise ? await params : params;
        const event = await Event.findById(params.id).populate("organizer", "fullName email");
        if (!event) {
            return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
        }

        let registration = null;
        if (session && session.user) {
            registration = await EventRegistration.findOne({
                event: params.id,
                user: (session.user as any).id
            });
        }

        return NextResponse.json({ success: true, data: event, registration });

    } catch (error) {
        console.error("Get event error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// PATCH: Update Event (Admin)
export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        await connectDB();

        // Await params if it's a Promise (Next.js 15+)
        // const resolvedParams = params instanceof Promise ? await params : params;
        const updatedEvent = await Event.findByIdAndUpdate(params.id, body, { new: true });

        return NextResponse.json({ success: true, message: "Event updated", data: updatedEvent });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// DELETE: Cancel/Delete Event
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        await connectDB();

        // Await params if it's a Promise (Next.js 15+)
        // const resolvedParams = params instanceof Promise ? await params : params;
        await Event.findByIdAndDelete(params.id);

        // Optionally delete registrations or mark them cancelled?
        // For simplicity, just removing event now. 

        return NextResponse.json({ success: true, message: "Event deleted" });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
