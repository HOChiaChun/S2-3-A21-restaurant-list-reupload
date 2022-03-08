const express = require("express") 
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const routes = require("./routes")

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

app.use(methodOverride("_method"))
app.use(routes)



app.listen(port, () => {
  console.log(`This Web Server is on : http://localhost:${port}`)
})