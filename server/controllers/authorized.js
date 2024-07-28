exports.addNewEvent = (req, res) => {};

exports.getAllEvents = (req, res) => {};

exports.updateEventDetails = (req, res) => {};

exports.getWeatherInfo = async (req, res) => {
  const { location: location } = req.params;
  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${process.env.WEATHER_API_ACCESS_KEY}`
    );
    const data = await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

exports.getSessionsInfo = (req, res) => {};

exports.deleteEvent = (req, res) => {};
