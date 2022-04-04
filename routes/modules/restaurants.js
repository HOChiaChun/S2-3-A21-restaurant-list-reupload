const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")


router.get("/new", (req, res) => {
  return res.render("new")
})

router.post("/", (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  return Restaurant.create({
    userId, name, name_en, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

router.get("/:restaurant_id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

router.get("/:restaurant_id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

router.put("/:restaurant_id", (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => next(new Error(`some error ${error}`)))
})

router.delete("/:restaurant_id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})



module.exports = router