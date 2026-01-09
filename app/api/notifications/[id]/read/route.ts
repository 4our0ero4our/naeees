import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Notification } from "@/app/models/Notification.model";

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const userId = (session.user as any).id;
        const notificationId = params.id;

        // Ensure user owns this notification
        const notification = await Notification.findOne({ _id: notificationId, recipient: userId });

        if (!notification) {
            return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
        }

        notification.isRead = true;
        await notification.save();

        return NextResponse.json({ success: true, data: notification });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
