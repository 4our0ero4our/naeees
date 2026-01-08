
import { Schema, models, model } from "mongoose";

const EventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        date: {
            type: Date, // We can store date and time mixed or separate, Date object usually best for sorting
            required: true,
        },
        time: {
            type: String, // "10:00 AM"
            required: true,
        },
        image: {
            type: String, // Cloudinary URL
            required: false,
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["free", "paid"],
            default: "free",
        },
        price: {
            type: Number,
            default: 0,
        },
        memberDiscount: {
            type: Number, // Percentage 0-100
            default: 0,
        },
        audience: {
            type: String,
            enum: ["all", "members", "department"],
            default: "all",
        },
        targetDepartment: {
            type: String, // Only required if audience == 'department'
            required: false,
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming",
        },
        galleryImages: {
            type: [String], // Array of image URLs
            default: []
        }
    },
    { timestamps: true }
);

export const Event = models.Event || model("Event", EventSchema);
