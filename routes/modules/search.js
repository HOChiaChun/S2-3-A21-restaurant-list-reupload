const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

router.get("/search", (req, res) => {
  
  const sort = req.query.sort 
  const keyword = req.query.keyword.trim()

  switch (sort) {
    case "A > Z":
      mode = "asc"
      break;
    case "Z > A":
      mode = "desc"
      break;
    case "類別":
      mode =  1
      break;
    case "地區":
      mode = -1
      break;
  }

  if (!req.query.keyword) {
    Restaurant.find()
      .lean()
      .sort({ name: mode })
      .then(restaurants => res.render("index", { restaurants}))
      .catch(error => console.log(error))
  } else {
    Restaurant.find({ name: { $regex: keyword, $options: "i" } })
      .lean()
      .then(restaurants => res.render("index", { restaurants, keyword }))
      .catch(error => console.log(error))
  }
})


module.exports = router