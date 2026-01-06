import { NextResponse } from "next/server";
import { getPosts } from "@/app/services/post.service";

/**
 * Get all posts for a user
 * @param req - The request object
 * @returns the posts
 * @throws {Error} if the posts are not found
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User id is required" }, { status: 400 });
    }

    const posts = await getPosts(userId);
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to get posts" },
      { status: 500 }
    );
  }
}