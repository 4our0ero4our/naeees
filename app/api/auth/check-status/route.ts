
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db/connect";
import { User } from "@/app/models/User.model";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).select("isActive");

        if (!user) {
            return NextResponse.json({ success: true, exists: false });
        }

        return NextResponse.json({ success: true, exists: true, isActive: user.isActive });

    } catch (error) {
        console.error("Check status error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
