import { connectDB } from "@/app/lib/db/connect";
import { Material } from "@/app/models/Material.model";

/**
 * Create a new material
 * @param data - The data for the material
 * @returns the created material
 * @throws {Error} if the material is not created
 */
export async function createMaterial(data: any) {
  await connectDB();
  return Material.create(data);
}

/**
 * Get materials
 * @param filters - The filters for the materials
 * @returns the materials
 * @throws {Error} if the materials are not found
 */
export async function getMaterials(filters: any) {
  try {
    await connectDB();
    return Material.find(filters)
      .populate("uploadedBy", "fullName email")
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error getting materials:", error);
    throw new Error("Failed to get materials");
  }
}

/**
 * Delete a material
 * @param id - The id of the material
 * @returns the deleted material
 * @throws {Error} if the material is not deleted
 */
export async function deleteMaterial(id: string) {
  try {
    await connectDB();
    return Material.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting material:", error);
    throw new Error("Failed to delete material");
  }
}