const express = require("express")
const router = express.Router()
const User = require("../../models/user")


router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/login", (req, res) => {
  console.log("Hi")
})//未完成

router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  const { name, email, password, confimPassword } = req.body
  User.create({ name, email, password, confimPassword })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})



module.exports = router