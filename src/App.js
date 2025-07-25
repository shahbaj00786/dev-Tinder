const express = require("express");
const { userDB } = require("./dataBase/dataBase");
const cookiePareser = require("cookie-parser");
const { authRouter } = require("./router/authRouter");
const { profileRouter } = require("./router/profileRouter");
const { requestRouter } = require("./router/requestRouter");
const { userRouter } = require("./router/userRouter");
const dotenv = require("dotenv");
dotenv.config({ path: require("path").resolve(__dirname, "../.env") });
const cors =require("cors")
const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(express.json());
app.use(cookiePareser());

//app.options('*', cors());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter)
app.use("/", userRouter)

userDB()
  .then(() => {
    console.log("connected to DB successfully");
        app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
      console.log(` Server running on 0.0.0.0:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("err detected");
  });
