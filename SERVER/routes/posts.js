const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/Posts/posts");
const verifyToken = require("../middleware/VerifyToken");
const verifyPermission = require("../middleware/VerifyPermission");
router.get("/", postControllers.fetchPosts);
router.get("/more", postControllers.fetchMorePosts);
router.post("/", verifyToken, verifyPermission, postControllers.createPost);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyPermission,
  postControllers.deletePost
);
router.post("/retweet", verifyToken, postControllers.retweetPost);
router.post(
  "/like/:id",
  verifyToken,
  verifyPermission,
  postControllers.handleLikes
);
router.post(
  "/comment/:id",
  verifyToken,
  verifyPermission,
  postControllers.handleComments
);
router.get(
  "/tags",
  verifyToken,
  verifyPermission,
  require("../controllers/hashTags/tags").getTags
);

router.post(
  "/poll/:id",
  verifyToken,
  verifyPermission,
  postControllers.handlePolls
);
module.exports = router;
