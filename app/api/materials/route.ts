import { NextResponse } from "next/server";
import { getMaterials } from "@/app/services/material.service";

/**
 * Get materials
 * @param req - The request object
 * @returns the materials
 * @throws {Error} if the materials are not found
 */
export async function GET(req: Request) {
  const materials = await getMaterials({});
  if (!materials) {
    return NextResponse.json(
      { success: false, message: "Materials not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: materials }, { status: 200 });
}
