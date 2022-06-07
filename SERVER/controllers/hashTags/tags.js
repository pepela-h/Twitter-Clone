const Post = require("../../model/post");
const mongoose = require("mongoose");
const hashtag = require("../../model/hashtag");

const getTags = async (req, res, next) => {
  let { limit } = req?.query;
  if(limit == "null") limit = 20
  try {
    const tags = await hashtag.find().limit(limit);
    tags.sort((a, b) => b.posts.length - a.posts.length);
    return res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { getTags };
