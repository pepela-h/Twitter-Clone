const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    creator: {
      type: String,
    },
    isPoll: {
      type: Boolean,
      default: false,
    },
    poll: {
      type: {
        question: String,
        choices: [Schema.Types.Mixed],
        exp: Date,
      },
    },
    username: {
      type: String,
      required: true,
    },
    retweetUsername: { type: String },
    owner: {
      required: true,
      type: String,
      index: true,
    },

    tweet: {
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
    tags: {
      type: [String],
      default: [],
    },
    reTweetComment: String,
    isRetweet: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    comments: {
      type: [mongoose.Types.ObjectId],
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
