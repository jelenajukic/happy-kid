const express = require("express");
const router = express.Router();
const TimeLineMessage = require("../models/TimeLineMessage")
const User = require("../models/User")
const Notification = require("../models/Notification")

// router.get("/messages", (req, res, next) => {
//   User.findOne({ _id: req.query.id })
//     .then(user => { return user.kidsID.map(kidID => TimeLineMessage.find({ kidID: kidID }).populate("kidID")) })
//     .then(promises => {
//       return promises.map((promise) =>
//         promise.then(message => { return { images: message.images, kid: message.kidID } }))
//     })
//     .then(result =>
//       Promise.all(result)
//     .then(result => console.log(result)))
//      //.then(result => res.status(200).json(result)))
//     .catch(error => console.log(error))
// });

router.get("/messages", (req, res, next) => {
  User.findOne({ _id: req.query.id })
    .then(user => { return user.kidsID.map(kidID => TimeLineMessage.find({ kidID: kidID }).populate("kidID")) })
    .then(promises => {
      return promises.map((promise) =>
        promise.then(message => message.map(item => { return { images: item.images, kid: item.kidID, messageTitle: item.messageTitle, messageBody: item.messageBody } })))
    })
    .then(result =>
      Promise.all(result)
        .then(result => res.status(200).json(result)))
    .catch(error => console.log(error))
});


router.get("/parentKids", (req, res, next) => {
  User.findOne({ _id: req.query.id }).populate("kidsID")
    .then(result => res.status(200).json(result))
})

router.post("/createNotification", (req, res, next) => {
  console.log(req.body)
  Notification.create(req.body)
    .then((result) => console.log("DB Notification is updated"))
    .catch(error => console.log(error))
})

module.exports = router;