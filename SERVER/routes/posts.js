const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/Posts/posts");
const verifyToken = require("../middleware/VerifyToken");
router.get("/", postControllers.fetchPosts);
router.get("/more", postControllers.fetchMorePosts);
router.post("/", verifyToken, postControllers.createPost);
router.delete("/delete/:id", verifyToken, postControllers.deletePost);
router.post("/retweet", verifyToken, postControllers.retweetPost)
router.post("/like/:id", verifyToken, postControllers.handleLikes)
router.post("/comment/:id", verifyToken, postControllers.handleLikes)
module.exports = router;
