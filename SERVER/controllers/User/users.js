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
    createTokens(res, duplicate);
    return res.status(204).json({
      email: duplicate.email,
      _id: duplicate._id,
      avatar: duplicate.avatar,
      //   accessToken: duplicate.accessToken
      username: duplicate.username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  const { username } = req?.params;
  if (!username) return res.sendStatus(400);
  try {
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(404);
    delete user.DOB;
    delete user.roles;
    delete user.phoneNumber;
    delete user.refreshToken;
    delete user.password;
  
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createUser, loginUser, getProfile };
