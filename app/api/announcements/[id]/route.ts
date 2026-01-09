import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Announcement } from "@/app/models/Announcement.model";

// GET: Single Announcement
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await connectDB();
        const { id } = params;
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
export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const { id } = params;
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

        // --- NOTIFICATION TRIGGER ---
        // If status changed to Published (or was already Published and we are just updating content but that might spam, 
        // usually we only notify on *becoming* Published).
        if (body.status === "Published" && existingAnnouncement.status !== "Published") {
            try {
                const { Notification } = await import("@/app/models/Notification.model");
                const { User } = await import("@/app/models/User.model");

                const title = updates.title || existingAnnouncement.title;
                const category = updates.category || existingAnnouncement.category;
                const visibility = updates.visibility || existingAnnouncement.visibility;

                let recipientQuery = {};
                if (visibility === "MembersOnly") {
                    recipientQuery = { membershipStatus: "member" };
                }

                const users = await User.find(recipientQuery, "_id");
                const notifications = users.map(user => ({
                    recipient: user._id,
                    type: "announcement",
                    title: "New Announcement: " + title,
                    message: `New announcement in ${category}`,
                    referenceId: updatedAnnouncement._id,
                    isRead: false,
                    createdAt: new Date()
                }));

                if (notifications.length > 0) {
                    await Notification.insertMany(notifications);
                }
            } catch (err) {
                console.error("Failed to send notifications for announcement update", err);
            }
        }
        // ----------------------------

        return NextResponse.json({ success: true, message: "Updated successfully", data: updatedAnnouncement });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// DELETE: Archive/Soft Delete
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const { id } = params;
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
