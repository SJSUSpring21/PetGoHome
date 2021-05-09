const express = require("express");
const router = express.Router();

const auth = require("./userauth");

router.use("/auth", auth);

module.exports = router;
