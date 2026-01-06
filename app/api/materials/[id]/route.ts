import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/app/lib/db/connect";
import { Material } from "@/app/models/Material.model";
import { deleteFromCloudinary } from "@/app/lib/cloudinary";

/**
 * Delete a material (admin / super_admin only)
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;

    if (!session?.user?.id || (role !== "admin" && role !== "super_admin")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const material = await Material.findById(params.id);
    if (!material) {
      return NextResponse.json(
        { success: false, message: "Material not found" },
        { status: 404 }
      );
    }

    // Attempt to delete file from Cloudinary (ignore failure)
    // Try 'raw' first (for new uploads), then fallback to 'auto' for older files
    if (material.cloudinaryPublicId) {
      await deleteFromCloudinary(material.cloudinaryPublicId, "raw").catch(
        async () => {
          // Fallback to 'auto' for files uploaded before the change
          await deleteFromCloudinary(material.cloudinaryPublicId, "auto").catch(
            () => {}
          );
        }
      );
    }

    await Material.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting material:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete material" },
      { status: 500 }
    );
  }
}


