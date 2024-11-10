import mongoose from "mongoose";

const urlViewSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

export const View = mongoose.model("View", urlViewSchema);
