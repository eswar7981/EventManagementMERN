const Event = require("../database/Schemas/Event");
const supabase = require("../config/supabase.config");
const mongoose = require("mongoose");
const Session = require("../database/Schemas/Session");

exports.addNewEvent = (req, res) => {
  const {
    name: name,
    date: date,
    location: location,
    description: description,
    weatherInfo: weatherInfo,
  } = req.body;

  try {
    const newEvent = new Event({
      name: name,
      date: new Date(date),
      location: location,
      description: description,
      weatherInfo: weatherInfo,
      userId: req.id,
    });
    newEvent.save();

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.id });
    res.status(200).json({ events: events });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateEventDetails = async (req, res) => {
  const {
    name: name,
    date: date,
    location: location,
    description: description,
    weatherInfo: weatherInfo,
  } = req.body;

  const { id } = req.params;

  try {
    const updateEvent = await Event.updateOne(
      { _id: id },
      {
        name: name,
        date: new Date(date),
        location: location,
        description: description,
        weatherInfo: weatherInfo,
        userId: req.id,
      }
    );

    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getWeatherInfo = async (req, res) => {
  const { location: location, date: date } = req.query;
  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${process.env.WEATHER_API_ACCESS_KEY}`
    );

    if (response) {
      const responseData = await response.json();
      if (responseData) {
        const weatherForecast = await responseData.data.filter(
          (day) => day.valid_date === date
        )[0];

        return res
          .status(200)
          .json({ data: weatherForecast });
      } else {
        return res.status(404).json({ data: { message: "no data found" } });
      }
    } else {
      return res.status(400).json({ data: { message: "enter a valid city" } });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSessionsInfo = async (req, res) => {
  const userId = new mongoose.mongo.ObjectId(req.id);
  try {
    const sessions = await Session.find({ userId: userId });
    return res.status(200).json({ status: "success", data: sessions });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEvent = await Event.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logOut = async (req, res) => {
  const { sessiontoken } = req.headers;
  try {
    const { error } = await supabase.auth.signOut(sessiontoken);
    const userId = new mongoose.mongo.ObjectId(req.id);
    const updateSession = await Session.updateOne(
      { userId: userId, ipAddress: req.ip },
      { logoutTime: new Date() }
    );
    if (error === null) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
