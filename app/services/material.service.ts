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
  await connectDB();
  return Material.find(filters).sort({ createdAt: -1 });
}
