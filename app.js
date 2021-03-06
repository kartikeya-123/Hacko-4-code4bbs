const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const middleware = require("./utils/middleware");
const clientEndpoints = ["discover", "profile", "update"];
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const searchRouter = require("./routes/searchRoutes");
const sportRouter = require("./routes/sportRoutes");
const complaintRouter = require("./routes/complaintRoutes");
const courseRouter = require("./routes/courseRoutes");
const timeTableRouter = require("./routes/timeTableRoutes");
const messRouter = require("./routes/menuRoutes");
// const adminRouter = require('./routes/adminRoutes');
// require('./cronJobs/backup');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(xss());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());

app.use(middleware.requestLogger);

app.use(express.static(path.join(__dirname, "client/build")));

//Authentication Endpoint
app.use("/api/v1/auth", authRouter);

//Sport Equipment routes
app.use("/api/v1/sport", sportRouter);

//Complaint Routes
app.use("/api/v1/complaint", complaintRouter);

app.use("/api/v1/course", courseRouter);
app.use("/api/v1/timetable", timeTableRouter);

//user routes
app.use("/api/v1/user", userRouter);

//Menu Routes
app.use("/api/v1/mess", messRouter);
//Search Endpoints
app.use("/api/v1/search", searchRouter);

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
