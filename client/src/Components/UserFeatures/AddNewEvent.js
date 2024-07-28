import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventIcon from "@mui/icons-material/Event";
import { useSelector } from "react-redux";

const AddNewEvent = () => {
  const token = useSelector((state) => state.user.token);

  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    location: "",
    weatherInfo: "weather updates will come from 14 days",
    description: "",
  });

  useEffect(() => {
    const delayFetch = setTimeout(async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/weather?location=${eventDetails.location}&date=${eventDetails.date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const weatherInfo = data.data.weather.description;
        const temperature = (
          (data.data.max_temp + data.data.min_temp) /
          2
        ).toFixed(2);

        setEventDetails({
          ...eventDetails,
          ["weatherInfo"]: `${weatherInfo} and temperature will be around ${temperature}`,
        });
      } else {
      }
    }, 500);
    return () => {
      clearInterval(delayFetch);
    };
  }, [eventDetails.location, eventDetails.date]);

  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  const inputHandler = (e, name) => {
    if (e.target.value !== "") {
      setEventDetails({ ...eventDetails, [name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/events`, {
      method: "POST",
      body: JSON.stringify({
        name: eventDetails.name,
        date: eventDetails.date,
        location: eventDetails.location,
        description: eventDetails.description,
        weatherInfo: eventDetails.weatherInfo,
      }),
      headers: {
        "Content-Type": "application/json",
        sessionToken: token,
      },
    });

    if (response.ok) {
      console.log("successful");
    } else {
      console.log("failed");
    }
  };
  return (
    <Container
      sx={{
        bgcolor: "#F9F9F9",
        marginTop: 13,
        border: "solid",
        padding: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#D1D1D1",
      }}
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          <EventIcon color="primary" /> Add Event
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Event Name"
            placeholder="Business Conference"
            onChange={(e) => inputHandler(e, "name")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            placeholder="About the event"
            onChange={(e) => inputHandler(e, "description")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="date"
            onChange={(e) => inputHandler(e, "date")}
            shouldDisableDate={disableWeekends}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Location"
            placeholder="Hyderabad"
            type="text"
            onChange={(e) => inputHandler(e, "location")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="weather Info"
            type="text"
            disabled
            value={eventDetails.weatherInfo}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddNewEvent;
