const Event = require("../database/Schemas/Event");
const mongoose = require("mongoose");

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
    res.status(200);
  } catch (e) {
    console.log(e.message);
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.id });
    res.status(200).json({ events: events });
  } catch (e) {
    console.log(e.message);
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

    return res.status(200);
  } catch (e) {
    console.log(e.message);
  }
};

exports.getWeatherInfo = async (req, res) => {
  const { location: location, date: date } = req.query;
  console.log(location, date);
  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${process.env.WEATHER_API_ACCESS_KEY}`
    );
    const responseData = await response.json();
    const weatherForecast = await responseData.data.filter(
      (day) => day.valid_date === date
    )[0];

    return res.status(200).json({ status: "success", data: weatherForecast });
  } catch (e) {
    console.log(e.message);
  }
};

exports.getSessionsInfo = async (req, res) => {};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEvent = await Event.deleteOne({ _id: id });
    res.status(200);
  } catch (e) {
    console.log(e.message);
  }
};
