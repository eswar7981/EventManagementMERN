const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  loginTime: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  logoutTime: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Session", SessionSchema);
