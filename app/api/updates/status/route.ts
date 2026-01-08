
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { Event } from "@/app/models/Event.model";
import { Material } from "@/app/models/Material.model";
import { Post } from "@/app/models/Post.model";
import { auth } from "@/auth";

export async function GET(req: Request) {
    try {
        await connectDB();
        // Optional: Check auth if needed, but badges can be public or semi-public
        // const session = await auth();

        // Get latest timestamps
        // We use .sort({ createdAt: -1 }).limit(1).select("createdAt") to be efficient

        const latestEvent = await Event.findOne({}, { createdAt: 1 }).sort({ createdAt: -1 });
        const latestMaterial = await Material.findOne({}, { createdAt: 1 }).sort({ createdAt: -1 });
        const latestForumPost = await Post.findOne({ type: { $ne: 'announcement' } }, { createdAt: 1 }).sort({ createdAt: -1 });
        const latestAnnouncement = await Post.findOne({ type: 'announcement' }, { createdAt: 1 }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            timestamps: {
                events: latestEvent?.createdAt || null,
                materials: latestMaterial?.createdAt || null,
                forum: latestForumPost?.createdAt || null,
                announcements: latestAnnouncement?.createdAt || null
            }
        });

    } catch (error) {
        console.error("Status check error", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
