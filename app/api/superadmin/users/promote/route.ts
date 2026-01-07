
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

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (user.role === "admin" || user.role === "super_admin") {
            return NextResponse.json({ success: false, message: "User is already an admin" }, { status: 409 });
        }

        user.role = "admin";
        await user.save();

        return NextResponse.json({ success: true, message: `${user.fullName} promoted to Admin` });

    } catch (error: any) {
        console.error("Error promoting user:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
