const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hashTagSchema = new Schema({
  name: {
    type: String,
  },
  posts: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

module.exports = mongoose.model("hashTag", hashTagSchema);
