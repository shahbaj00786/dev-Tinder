const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Please login")
  }

  const decodeObj = await jwt.verify(token, "DEV@Tinder$790");

  const { _id } = decodeObj;

  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found");
  }

  req.user = user;
  next();
};


module.exports = { auth };
