const express = require("express");
const requestSchema = require("../schema/requestSchema");
const { auth } = require("../middleware/authMiddleware");
const User = require("../schema/userSchema");

const userRouter = express.Router();

userRouter.get("/user/request/pending", auth, async (req, res) => {
  const loggedInUser = req.user;

  const myConnections = await requestSchema
    .find({
      toUserId: loggedInUser._id,
      status: "intrested",
    })
    .populate("fromUserId", "firstName lastName");

  res
    .status(201)
    .json({ massage: "your connections are ", data: myConnections });
});

userRouter.get("/user/connections", auth, async (req, res) => {
  const loggedInUser = req.user;

  const myConnections = await requestSchema
    .find({
      $or: [
        { fromUserId: loggedInUser._id, status: "intrested" },
        { toUserId: loggedInUser._id, status: "intrested" },
      ],
    })
    .populate("fromUserId", "firstName lastName")
    .populate("toUserId", "firstName lastName");

  myConnections.forEach((req) => {
    if (req.fromUserId._id.toString() == loggedInUser._id.toString()) {
      return req.toUserId;
    }
    return req.toUserId;
  });

  res.status(201).json({ massage: "my connections are", data: myConnections });
});


userRouter.get("/user/feed", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await requestSchema.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    console.log(connectionRequests)

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName")
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = { userRouter };
