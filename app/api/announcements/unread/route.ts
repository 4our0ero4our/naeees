import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Announcement } from "@/app/models/Announcement.model";
import { User } from "@/app/models/User.model";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const userId = (session.user as any).id;
        const user = await User.findById(userId);
        const isMember = user?.member === true;

        // Count logic:
        // Status = Published
        // Visibility matches user
        // UserId NOT in readBy array

        let visibilityFilter = ["Global"];
        if (isMember) visibilityFilter.push("MembersOnly");

        const unreadCount = await Announcement.countDocuments({
            status: "Published",
            visibility: { $in: visibilityFilter },
            readBy: { $ne: userId } // Not equal to user ID
        });

        return NextResponse.json({ success: true, count: unreadCount });

    } catch (error) {
        console.error("Unread count error", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
