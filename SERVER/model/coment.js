const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    comment: {
      type: String,
    },
    creator: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
