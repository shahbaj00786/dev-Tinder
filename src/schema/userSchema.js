const mongoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 10,
  },

  lastName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 10,
  },

  emailId: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not a valid email");
      }
    },
  },

  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password");
      }
    },
  },

  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      massage: `{VALUE} is not a valid gender type`,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
