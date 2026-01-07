
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { User } from "@/app/models/User.model";

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "super_admin") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (user.role === "super_admin") {
            return NextResponse.json({ success: false, message: "Cannot demote a Super Admin" }, { status: 403 });
        }

        // Safety: Check if trying to demote self (though role check above handles it if current user is super admin)
        if (user.email === session.user?.email) {
            return NextResponse.json({ success: false, message: "Cannot demote yourself" }, { status: 403 });
        }

        user.role = "student";
        await user.save();

        return NextResponse.json({ success: true, message: `${user.fullName} demoted to Student` });

    } catch (error: any) {
        console.error("Error demoting user:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
