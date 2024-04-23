const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
//const errorHandler = require('./middleware/globalErrorHandler');

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const categoryRouter = require("./routes/categoryRouter");
const viewRouter = require("./routes/viewRouter");
const admin_viewRouter = require("./routes/viewRouterAdmin");
const compression = require("compression");

const app = express();

dotenv.config({ path: "./.env" });


// Set security HTTP headers
app.use(helmet());


// Limit requests from same API
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/', limiter);


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());


// Data sanitization against XSS
app.use(xss());
app.use(cookieParser());


//development logging
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//comress all text before sending to clients
app.use(compression());

// Serving static files
app.use("/images", (req, res, next) => {
  res.set({
    "Cross-Origin-Resource-Policy": "cross-origin",
  });
  next();
});

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static('public'));

//cross-origin-resources-sharing
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// access-control
app.use(cors(corsOptions));

//View
app.use("/", viewRouter);
app.use("/admin", admin_viewRouter);

//API
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/category", categoryRouter);

module.exports = app;
