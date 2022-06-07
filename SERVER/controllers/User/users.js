const User = require("../../model/User");
const bcrypt = require("bcrypt");
const createTokens = require("./handleTokens");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  const { username, password } = req?.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Make sure you fill in all required values" });
  try {
    const duplicate = await User.findOne({ username });
    if (duplicate)
      return res
        .status(409)
        .json({ message: "A user already exists with the same credentials" });

    const hashedPwd = await bcrypt.hash(password, 12);
    const newUser = await User.create({ ...req.body, password: hashedPwd });

    // const info = { username: newUser.username, _id: newUser.id };
    // console.log(info);

    const accessToken = jwt.sign(
      {
        username: newUser.username,
        _id: newUser._id,
        name: newUser.name,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      {
        username: newUser.username,
        _id: newUser._id,
        name: newUser.name,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "10d" }
    );

    newUser.refreshToken.push(refreshToken);
    await newUser.save();

    res.cookie("access", accessToken, {
      sameSite: "None",
      httpOnly: false,
      secure: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    res.cookie("jwt", refreshToken, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
      path: "/refresh",
    });
    //   accessToken: newUser.accessToken
    return res.status(200).json({
      email: newUser.email,
      _id: newUser._id,
      avatar: newUser.avatar,
      username: newUser.username,
      name: newUser.name,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req?.body;
  try {
    const duplicate = await User.findOne({ username });
    if (!duplicate)
      return res.status(400).json({
        message: "Invalid username or password",
      });

    const isMatch = await bcrypt.compare(password, duplicate.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const accessToken = jwt.sign(
      {
        username: duplicate.username,
        _id: duplicate._id,
        name: duplicate.name,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      {
        username: duplicate.username,
        _id: duplicate._id,
        name: duplicate.name,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "10d" }
    );

    while (duplicate.refreshToken.length >= 6) {
      duplicate.refreshToken.shift();
    }
    duplicate.refreshToken = [...duplicate.refreshToken, refreshToken];

    res.cookie("access", accessToken, {
      sameSite: "None",
      httpOnly: false,
      secure: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    res.cookie("jwt", refreshToken, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
      path: "/refresh",
    });
    //   accessToken: duplicate.accessToken

    duplicate.notifications.unshift({ nType: "login", nDate: new Date() });
    await duplicate.save();
    return res.status(200).json({
      email: duplicate.email,
      _id: duplicate._id,
      avatar: duplicate.avatar,
      username: duplicate.username,
      name: duplicate.name,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    const userId = req._id;
    const sentId = req.body;
    if (String(userId) !== String(sentId)) return res.sendStatus(400);
    const user = await User.findById(userId);
    // const specificToken = user.refreshToken.findIndex((token)=> token === req.cookies.jwt)
    user.refreshToken.foreach((token, index) => {
      if (token === req.cookies.jwt) {
        user.refreshToken.splice(index, 1);
      }
    });
    res.clearCookie("jwt", {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
      path: "/refresh",
    });
    res.clearCookie("access", {
      sameSite: "None",
      httpOnly: false,
      secure: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    res.end();
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getProfile = async (req, res) => {
  const { username } = req?.params;
  if (!username) return res.sendStatus(400);
  const { pic } = req?.query;
  console.log(pic);
  let user;
  try {
    if (pic !== "undefined") {
      user = await User.findOne({ username }).select("avatar");
      if (!user) return res.sendStatus(404);
    } else {
      user = await User.findOne({ username });
      if (!user) return res.sendStatus(404);
      delete user.DOB;
      delete user.roles;
      delete user.phoneNumber;
      delete user.refreshToken;
      delete user.password;
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const followUser = async (req, res) => {
  const userId = req._id;
  // console.log(userId, req?.body?.userId);
  const isValid = String(userId) === req.body.userId;
  const followerId = req.params.id;
  if (!isValid) return res.sendStatus(400);
  try {
    const followedUser = await User.findById(followerId);
    const followingUser = await User.findById(userId);
    if (!followedUser || !followingUser) return res.sendStatus(404);
    const hasFollowed =
      followedUser.followers.findIndex((id) => id === String(userId)) !== -1;
    if (hasFollowed) {
      // console.log(followedUser.followers, "before");
      followedUser.followers = followedUser.followers.filter((id) => {
        console.log(id.toString() !== userId.toString());
        return id.toString() !== userId.toString();
      });
      followingUser.following = followingUser.following.filter((user) => {
        // console.log((user) !== (followedUser._id),user.toString(),followedUser._id.toString());
        return user.toString() !== followedUser._id.toString();
      });
      // console.log(followedUser.followers,"afdter");
    } else {
      await followedUser.followers.push(userId);
      await followingUser.following.push(followedUser._id);
    }
    const final = await followedUser.save();
    await followingUser.save();
    return res.status(200).json(final);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);
    const notifications = user.notifications;
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchUsernames = async (req, res) => {
  const { q } = req.query;
  try {
    // const users = await User.find({ $text: { $search: q, $caseSensitive: false, } }).select("username name").limit(10).exec()
    const users = await User.find({
      $or: [
        { username: { $regex: ".*" + q + ".*" } },
        { name: { $regex: ".*" + q + ".*" } },
      ],
    })
      .select("username name avatar")
      .sort({ "followers.length": -1 })
      .limit(5);
    
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createUser,
  loginUser,
  getProfile,
  followUser,
  getNotifications,
  logoutUser,
  fetchUsernames,
};
