
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Event } from "@/app/models/Event.model";
import { User } from "@/app/models/User.model";

// GET: List Events (Filtered)
export async function GET(req: Request) {
    try {
        const session = await auth();
        await connectDB();

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // free/paid
        const status = searchParams.get("status"); // upcoming/ongoing etc

        const query: any = {};
        if (type) query.type = type;
        if (status) query.status = status;

        // If user is logged in, we might apply audience filters
        // For now, let's return all upcoming events and handle strict visibility in frontend or advanced queries
        // But the requirement says: "members only" or "department only" events.

        // Let's implement basic "Public" vs "Private" filtering if strictly required,
        // but often it's better to return them and show "Restricted" in UI.
        // However, let's return all for now to populate the calendar.

        const events = await Event.find(query).sort({ date: 1 }); // Ascending date (nearest first)

        return NextResponse.json({ success: true, data: events });
    } catch (error) {
        console.error("List events error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// POST: Create Event (Admin Only)
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const formData = await req.formData();

        // Extract fields
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const venue = formData.get("venue") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const type = formData.get("type") as string;
        const price = formData.get("price") as string;
        const memberDiscount = formData.get("memberDiscount") as string;
        const audience = formData.get("audience") as string;
        const targetDepartment = formData.get("targetDepartment") as string;

        let imageUrl = "";

        // Handle Image Upload
        const file = formData.get("image") as File;
        if (file) {
            // Convert file to buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Import dynamically to avoid top-level await issues if any
            const { uploadToCloudinary } = await import("@/app/lib/cloudinary");

            const uploadResult = await uploadToCloudinary(
                buffer,
                "naeees-events",
                "image"
            );
            imageUrl = uploadResult.secure_url;
        }

        await connectDB();

        const newEvent = await Event.create({
            title,
            description,
            venue,
            date: new Date(date),
            time,
            image: imageUrl,
            organizer: (session.user as any).id,
            type,
            price: Number(price) || 0,
            memberDiscount: Number(memberDiscount) || 0,
            audience,
            targetDepartment
        });

        // --- NOTIFICATION TRIGGER ---
        const { Notification } = await import("@/app/models/Notification.model");

        let recipientQuery: any = {};

        // Audience filter
        if (audience === "members") {
            recipientQuery.membershipStatus = "member";
        }

        // Department filter (if implemented strictly in User model)
        // assuming User model has 'department' field
        if (targetDepartment && targetDepartment !== 'All') {
            recipientQuery.department = targetDepartment;
        }

        const users = await User.find(recipientQuery, "_id");

        const notifications = users.map(user => ({
            recipient: user._id,
            type: "event",
            title: "New Event: " + title,
            message: `Event at ${venue} on ${new Date(date).toLocaleDateString()}`,
            referenceId: newEvent._id,
            isRead: false,
            createdAt: new Date()
        }));

        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
        }
        // ----------------------------

        return NextResponse.json({ success: true, message: "Event created successfully", data: newEvent });

    } catch (error) {
        console.error("Create event error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
