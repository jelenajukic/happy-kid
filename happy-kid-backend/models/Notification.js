const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  //title: String,
  notification: String,
  kidID: {
    type: Schema.ObjectId,
    ref: 'Kid',
    required: true
  },
  date: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
