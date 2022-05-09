const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const mongoose = require("mongoose");

const refreshTokenController = async (req, res) => {
  const refreshToken = req?.cookies?.jwt;

  const ltR = refreshToken;

  const { id: userId } = req?.body;
  // console.log(userId);
  const newId = mongoose.Types.ObjectId(userId);

  if (!refreshToken || !userId) return res.sendStatus(403);
  try {
    const duplicate = await User.findOne({ _id: newId });
    if (!duplicate) return res.sendStatus(400);
    const tokenMatch = duplicate?.refreshToken.includes(refreshToken);
    // console.log(duplicate.refreshToken, refreshToken);
    if (!tokenMatch) return res.sendStatus(401);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      async (err, decoded) => {
        if (err) {
          console.log(err);
          return res.sendStatus(401);
        }
        // console.log(decoded, "username: decoded.username,");
        const accessToken = jwt.sign(
          {
            username: decoded.username,
            _id: decoded._id,
            name: decoded.name,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
          {
            _id: decoded._id,
            username: decoded.username,
            name: decoded.name,
          },
          process.env.REFRESH_TOKEN,
          { expiresIn: "10d" }
        );
        setTimeout(() => {
          duplicate.refreshToken = duplicate.refreshToken.filter(
            (token) => String(token) !== String(ltR)
          );
        });
        // console.log(refreshToken, duplicate.refreshToken);

        duplicate.refreshToken.push(refreshToken);

        // console.log(duplicate.refreshToken);
        await duplicate.save();

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
        return res.status(200).json({
          email: duplicate.email,
          _id: duplicate._id,
          avatar: duplicate.avatar,
          username: duplicate.username,
          name: duplicate.name,
        });
      }
    );
  } catch (error) {
    res.sendStatus(500);
  }
};

const ErrorHandler = (req, res) => {
  const method = req.method;
  if (method !== "POST") return res.sendStatus(407);
};
module.exports = { refreshTokenController, ErrorHandler };
