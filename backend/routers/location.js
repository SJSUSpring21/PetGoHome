const express = require("express");
const db = require("../models");
const app = require("../app");
const { Op } = require("sequelize");
const router = express.Router();

app.post("/getLocations", async (req, res) => {
  try {
    const loc = await db.Data.findAll({
      // limit: 10,
      attributes: ["id", "lost_location", "latitude", "longitude"],
    });
    res.status(200).send(loc);
  } catch (error) {
    console.log(error);
  }
});

// app.post("/setLatLong", async (req, res) => {
//   console.log(req.body);
//   try {
//     await db.Data.update(
//       { latitude: 2, longitude: 2 },
//       {
//         where: { id: { [Op.eq]: 22 } },
//       }
//     ).then((result) => {
//       console.log(result);
//       res.status(200).send(result);
//     });
//   } catch (error) {
//     console.log(err);
//   }
// });

app.post("/setLatLong", async (req, res) => {
  console.log(req.body);
  try {
    await db.Data.update(
      {
        location: req.body.loc,
      },
      {
        where: { id: req.body.id },
      }
    ).then((result) => {
      console.log(result);
      res.status(200).end();
    });
  } catch (error) {
    console.log(err);
  }
});

app.post("/getLatLong", async (req, res) => {
  try {
    await db.Data.findOne({
      where: { id: req.body.id },
    }).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
