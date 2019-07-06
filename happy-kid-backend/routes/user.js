const express = require("express");
const router = express.Router();
const TimeLineMessage = require("../models/TimeLineMessage")
const User = require("../models/User")
const Notification = require("../models/Notification")
const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
  instanceLocator: process.env.instanceLocator,
  key: process.env.key
});

router.get("/messages", (req, res, next) => {
  User.findOne({ _id: req.query.id })
    .then(user => { return user.kidsID.map(kidID => TimeLineMessage.find({ kidID: kidID }).sort('-created_at').populate("kidID")) })
    .then(promises => {
      return promises.map((promise) =>
        promise.then(message => message.map(item => { return { images: item.images, kid: item.kidID, messageTitle: item.messageTitle, messageBody: item.messageBody, created_at:item.created_at } })))
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


//create chat user end-points

router.post("/users", (req, res) => {
  const userId = req.body.userId;

  chatkit
    .createUser({
      id: userId,
      name: userId
    })
    .then((result) => {
      res.sendStatus(200)
    })
    .catch(err => {
      if (err.error === "services/chatkit/user_already_exists") {
        console.log(`User already exists: ${userId}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });
});

router.post("/getrooms", (req, res) => {
  chatkit.getUserRooms({
    userId: req.body.userId,
  })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
    });
})

router.get("/fetchroommessages", (req, res) => {
  console.log(req.query)
  chatkit.fetchMultipartMessages({
    roomId: "",
    limit: 10,
  })
    .then(messages => res.status(200).json(messages))
    .catch(error => console.log(error))
})

router.get("/getallrooms", (req, res) => {
  chatkit.getRooms({ includePrivate: true })
    .then(rooms => {
      console.log('got rooms', rooms);
      res.status(200).json(rooms)
    })
    .catch(err => console.error(err))
})

//chat user end points end

module.exports = router;