import mongoose from "mongoose";
import { Schema, models, model } from "mongoose";

// This is the cotribution model for the contributions i.e replies/posts/engagements made by the users
const ContributionSchema = new Schema(
    {
        content: String,
        type: String,
        posts: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        replies: {
            type: Schema.Types.ObjectId,
            ref: "Reply",
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
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

export const Contribution = models.Contribution || model("Contribution", ContributionSchema);