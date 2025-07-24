const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: require("path").resolve(__dirname, "../.env") });

const userDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(process.env.MONGO_URL);
};

module.exports = { userDB };
