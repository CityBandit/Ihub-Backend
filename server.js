const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const createError = require("http-errors");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
require("./helpers/mongoDBHelper");
const multer = require("multer");
const { articleRouter } = require("./routes/article");
const { storyRouter } = require("./routes/story");

const upload = multer();
dotenv.config();
const app = express();

// middlewares
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(logger("dev"));
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({
    "Hello there": "Welcome to the ihub api",
  });
});

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", articleRouter);
app.use("/api/v1", storyRouter);

// error handling
app.use(async (req, res, next) => {
  const error = createError.NotFound("The page does not exist");
  next(error);
});

app.use(async (error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
  if (error) {
    console.error(`An error has occured: ${error}`);
  }
  console.log(`app running on http://127.0.0.1:${port}`);
});
