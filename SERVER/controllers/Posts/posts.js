const Post = require("../../model/post");
const mongoose = require("mongoose");
const Comment = require("../../model/coment");
const HashTag = require("../../model/hashtag");
const fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ _id: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const fetchMorePosts = async (req, res, next) => {
  const { page, limit } = req?.query;
  console.log(limit, page);
  if (!page) return res.sendStatus(404);
  try {
    const total = await Post.countDocuments();
    const startIndex = (Number(page) - 1) * Number(limit);
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(Number(limit))
      .skip(Number(startIndex));
    // const posts = await Post.find({}).sort({ _id: -1 });

    const hasMore = page <= Math.ceil(total / limit);
    console.log(posts.length, hasMore);

    return res.status(200).json({ posts, hasMore });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const createPost = async (req, res) => {
  const user = req?.username;
  const name = req?.name;

  if (!user || !name) return res.sendStatus(401);
  try {
    const { postData } = req.body;
    console.log(user);

    if (!user) return res.sendStatus(401);
    if (tags.length) {
      const createdTag = await HashTag.create(tags);
      console.log(createdTag);
    }
    const data = await Post.create({
      ...postData,
      owner: name,
      username: user,
      creator: name,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const retweetPost = async (req, res) => {
  const user = req?.username;
  const name = req?.name;

  // console.log(user,  name);
  if (!user || !name) return res.sendStatus(401);
  try {
    const { postId, userId, comment } = req.body;
    if (!user || !userId || !postId) return res.sendStatus(401);
    const userMatch = String(userId) === String(req._id);
    if (!userMatch)
      return res
        .status(400)
        .json({ message: "A suspicious activity was detected" });

    const oldPostData = await Post.findById(postId);

    if (oldPostData.retweets.indexOf(userId) === -1) {
      oldPostData.retweets.push(userId);
      await oldPostData.save();
      const postData = {
        owner: oldPostData.owner,
        tweet: oldPostData.tweet,
        image: oldPostData.image,
        creator: name,
        username: oldPostData.username,
        isRetweet: true,
        reTweetComment: comment,
        retweetUsername: user,
      };
      const data = await Post.create(postData);
      return res.status(200).json(data);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.isValidObjectId(id)) return res.sendStatus(204);
    await Post.findOneAndDelete({ _id: id });
    return res.status(200).json(id);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleLikes = async (req, res) => {
  const userId = req._id;
  if (userId && String(userId) !== String(req?.body.userId))
    return res.sendStatus(400);
  if (!userId) return res.sendStatus(401);
  const postId = req?.params?.id;
  if (!postId) return res.sendStatus(400);
  if (!mongoose.Types.ObjectId.isValid(postId)) return res.sendStatus(404);
  try {
    const reqPost = await Post.findById(postId);
    const hasLiked =
      reqPost.likes.findIndex((id) => id === String(userId)) !== -1;
    if (hasLiked) {
      reqPost.likes = reqPost.likes.filter((id) => id !== userId);
    } else {
      reqPost.likes.push(userId);
    }
    const resp = await reqPost.save();

    return res.status(200).json(resp);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const handleComments = async (req, res) => {
  const userId = req._id;
  if (userId && String(userId) !== String(req?.body?.userId))
    return res.sendStatus(400);
  if (req.method === "POST") {
    try {
      const { comment } = req?.body;
      const parent = req.params.id;

      const creator = req?.username;
      if (!creator) return res.sendStatus(401);

      const reqPost = await Post.findOne({ _id: parent });

      if (!reqPost) return res.sendStatus(404);
      const commentData = { comment, creator, parent };

      const createdComment = await Comment.create(commentData);

      reqPost.comments.push(createdComment._id);

      const finalpost = await reqPost.save();

      return res.status(200).json(finalpost);
    } catch (error) {
      return res.sendStatus(500);
    }
  } else if (req.method === "GET") {
    const parent = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(parent)) return res.sendStatus(404);
    try {
      // const reqPost = await Post.find({ _id: parent });

      const comments = await Comment.find({ parent });

      return res.status(200).json(comments);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
};
module.exports = {
  fetchPosts,
  createPost,
  deletePost,
  retweetPost,
  fetchMorePosts,
  handleLikes,
  handleComments,
};
