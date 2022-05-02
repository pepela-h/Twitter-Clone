const Post = require("../../model/post");

const fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports = { fetchPosts };
