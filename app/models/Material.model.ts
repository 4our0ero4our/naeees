import { Schema, models, model } from "mongoose";

const MaterialSchema = new Schema(
  {
    title: String,
    courseCode: String,
    level: String,
    semester: String,
    lecturer: String,
    type: String,
    description: String,
    fileUrl: String,

    visibility: {
      type: String,
      enum: ["all", "members"],
      default: "all",
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Material =
  models.Material || model("Material", MaterialSchema);
