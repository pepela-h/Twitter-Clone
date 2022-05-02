const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/Posts/posts")

router.get("/",postControllers.fetchPosts);
module.exports = router;
