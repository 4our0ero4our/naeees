import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Notification } from "@/app/models/Notification.model";
import { User } from "@/app/models/User.model";

// GET: Fetch User Notifications
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const userId = (session.user as any).id;

        // Parse query params for filters if needed eventually
        // const { searchParams } = new URL(req.url);
        // const type = searchParams.get('type');

        const notifications = await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50 for now

        return NextResponse.json({ success: true, data: notifications });
    } catch (error) {
        console.error("Fetch notifications error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// POST: Internal/System Create (Optional, triggers usually happen in other routes)
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { type, title, message, referenceId, targetAudience } = body;
        // targetAudience: 'all', 'members', or specific userId

        await connectDB();

        let recipients = [];
        if (targetAudience === 'all') {
            const users = await User.find({}, '_id');
            recipients = users.map(u => u._id);
        } else if (targetAudience === 'members') {
            const users = await User.find({ membershipStatus: 'member' }, '_id');
            recipients = users.map(u => u._id);
        } else {
            // specific user
            recipients = [targetAudience];
        }

        const notificationsToInsert = recipients.map(userId => ({
            recipient: userId,
            type,
            title,
            message,
            referenceId,
            isRead: false,
            createdAt: new Date()
        }));

        if (notificationsToInsert.length > 0) {
            await Notification.insertMany(notificationsToInsert);
        }

        return NextResponse.json({ success: true, message: `Sent to ${recipients.length} users` });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
