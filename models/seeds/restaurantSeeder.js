const bcrypt = require("bcryptjs")
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require("../restaurant")
const User = require('../user')
const restaurantList = require("../../restaurant.json")
const db = require("../../config/mongoose")

const SEED_USER = [
  { name: 'User1', email: 'user1@example.com', password: '12345678'},
  { name: 'User2', email: 'user2@example.com', password: '12345678'}
 ]

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[0].password, salt))
    .then(hash => User.create({
      name: SEED_USER[0].name,
      email: SEED_USER[0].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 3 },
        (_, i) => Restaurant.create({
          name: restaurantList.results[i].name,
          name_en: restaurantList.results[i].name_en,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          rating: restaurantList.results[i].rating,
          description: restaurantList.results[i].description,
          userId
        })
      ))
    })
    .then(() => {
      console.log("done")
    })
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[1].password, salt))
    .then(hash => User.create({
      name: SEED_USER[1].name,
      email: SEED_USER[1].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for(let i = 3; i <= 5; i++) {
        Restaurant.create({
          name: restaurantList.results[i].name,
          name_en: restaurantList.results[i].name_en,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          rating: restaurantList.results[i].rating,
          description: restaurantList.results[i].description,
          userId
        })
      }
    })
    .then(() => {
      console.log("done")
    })
})