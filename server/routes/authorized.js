const express = require("express");
const router = express.Router();
const controller = require("../controllers/authorized");
const User = require("../database/Schemas/User");
const supabase = require("../config/supabase.config");
const mongoose = require("mongoose");

router.use("/", async (req, res, next) => {
  const { sessiontoken: sessionToken } = req.headers;

  try {
    const { data: data, error } = await supabase.auth.getUser(sessionToken);
    if (!error) {
      const user = await User.findOne({ supabaseId: data.user.id });
      req.id = user._id;
      next();
    } else {
      res.status(404).json({ error: 'not a valid token' });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/events", controller.addNewEvent);
router.get("/events", controller.getAllEvents);
router.put("/events/:id", controller.updateEventDetails);
router.delete("/events/:id", controller.deleteEvent);
router.get("/sessions", controller.getSessionsInfo);
router.get("/weather", controller.getWeatherInfo);
router.delete("/log-out", controller.logOut);

module.exports = router;
