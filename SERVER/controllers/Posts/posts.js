const Post = require("../../model/post");
const mongoose = require("mongoose");
const Comment = require("../../model/coment");

const hashtag = require("../../model/hashtag");
const fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ _id: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const fetchMorePosts = async (req, res) => {
  const { page, limit, user, search } = req?.query;

  if (!page) return res.sendStatus(404);
  if (Number(page) < 0) {
    page = 0;
  }

  try {
    const startIndex = (Number(page) - 1) * Number(limit);
    let posts;
    let total;
    if (user !== "null") {
      // console.log(user)
      total = await Post.countDocuments({ creator: user });
      posts = await Post.find({
        $or: [{ username: user }, { retweetUsername: user }],
      })
        .sort({ _id: -1 })
        .limit(Number(limit))
        .skip(Number(startIndex));
    } else if (search !== "") {
      total = await Post.countDocuments({
        tags: { $in: [search.replace("%23", "#")] },
      });
      posts = await Post.find({
        tags: { $in: [search.replace("%23", "#")] },
      })
        .sort({ _id: -1 })
        .limit(Number(limit))
        .skip(Number(startIndex));
    } else {
      console.log("elseblock");
      total = await Post.countDocuments();

      posts = await Post.find()
        .sort({ _id: -1 })
        .limit(Number(limit))
        .skip(Number(startIndex));
      // const posts = await Post.find({}).sort({ _id: -1 });
    }
    const hasMore = page <= Math.ceil(total / limit);

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
    const tags = postData.tweet.split(" ").filter((row) => row.startsWith("#"));

    if (!user) return res.sendStatus(401);
    console.log(postData);
    if (postData.isPoll) {
      let exp = new Date();
      let minutes =
        (postData.poll.exp.minutes || 0) +
        (postData.poll.exp.hours || 0) * 60 +
        (postData.poll.exp.days || 0) * 24 * 60;

      if (minutes <= 0) {
        return res.sendStatus(400);
      }
      // console.log(exp);
      // console.log(minutes);

      // exp = exp.getMinutes() + minutes;

      // Date.prototype.addMinutes = (m) => {
      //   this.setMinutes(this.getMinutes() + m);
      //   return this;
      // };

      // exp = exp.addMinutes(minutes);
      exp = exp.setMinutes(exp.getMinutes() + minutes);
      let choices = [];
      Object.keys(postData.poll.choices).map((choice) => {
        let object = { [choice]: postData.poll.choices[choice], votes: [] };
        choices.push(object);
      });

      postData.poll.choices = choices;
      postData.poll.exp = exp;

      const data = await Post.create({
        ...postData,
        owner: name,
        username: user,
        creator: name,
      });
      console.log(data);
      return res.status(200).json(data);
    } else {
      delete postData.poll;

      const data = await Post.create({
        ...postData,
        owner: name,
        username: user,
        creator: name,
      });

      if (tags?.length) {
        tags.map(async (tag) => {
          let createdTag = await hashtag.findOne({ name: tag });

          if (!createdTag) {
            createdTag = await hashtag.create({
              name: tag,
            });
          }

          createdTag.posts.push(data._id);
          await createdTag.save();
        });
        data.tags = tags;
        await data.save();
      }
      return res.status(200).json(data);
    }
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
    returnres.sendStatus(201);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

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
      reqPost.likes.findIndex((id) => String(id) === String(userId)) !== -1;

    if (hasLiked) {
      reqPost.likes = reqPost.likes.filter(
        (id) => String(id) !== String(userId)
      );
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

const handlePolls = async (req, res) => {
  const userId = req._id;
  const { userChoice } = req.body;
  const postId = req.params.id;

  if (!postId) {
    return res.sendStatus(400);
  }

  const poll = await Post.findById(postId);
  
  if (!poll) return res.sendStatus(404);
  Array.from(poll.poll.choices).map((choice, i) => {
    if (choice?.votes?.includes(userId) && choice[userChoice] ===undefined) {
      choice.votes = choice.votes.filter((vote) => {
        return String(vote) !== String(userId)
      })
    } else if (
      !choice?.votes?.includes(userId) &&
      choice[userChoice] !== undefined
    ) {
      choice.votes.push(userId);
    }
    return null;
  });

  // console.log(poll.poll.choices, "before");

  await poll.markModified("poll.choices");
  const final = await poll.save();
 
 
  return res.status(200).json(final);
};
module.exports = {
  fetchPosts,
  createPost,
  deletePost,
  retweetPost,
  fetchMorePosts,
  handleLikes,
  handleComments,
  handlePolls,
};
