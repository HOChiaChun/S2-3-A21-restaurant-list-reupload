const express = require("express")
const router = express.Router()
const User = require("../../models/user")
const passport = require("passport")


router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login"
}))

router.post("/register", (req, res) => {
  const { name, email, password, confimPassword } = req.body
  User.create({ name, email, password, confimPassword })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})



module.exports = router