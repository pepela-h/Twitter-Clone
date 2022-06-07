const verifyPermission = (req, res, next) => {
  const user = req.username;
  if (!user) {
    return res.sendStatus(401);
  } else {
    next();
  }
};

module.exports = verifyPermission;
