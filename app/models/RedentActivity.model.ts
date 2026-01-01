import mongoose, { Schema, models, model } from "mongoose";

const RecentActivitySchema = new Schema(
  {
    title: String,
    type: String,
    uploadedBy: {
      type: String,
      required: true,
    },
    level: String,
  },
  { timestamps: true }
);