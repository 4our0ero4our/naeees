
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { User } from "@/app/models/User.model";

export async function GET(req: Request) {
    try {
        const session = await auth();
        // 1. Security Check: Must be super_admin
        if (!session || (session.user as any).role !== "super_admin") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        await connectDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const role = searchParams.get("role") || "";

        const skip = (page - 1) * limit;

        // Build Query
        const query: any = {};

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { matricNumber: { $regex: search, $options: "i" } }
            ];
        }

        if (role && role !== "all") {
            query.role = role;
        }

        const membership = searchParams.get("membership") || "";
        if (membership && membership !== "all") {
            query.membershipStatus = membership;
        }

        // Fetch Users & Count
        const totalUsers = await User.countDocuments(query);
        const users = await User.find(query)
            .select("-password") // Exclude password
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Quick Stats for Cards (Separate from pagination)
        // In a real large-scale app, you might want to cache these or run separate API call
        const stats = {
            total: await User.countDocuments({}),
            students: await User.countDocuments({ role: "student" }),
            admins: await User.countDocuments({ role: "admin" }),
            superAdmins: await User.countDocuments({ role: "super_admin" })
        };

        return NextResponse.json({
            success: true,
            data: users,
            meta: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers
            },
            stats
        });

    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
