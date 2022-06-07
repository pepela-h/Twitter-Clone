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
    // console.log(duplicate.refreshToken.length, "top");
    const tokenMatch = duplicate?.refreshToken.includes(refreshToken);
    // console.log(duplicate.refreshToken, refreshToken);
    if (!tokenMatch) {
      console.log("Tokens Do not match");
      return res.sendStatus(401);
    }
    // console.log("mathed");
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

        const refreshTken = jwt.sign(
          {
            _id: decoded._id,
            username: decoded.username,
            name: decoded.name,
          },
          process.env.REFRESH_TOKEN,
          { expiresIn: "10d" }
        );

        await duplicate.refreshToken.filter(
          (token) => String(token) !== String(ltR)
        );

        const tokens = duplicate.refreshToken.map((token) => {
          return String(token) === String(ltR) ? refreshTken : token;
        });

        // console.log(duplicate.refreshToken.length);

        // duplicate.refreshToken.push(refreshTken);
        // duplicate.refreshToken = tokens;
        // console.log(duplicate.refreshToken);
        await User.findByIdAndUpdate(duplicate._id, { refreshToken: tokens });

        res.cookie("access", accessToken, {
          sameSite: "None",
          httpOnly: false,
          secure: true,
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 10,
        });
        res.cookie("jwt", refreshTken, {
          maxAge: 10 * 24 * 60 * 60 * 1000,
          sameSite: "None",
          httpOnly: true,
          secure: true,
          path: "/refresh",
        });
        //   accessToken: duplicate.accessToken
        return res.status(200).json({
          // email: duplicate.email,
          // _id: duplicate._id,
          // avatar: duplicate.avatar,
          // username: duplicate.username,
          // name: duplicate.name,
          refreshToken,
          accessToken,
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
