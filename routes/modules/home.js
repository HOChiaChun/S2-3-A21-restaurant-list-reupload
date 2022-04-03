const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")


router.get("/", (req, res) => {
  const userId = req.user._id
  const firstlogin = { }
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render("index", { restaurants, firstlogin }))
    .catch(error => console.log(error))
})


module.exports = router