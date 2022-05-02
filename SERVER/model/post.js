const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    creatorName: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    retweets: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    shares: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
