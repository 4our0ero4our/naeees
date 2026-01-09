import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

if (!cloud_name || !api_key || !api_secret) {
    console.error("Missing Cloudinary Configuration:", {
        hasCloudName: !!cloud_name,
        hasApiKey: !!api_key,
        hasApiSecret: !!api_secret
    });
}

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "naeees/content" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({ success: true, url: result.secure_url });

    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({
            success: false,
            message: "Upload failed",
            error: error.message || error
        }, { status: 500 });
    }
}
