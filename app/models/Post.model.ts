import { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
    {
        title: String,
        content: String,
        visibility: {
            type: String,
            enum: ["all", "members"],
            default: "all",
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Post = models.Post || model("Post", PostSchema);