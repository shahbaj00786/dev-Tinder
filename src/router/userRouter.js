const express = require("express");
const requestSchema = require("../schema/requestSchema");
const { auth } = require("../middleware/authMiddleware");
const User = require("../schema/userSchema");

const userRouter = express.Router();

userRouter.get("/user/request/pending", auth, async (req, res) => {
   const USER_SAFE_DATA=( "firstName  lastName emailId  about photoUrl skills  gender")
  const loggedInUser = req.user;

  const myConnections = await requestSchema
    .find({
      toUserId: loggedInUser._id,
      status: "intrested",
    })
    .populate("fromUserId", USER_SAFE_DATA);

  res
    .status(201)
    .json({ massage: "your connections are ", data: myConnections });
});

userRouter.get("/user/connections", auth, async (req, res) => {
   const USER_SAFE_DATA=( "firstName  lastName emailId  about photoUrl skills  gender")
  try {
    const loggedInUser = req.user;

    const connectionRequests = await requestSchema.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


userRouter.get("/user/feed", auth, async (req, res) => {
  const userSafeData=( "firstName  lastName emailId  about photoUrl skills  gender")
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
      .select(userSafeData)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = { userRouter };
