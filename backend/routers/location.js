const express = require("express");
const db = require("../models");
const app = require("../app");
const { Op } = require("sequelize");
const router = express.Router();
const Promise = require("bluebird");
const moment = require("moment");

app.post("/getLocations", async (req, res) => {
  try {
    const loc = await db.Data.findAll({
      limit: 10,
      where: {
        location: {
          [Op.and]: [
            { [Op.substring]: req.body.city || "" },
            {
              [Op.substring]: req.body.state ? " " + req.body.state + " " : "",
            },
            { [Op.substring]: req.body.pin || "" },
          ],
        },
      },
      attributes: [
        "id",
        "record_type",
        "type",
        "gender",
        "color",
        "breed",
        "missing_date",
        "latitude",
        "longitude",
        "location",
        "image",
      ],
    });
    res.status(200).send(loc);
  } catch (error) {
    console.log(error);
  }
});

app.post("/getLocationsForFeed", async (req, res) => {
  console.log(req.body);
  try {
    // let qry = {};
    // if (req.body.pet_type !== "All") {
    //   qry["pet_type"] = req.body.pet_type;
    // }
    // if (req.body.record_type !== "All") {
    //   qry["record_type"] = req.body.record_type;
    // }
    // qry["missing_date"] = {
    //   [Op.gte]: moment().subtract(req.body.missing_date, "days").toDate,
    // };
    // console.log(qry);
    const loc = await db.LostPet.findAll({
      limit: 20,
      where: {
        pet_type: {
          [Op.substring]: req.body.pet_type !== "All" ? req.body.pet_type : "",
        },
        record_type: {
          [Op.substring]:
            req.body.record_type !== "All" ? req.body.record_type : "",
        },
        missing_date: {
          [Op.gte]: moment().subtract(req.body.missing_date, "days").toDate(),
        },
      },
    });
    console.log(loc);
    res.status(200).send(loc);
  } catch (error) {
    console.log(error);
  }
});

// app.post("/dogPopulate", async (req, res) => {
//   try {
//     const loc = await db.Data.destroy({
//       where: {
//         image: { [Op.eq]: null },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

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
