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

const View = mongoose.models.View || mongoose.model("View", urlViewSchema);

export { View };
