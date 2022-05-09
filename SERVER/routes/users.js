const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/User/users");

router.post("/signup", userControllers.createUser);
router.post("/signin", userControllers.loginUser);

router.get("/:username", userControllers.getProfile);
module.exports = router;
