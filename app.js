const express = require("express") 
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const Restaurant = require("./models/restaurant")
const bodyParser = require("body-parser")
const restaurant = require("./models/restaurant")
const res = require("express/lib/response")

const app = express()
const port = 3000

mongoose.connect("mongodb://localhost/restaurant-list")

const db = mongoose.connection

db.on("rerror", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

app.get("/restaurants/new", (req, res) => {
  return res.render("new")
})

app.post("/restaurants", (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({
    name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

app.get("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
})

app.get("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

app.post("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
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
    .then(() => res.redirect(`/restaurants/${id}`)) 
    .catch(error => console.log(error))
})

app.post("/restaurants/:restaurant_id/delete", (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
  res.render("index", { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`This Web Server is on : http://localhost:${port}`)
})