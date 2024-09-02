const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String },
  slug: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  imageUrl: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
