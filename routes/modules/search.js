const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

router.get("/search", (req, res) => {
  
  const sort = req.query.sort 
  const keyword = req.query.keyword.trim()


  if (!req.query.keyword && sort === "Ａ > Z") {
    Restaurant.find()
      .lean()
      .sort({ name: "asc" })
      .then(restaurants => res.render("index", { restaurants, sort1:sort }))
      .catch(error => console.log(error))
  } else if (!req.query.keyword && sort === "Z > A") {
    Restaurant.find()
      .lean()
      .sort({ name: "desc" })
      .then(restaurants => res.render("index", { restaurants, sort2:sort }))
      .catch(error => console.log(error))
  } else if (!req.query.keyword && sort === "類別") {
    Restaurant.find()
      .lean()
      .sort({ category: -1 })
      .then(restaurants => res.render("index", { restaurants, sort3:sort }))
      .catch(error => console.log(error))
  } else if (!req.query.keyword && sort === "地區") {
    Restaurant.find()
      .lean()
      .sort({ location: 1 })
      .then(restaurants => res.render("index", { restaurants, sort4:sort }))
      .catch(error => console.log(error))
  } else {
    Restaurant.find({ name: { $regex: keyword, $options: "i" } })
      .lean()
      .then(restaurants => res.render("index", { restaurants, keyword }))
      .catch(error => console.log(error))
  }
})


module.exports = router