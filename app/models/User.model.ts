import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    matricNumber: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin", "super_admin"],
      default: "student",
    },

    membershipStatus: {
      type: String,
      enum: ["member", "non-member", "pending"],
      default: "non-member",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User =
  models.User || model("User", UserSchema);
