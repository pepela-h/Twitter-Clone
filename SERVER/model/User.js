const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    roles: {
      type: [Number],
      default: [2001],
    },
    bio: String,
    avatar: { type: String },
    DOB: { type: Date },
    password: { type: String, required: true },
    refreshToken: { type: [String], default: "" },
    following: { type: [String], default: [] },
    followers: { type: [String], default: [] },
    email: { type: String },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    notifications: {
      type: [{ nType: String, nDate: { type: Date } }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ username: "text", name: "text" });
module.exports = mongoose.model("User", userSchema);
