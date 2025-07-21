const mongoose = require("mongoose");

const reqSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  status: {
    type: String,
    ref:"User",
    required: true,

    enum: {
      values: ["intrested", "rejected", "accepted", "ignored"],
      massage: `{VALUE} is not a valid type`,
    },
  },
});

module.exports = mongoose.model("requestSchema", reqSchema);
