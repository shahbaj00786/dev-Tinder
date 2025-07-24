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

  photoUrl: {
    type: String,
    default: "https://geographyandyou.com/images/user-profile.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid Photo URL: " + value);
      }
    },
  },

  about: {
    type: String,
    default: "This is a default about of the user!",
  },
  skills: {
    type: [String], // Array of strings
  },

  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not a valid gender type`, // Error message if not in enum
    },
  },
});

module.exports = mongoose.model("User", userSchema);
