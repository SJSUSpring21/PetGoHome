const express = require("express");
const app = require("../app");
const router = express.Router();

const auth = require("./userauth");
const location = require("./location");

router.use("/auth", auth);
router.use("/location", location);

module.exports = router;
