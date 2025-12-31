import mongoose, { Schema, models, model } from "mongoose";

const MemberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    matricNumber: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Member = models.Member || model("Member", MemberSchema);
