const express = require("express");
const router = express.Router();
const controller=require('../controllers/authorized')

router.use("/", (req,res,next) => {
  next();
});

router.post("/events",controller.addNewEvent);

router.get("/events",controller.getAllEvents);

router.put("/events/:id",controller.updateEventDetails);

router.delete("/events/:id",controller.deleteEvent);

router.get("/sessions",controller.getSessionsInfo);

router.get("/weather/:location",controller.getWeatherInfo);


module.exports=router