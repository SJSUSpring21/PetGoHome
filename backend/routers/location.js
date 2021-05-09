const express = require("express");
const db = require("../models");
const app = require("../app");
const router = express.Router();

app.post("/getLocations", async (req, res) => {
  try {
    const loc = await db.Data.findAll({
      limit: 20,
      attributes: ["lost_location"],
    });
    return res.status(200).send(loc);
  } catch (error) {
    console.log(error);
  }
  return res.status(500).send("Internal Server Error!");
});

module.exports = router;
