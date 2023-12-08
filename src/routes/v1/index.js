const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const movieRoute = require("./movie.route");

const router = express.Router();
router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/movie", movieRoute);

module.exports = router;
