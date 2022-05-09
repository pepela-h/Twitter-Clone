const express = require("express");
const router = express.Router();
// const userControllers = require("../controllers/User/users");

router.post(
  "/",
  require("../controllers/Refresh/refreshToken").refreshTokenController
);

module.exports = router;
