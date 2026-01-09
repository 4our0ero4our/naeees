import { NextResponse } from "next/server";
import { createMaterial } from "@/app/services/material.service";
import { uploadToCloudinary, deleteFromCloudinary } from "@/app/lib/cloudinary";
import { auth } from "@/auth";

/**
 * Create a new material with file upload to Cloudinary
 * @param req - The request object with FormData
 * @returns the created material
 * @throws {Error} if the material is not created
 */
export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get form data
    const formData = await req.formData();

    // Extract file
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { success: false, message: "File is required" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type. Only PDF, DOC, DOCX, PPT, PPTX are allowed" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary - Use 'raw' for PDFs and documents to ensure proper URL structure
    const uploadResult = await uploadToCloudinary(
      buffer,
      "naeees-materials",
      "raw"
    );

    // Extract form fields
    const title = formData.get("title") as string;
    const courseCode = formData.get("courseCode") as string;
    const level = formData.get("level") as string;
    const semester = formData.get("semester") as string;
    const lecturer = formData.get("lecturer") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const visibility = formData.get("visibility") as string;

    // Create material record
    const derivedFormat = uploadResult.format || file.type || (file as any)?.name?.split('.').pop() || "";

    const materialData = {
      title,
      courseCode,
      level,
      semester,
      lecturer,
      type,
      description,
      visibility: visibility?.toLowerCase() || "all",
      fileUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      cloudinaryFormat: derivedFormat,
      fileSize: uploadResult.bytes,
      uploadedBy: session.user.id,
    };

    const material = await createMaterial(materialData);

    if (!material) {
      // If material creation fails, delete the uploaded file from Cloudinary
      await deleteFromCloudinary(uploadResult.public_id, "raw").catch(
        (err) => console.error("Failed to delete file from Cloudinary:", err)
      );
      return NextResponse.json(
        { success: false, message: "Material not created" },
        { status: 400 }
      );
    }

    // --- NOTIFICATION TRIGGER ---
    try {
      const { Notification } = await import("@/app/models/Notification.model");
      const { User } = await import("@/app/models/User.model"); // Ensure User model is available

      let recipientQuery: any = {};
      if (visibility?.toLowerCase() === "members") {
        recipientQuery.membershipStatus = "member";
      }

      const users = await User.find(recipientQuery, "_id");

      const notifications = users.map(user => ({
        recipient: user._id,
        type: "material",
        title: "New Material: " + title,
        message: `${courseCode} material added for ${level} Level`,
        referenceId: (material as any)._id,
        isRead: false,
        createdAt: new Date()
      }));

      if (notifications.length > 0) {
        await Notification.insertMany(notifications);
      }
    } catch (err) {
      console.error("Failed to crate notifications for material", err);
    }
    // ----------------------------

    return NextResponse.json({ success: true, data: material }, { status: 201 });
  } catch (error: any) {
    console.error("Error uploading material:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to upload material",
      },
      { status: 500 }
    );
  }
}
