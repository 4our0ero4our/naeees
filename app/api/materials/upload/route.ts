import { NextResponse } from "next/server";
import { createMaterial } from "@/app/services/material.service";

/**
 * Create a new material
 * @param req - The request object
 * @returns the created material
 * @throws {Error} if the material is not created
 */
export async function POST(req: Request) {
  const body = await req.json();

  const material = await createMaterial(body);

  if (!material) {
    return NextResponse.json({ success: false, message: "Material not created" }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: material }, { status: 201 });
}
