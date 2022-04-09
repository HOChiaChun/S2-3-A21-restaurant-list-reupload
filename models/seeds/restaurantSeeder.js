const bcrypt = require("bcryptjs")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const Restaurant = require("../restaurant")
const User = require('../user')
const restaurantUser1List = require("../../restaurantUser1.json")
const restaurantUser2List = require("../../restaurantUser2.json")
const db = require("../../config/mongoose")

const SEED_USER = [
  { name: 'User1', email: 'user1@example.com', password: '12345678'},
  { name: 'User2', email: 'user2@example.com', password: '12345678'}
 ]





db.once('open', () => {
  Promise.all([
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[0].password, salt))
      .then(hash => User.create({
        name: SEED_USER[0].name,
        email: SEED_USER[0].email,
        password: hash
      }))
      .then(user => {
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => {
            const userId = user._id
            const { name, name_en, category, image, location, phone, google_map, rating, description } = restaurantUser1List.results[i]
            return Restaurant.create({ userId, name, name_en, category, image, location, phone, google_map, rating, description })
          }
        ))
      })
    , 
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[1].password, salt))
      .then(hash => User.create({
        name: SEED_USER[1].name,
        email: SEED_USER[1].email,
        password: hash
      }))
      .then(user => {
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => {
            const userId = user._id
            const { name, name_en, category, image, location, phone, google_map, rating, description } = restaurantUser2List.results[i]
            return Restaurant.create({ userId, name, name_en, category, image, location, phone, google_map, rating, description })
          }
        ))
      })
  ])
  .then(() => {
      console.log('done.')
      process.exit()
  })
})
