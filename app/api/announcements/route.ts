import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Announcement } from "@/app/models/Announcement.model";
import { User } from "@/app/models/User.model";

// GET: Fetch Announcements
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Get User Role and Membership status
        // We need to fetch the fresh user data to be sure about membership status
        const user = await User.findById((session.user as any).id);
        const isAdmin = user?.role === "admin" || user?.role === "super_admin";
        const isMember = user?.member === true;

        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        let query: any = {};

        // Role-based Filtering
        if (!isAdmin) {
            // Students only see PUBLISHED announcements
            query.status = "Published";

            // Visibility Logic
            if (isMember) {
                // Members see Global AND MembersOnly
                query.visibility = { $in: ["Global", "MembersOnly"] };
            } else {
                // Non-members see only Global
                query.visibility = "Global";
            }
        } else {
            // Admins can see everything, but allow filtering by status if requested
            const statusFilter = searchParams.get("status");
            if (statusFilter) query.status = statusFilter;
        }

        // Category Filter
        if (category && category !== "All") {
            query.category = category;
        }

        // Search Filter (Title)
        const search = searchParams.get("search");
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // Execute Query
        const totalDocs = await Announcement.countDocuments(query);
        const announcements = await Announcement.find(query)
            .sort({ publishedAt: -1, createdAt: -1 }) // Latest first
            .skip(skip)
            .limit(limit)
            .populate("author", "fullName email")
            .lean(); // Faster for read-only

        // Add 'isRead' flag for the current user
        const userIdString = (session.user as any).id;
        const announcementsWithReadStatus = announcements.map((ann: any) => ({
            ...ann,
            isRead: ann.readBy.map((id: any) => id.toString()).includes(userIdString)
        }));

        return NextResponse.json({
            success: true,
            data: announcementsWithReadStatus,
            pagination: {
                total: totalDocs,
                page,
                pages: Math.ceil(totalDocs / limit)
            }
        });

    } catch (error) {
        console.error("Fetch announcements error", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// POST: Create Announcement
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const formData = await req.formData();
        const title = formData.get("title");
        const content = formData.get("content");
        const category = formData.get("category");
        const visibility = formData.get("visibility");
        const status = formData.get("status") || "Draft";

        // Image Handling
        const files = formData.getAll("images") as File[];
        const featuredImageFile = formData.get("featuredImage") as File;

        let uploadedImages: string[] = [];
        let featuredImageUrl = "";

        // Import Cloudinary dynamically
        const { uploadToCloudinary } = await import("@/app/lib/cloudinary");

        // Upload Gallery Images
        if (files && files.length > 0) {
            for (const file of files) {
                if (file.size > 0) {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    const res = await uploadToCloudinary(buffer, "naeees-announcements", "image");
                    uploadedImages.push(res.secure_url);
                }
            }
        }

        // Upload Featured Image
        if (featuredImageFile && featuredImageFile.size > 0) {
            const bytes = await featuredImageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const res = await uploadToCloudinary(buffer, "naeees-announcements-featured", "image");
            featuredImageUrl = res.secure_url;
        }

        await connectDB();

        const newAnnouncement = await Announcement.create({
            title,
            content,
            category,
            visibility,
            status,
            author: (session.user as any).id,
            images: uploadedImages,
            featuredImage: featuredImageUrl,
            publishedAt: status === "Published" ? new Date() : null
        });

        // --- NOTIFICATION TRIGGER ---
        if (status === "Published") {
            const { Notification } = await import("@/app/models/Notification.model"); // Dynamic import to avoid circular dep if any
            let recipientQuery = {};

            if (visibility === "MembersOnly") {
                recipientQuery = { membershipStatus: "member" };
            }
            // If Global, recipientQuery is {} (all users)

            const users = await User.find(recipientQuery, "_id");
            const notifications = users.map(user => ({
                recipient: user._id,
                type: "announcement",
                title: "New Announcement: " + title,
                message: `New announcement in ${category}`, // Simplified message
                referenceId: newAnnouncement._id,
                isRead: false,
                createdAt: new Date()
            }));

            if (notifications.length > 0) {
                await Notification.insertMany(notifications);
            }
        }
        // ----------------------------

        return NextResponse.json({ success: true, message: "Announcement created", data: newAnnouncement });

    } catch (error) {
        console.error("Create announcement error", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
