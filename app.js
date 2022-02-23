const express = require("express") 
const app = express()
const port = 3000
const exphbs = require("express-handlebars")
const restaurantList = require("./restaurant.json")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/restaurant-list")

const db = mongoose.connection

db.on("rerror", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

//我已做到這步，已讓webserver連線上 database

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(express.static("public"))


app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results })
})

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render("show", { restaurant })
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
  res.render("index", { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`This Web Server is on : http://localhost:${port}`)
})