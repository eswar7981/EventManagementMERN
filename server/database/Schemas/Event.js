const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    minLength: 3,
  },
  weatherInfo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
