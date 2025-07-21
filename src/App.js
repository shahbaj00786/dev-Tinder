const express = require("express");
const { userDB } = require("./dataBase/dataBase");
const cookiePareser = require("cookie-parser");
const { authRouter } = require("./router/authRouter");
const { profileRouter } = require("./router/profileRouter");
const { requestRouter } = require("./router/requestRouter");
const { userRouter } = require("./router/userRouter");

const app = express();

app.use(express.json());
app.use(cookiePareser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter)
app.use("/", userRouter)

userDB()
  .then(() => {
    console.log("connected to DB successfully");
    app.listen(7777, () => {
      console.log("listning on port 7777");
    });
  })
  .catch((err) => {
    console.log("err detected");
  });
