import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    content: {
        type: String, // Rich text HTML
        required: [true, "Content is required"],
    },
    category: {
        type: String,
        enum: ["Spotlight", "Scholarship", "Update", "Ad"],
        default: "Update",
    },
    images: {
        type: [String], // Array of Cloudinary URLs
        default: [],
    },
    featuredImage: {
        type: String, // Main cover image
    },
    status: {
        type: String,
        enum: ["Draft", "Published", "Archived"],
        default: "Draft",
    },
    visibility: {
        type: String,
        enum: ["Global", "MembersOnly"],
        default: "Global",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    readBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    publishedAt: {
        type: Date,
    }
}, { timestamps: true });

// Check if model exists before compiling to avoid OverwriteModelError in Next.js hot reload
export const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
