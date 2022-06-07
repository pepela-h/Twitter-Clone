const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!!authHeader) {
    if (authHeader?.split(" ")[0] !== "Bearer") {
      return res.sendStatus(400);
    }
 }
  const accessToken = req?.cookies?.access || authHeader?.split(" ")[1];
  if (!accessToken) return res.sendStatus(403);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.username = decoded.username;
    req._id = decoded._id;
    req.roles = decoded.roles;
    req.name = decoded.name;
  
    next();
  });
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
