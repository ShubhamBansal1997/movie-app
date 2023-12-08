const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const helmet = require("helmet");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

app.use(cookieParser());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Passport jwt authentication config
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
// use passport middleware
// map "jwt" strategy to jwtStrategy file

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;