import mongoose, { Schema, models, model } from "mongoose";

const OTPSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // Auto-delete expired documents
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5, // Max verification attempts
    },
  },
  { timestamps: true }
);

// Compound index to ensure one active OTP per email
OTPSchema.index({ email: 1, verified: 1 });

export const OTP = models.OTP || model("OTP", OTPSchema);

