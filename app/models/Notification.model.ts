import mongoose, { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["event", "announcement", "material", "forum", "system"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    referenceId: { // ID of the Event, Announcement, etc.
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Notification = models.Notification || model("Notification", NotificationSchema);
