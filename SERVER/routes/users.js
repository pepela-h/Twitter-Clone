const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/User/users");
const verifyToken = require("../middleware/VerifyToken");
const VerifyPermission = require("../middleware/VerifyPermission");
router.post("/signup", userControllers.createUser);
router.post("/signin", userControllers.loginUser);
router.post(
  "/signout",
  verifyToken,
  VerifyPermission,
  userControllers.logoutUser
);
router.post(
  "/follow/:id",
  verifyToken,
  VerifyPermission,
  userControllers.followUser
);
router.get(
  "/notifications",
  verifyToken,
  VerifyPermission,
  userControllers.getNotifications
);
router.get("/people", userControllers.fetchUsernames)
router.get("/:username", userControllers.getProfile);

module.exports = router;
