const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const requestSchema = require("../schema/requestSchema");
const User = require("../schema/userSchema");

const requestRouter = express.Router();


requestRouter.post(
  "/request/send/:status/:toUserId",
  auth,
  async (req, res) => {
    // toUserId exist in DB
    // already req exist
    //allowed status
    //can't send to itself

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const user = await User.findById(toUserId);
    if (!user) {
      res.send("user not found");
    }

    const allowedStatus = ["intrested", "ignored"];

    if (!allowedStatus.includes(status)) {
      throw new Error("invalid status");
    }

    const isExistReqt = await requestSchema.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (isExistReqt) {
      throw new Error("req already sent");
    }

    if (fromUserId.toString() == toUserId.toString()) {
      throw new Error("can't sent");
    }

    const newConnection = new requestSchema({
      fromUserId,
      toUserId,
      status,
    });

    await newConnection.save();
    res.send("req send");
  }
);


requestRouter.post("/request/review/:status/:reqId", auth, async (req, res) => {
  //req is valid or not
  //status valid

  const loggedInUser = req.user._id;
  const { status, reqId } = req.params;

  const allowedStatus = ["accepted", "rejected"];

  if (!allowedStatus.includes(status)) {
    throw new Error("invalid status type");
  }

  const connectionReq = await requestSchema.findOne({
    _id: reqId,
    toUserId: loggedInUser._id,
    status: "intrested",
  });

  if (!connectionReq) {
    throw new Error("Request does not exist in Data Base");
  }

  connectionReq.status = status;

  await connectionReq.save();

  res.send("doneeeeeeeeeeeeeeee");
});

module.exports = { requestRouter };
