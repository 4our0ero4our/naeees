import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Notification } from "@/app/models/Notification.model";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ count: 0 });
        }

        await connectDB();
        const userId = (session.user as any).id;

        const count = await Notification.countDocuments({
            recipient: userId,
            isRead: false
        });

        return NextResponse.json({ count });
    } catch (error) {
        console.error("Unread count error:", error);
        return NextResponse.json({ count: 0 }); // Fail safe to 0
    }
}
