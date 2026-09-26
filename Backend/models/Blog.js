const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    authorName: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // createdAt / updatedAt gérés automatiquement
);

module.exports = mongoose.model("Blog", blogSchema);
