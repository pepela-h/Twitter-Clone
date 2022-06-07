const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pollSchema = new Schema(
  {
    question: {
      type: String,
    },
    creator: {
      type: String,
      required: true,
    },
    choices: {
      type: [String],
    },
    expDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Poll", pollSchema);
