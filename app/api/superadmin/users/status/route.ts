
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

        const { userId, isActive } = await req.json();

        if (!userId || typeof isActive !== "boolean") {
            return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Protect Super Admin from being suspended
        if (user.role === "super_admin") {
            return NextResponse.json({ success: false, message: "Cannot suspend a Super Admin" }, { status: 403 });
        }

        user.isActive = isActive;
        await user.save();

        return NextResponse.json({ success: true, message: `User ${isActive ? 'activated' : 'suspended'}` });

    } catch (error: any) {
        console.error("Error updating user status:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
