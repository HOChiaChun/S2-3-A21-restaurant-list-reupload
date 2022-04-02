const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")


router.get("/search", (req, res) => {
  const userId = req.user._id
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

  Restaurant.find({ userId, $or: [{ name: { $regex: keyword, $options: 'i' } }, 
                          { category: { $regex: keyword, $options: 'i' } }
                         ] 
                  })
      .lean()
      .sort(mode)
      .then( restaurants => res.render("index", { restaurants, keyword, sort}))
      .catch(error => console.log(error))
})
 


module.exports = router
