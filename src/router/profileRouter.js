const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const cookieParser = require("cookie-parser");
const {updateValidation} = require("../utils/userValidation")

const profileRouter = express.Router();

profileRouter.use(cookieParser());

profileRouter.get("/profile/view", auth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});



profileRouter.patch("/profile/update", auth, async (req, res) => {
  try {
    console.log("in patch")
    if (!updateValidation(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
  console.log("Patch call")
});

module.exports = { profileRouter };
