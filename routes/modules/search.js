const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

router.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  let sort = req.query.sort
  let mode = {}

  switch(sort) {
    case "A > Z":
      mode = { name: "asc" }
      break;
    case "Z > A":
      mode = { name: "desc" }
      break;
    case "類別":
      mode = { category: 1 }
      break;
    case "地區":
      mode = { location: -1 }
      break;
  }

  Restaurant.find()
      .lean()
      .sort(mode)
      .then(restaurants => {
        const restaurantsfilter = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword))
        res.render("index", { restaurants: restaurantsfilter, keyword, sort})
      })
      .catch(error => console.log(error))
})
 


module.exports = router
