const jwt = require("jsonwebtoken");
const createTokens = async (res, newUser) => {
  const accessToken = jwt.sign(
    {
      info: {
        username: newUser.username,
        _id: newUser._id,
        roles: newUser.roles,
      },
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    {
      info: {
        username: newUser.username,
        _id: newUser._id,
        roles: newUser.roles,
      },
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "10d" }
  );

  newUser.refreshToken = refreshToken;
  await newUser.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    path: "/refresh",
    
    domain: "localhost",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "None",
  });
  res.cookie("access", accessToken, {
    httpOnly: false,
    path: "/",
    domain: "localhost",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "None",
  });
};

module.exports = createTokens;
