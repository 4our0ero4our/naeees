import { Post } from "@/app/models/Post.model";
import { connectDB } from "../lib/db/connect";
    
/**
 * Get all posts for a particular user
 * @param userId - The user id
 * @returns the posts
 * @throws {Error} if the posts are not found
 */
export async function getPosts(userId: string) {
  if (!userId) {
    throw new Error("User id is required");
  }
  try {
    await connectDB();
    return Post.find({ uploadedBy: userId }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Failed to get posts");
  }
}