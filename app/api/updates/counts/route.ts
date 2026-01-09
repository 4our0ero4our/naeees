import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { Event } from "@/app/models/Event.model";
import { Material } from "@/app/models/Material.model";
import { Post } from "@/app/models/Post.model";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url); // Use standard URL constructor

        const lastEvents = searchParams.get("events");
        const lastMaterials = searchParams.get("materials");
        const lastForum = searchParams.get("forum");

        const counts = {
            events: 0,
            materials: 0,
            forum: 0
        };

        // Helper to count since date
        const countSince = async (model: any, lastSeen: string | null, extraQuery: any = {}) => {
            if (!lastSeen) return 0; // If never seen, maybe show 0 or assume all? Let's show 0 to be safe/less annoying initially, or handle on frontend.
            // Actually, if !lastSeen, logic usually implies "everything is new".
            // But for a count, that might be huge. Let's filter to recent (e.g. last 30 days) if no date provided?
            // For now, let's respect: if date provided, count > date. If not, return 0 (or let frontend handle 'new' bool if needed).
            // Based on user request, they want NUMBERS.

            try {
                const date = new Date(lastSeen);
                if (isNaN(date.getTime())) return 0;
                return await model.countDocuments({ ...extraQuery, createdAt: { $gt: date } });
            } catch {
                return 0;
            }
        };

        counts.events = await countSince(Event, lastEvents);
        counts.materials = await countSince(Material, lastMaterials);
        counts.forum = await countSince(Post, lastForum, { type: { $ne: 'announcement' } });

        return NextResponse.json({ success: true, counts });

    } catch (error) {
        console.error("Count check error", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
