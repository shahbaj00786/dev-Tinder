const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const cookieParser = require("cookie-parser");
const {updateValidation} = require("../utils/userValidation")

const profileRouter = express.Router();

profileRouter.use(cookieParser());

profileRouter.get("/profile/view", auth, async (req, res) => {
  const user = req.user;
  await res.send(user);
});



profileRouter.patch("/profile/update", auth, async (req, res) => {
  const loggedInUser = req.user;

  if(!updateValidation(req))
  {
    throw new Error("not allow to update")
  }

  Object.keys(req.body).forEach((key) => {
    loggedInUser[key] = req.body[key];
  });

  await loggedInUser.save();

  res.json({
    message: `${loggedInUser.firstName}, your profile updated successfuly`,
    data: loggedInUser,
  });
});

module.exports = { profileRouter };
