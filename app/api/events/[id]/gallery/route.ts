
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Event } from "@/app/models/Event.model";

// POST: Upload Gallery Images
export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const formData = await req.formData();
        const files = formData.getAll("images") as File[]; // Expect 'images' field with multiple files

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: "No images provided" }, { status: 400 });
        }

        const uploadedUrls: string[] = [];

        // Import dynamically
        const { uploadToCloudinary } = await import("@/app/lib/cloudinary");

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadResult = await uploadToCloudinary(buffer, "naeees-events-gallery", "image");
            uploadedUrls.push(uploadResult.secure_url);
        }

        await connectDB();

        // Await params if Promise (Next.js 15+ compat)
        // const resolvedParams = await Promise.resolve(params);
        console.log("Attempting to update Event ID:", params.id);

        const updatedEvent = await Event.findByIdAndUpdate(
            params.id,
            { $push: { galleryImages: { $each: uploadedUrls } } },
            { new: true }
        );

        console.log("Uploaded URLs:", uploadedUrls);
        if (updatedEvent) {
            console.log("Updated Event Gallery Length:", updatedEvent.galleryImages?.length);
        } else {
            console.log("CRITICAL: Event not found or update failed for ID:", params.id);
        }

        return NextResponse.json({ success: true, message: "Gallery updated", data: updatedEvent });

    } catch (error) {
        console.error("Gallery upload error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// DELETE: Remove Gallery Images
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session || ((session.user as any).role !== "admin" && (session.user as any).role !== "super_admin")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const { imageUrls } = await req.json(); // Expect array of strings

        if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
            return NextResponse.json({ success: false, message: "No images provided" }, { status: 400 });
        }

        // Import dynamically
        const { deleteFromCloudinary } = await import("@/app/lib/cloudinary");

        for (const url of imageUrls) {
            try {
                // Extract Public ID from URL
                // Example: https://res.cloudinary.com/.../image/upload/v1234/naeees-events-gallery/pic.jpg
                // We need: naeees-events-gallery/pic

                const parts = url.split('/');
                const filenameWithExt = parts[parts.length - 1];
                const folder = "naeees-events-gallery"; // Known folder

                // Check if url contains our folder
                if (url.includes(folder)) {
                    const filename = filenameWithExt.split('.')[0];
                    const publicId = `${folder}/${filename}`;
                    console.log("Deleting Cloudinary Public ID:", publicId);
                    await deleteFromCloudinary(publicId, "image");
                }
            } catch (err) {
                console.error("Failed to delete from Cloudinary:", url, err);
                // Continue deleting others and DB ref even if cloud fail (orphaned images better than broken app)
            }
        }

        await connectDB();

        const updatedEvent = await Event.findByIdAndUpdate(
            params.id,
            { $pull: { galleryImages: { $in: imageUrls } } },
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Images deleted", data: updatedEvent });

    } catch (error) {
        console.error("Gallery delete error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
