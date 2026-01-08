
import { Schema, models, model } from "mongoose";

const EventRegistrationSchema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["free", "pending_approval", "approved", "rejected"],
            default: "free",
        },
        paymentReceipt: {
            type: String, // URL to uploaded receipt image
            required: false,
        },
        ticketCode: {
            type: String, // Unique alphanumeric code
            required: true,
            unique: true,
        },
        checkedIn: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const EventRegistration = models.EventRegistration || model("EventRegistration", EventRegistrationSchema);
