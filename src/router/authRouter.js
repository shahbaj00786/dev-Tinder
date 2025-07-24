const express = require("express");
const User = require("../schema/userSchema");
const { userValidation } = require("../utils/userValidation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  userValidation(req);

  const { firstName, lastName, emailId, password, about,photoUrl, skills, gender } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
    about,
    photoUrl,
    skills,
    gender,
  });

  const signUpUser = await user.save();

      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({massage: "User Added successfuly", data :signUpUser});
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    throw new Error("enter details");
  }
  const user = await User.findOne({ emailId });

  if (!user) {
    throw new Error("user not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (isValidPassword) {
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.send(user);
  } else {
    throw new Error("password is invalid");
  }
  res.send("login successful");
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = { authRouter };
