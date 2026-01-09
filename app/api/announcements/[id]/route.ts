import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Announcement } from "@/app/models/Announcement.model";

// GET: Single Announcement
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const announcement = await Announcement.findById(id).populate("author", "fullName");
        if (!announcement) {
            return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: announcement });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// PATCH: Update Announcement
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;
        const body = await req.json(); // Handling JSON updates for now (text/status)
        // Note: For image updates, we might need a separate endpoint or form-data handling here too, 
        // but for now keeping it simple for status/content updates.

        await connectDB();

        const existingAnnouncement = await Announcement.findById(id);
        if (!existingAnnouncement) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

        // Handle Publishing Logic
        let updates = { ...body };
        if (body.status === "Published" && existingAnnouncement.status !== "Published") {
            updates.publishedAt = new Date();
        }

        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Updated successfully", data: updatedAnnouncement });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// DELETE: Archive/Soft Delete
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;
        await connectDB();
        // Soft delete -> Archive
        const archived = await Announcement.findByIdAndUpdate(
            id,
            { status: "Archived" },
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Archived sccessfully", data: archived });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
