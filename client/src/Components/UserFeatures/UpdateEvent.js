import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventIcon from "@mui/icons-material/Event";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateEvent = () => {
  const token = useSelector((state) => state.user.token);
  const events=useSelector((state)=>state.user.events)
  const navigate=useNavigate()

  const {eventId}=useParams()
  const eventDetails=events.filter((event)=>event._id===eventId)[0]
 console.log(eventId,eventDetails)

  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    name:eventDetails.name,
    date:eventDetails.date,
    location:eventDetails.location,
    weatherInfo:eventDetails.weatherInfo,
    description:eventDetails.description,
  });


/*
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
      const data = await response.json();
      const weatherInfo = data.data.weather.description;
      const temperature = (
        (data.data.max_temp + data.data.min_temp) /
        2
      ).toFixed(2);
      setUpdatedEventDetails({
        ...eventDetails,
        ["weatherInfo"]: `${weatherInfo} and temperature will be around ${temperature}`,
      });
    }, 500);
    return () => {
      clearInterval(delayFetch);
    };
  }, [eventDetails.location, eventDetails.date]);


  */
  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  const inputHandler = (e, name) => {
    if (e.target.value !== "") {
      setUpdatedEventDetails({ ...eventDetails, [name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify({
        name: updatedEventDetails.name,
        date: updatedEventDetails.date,
        location:updatedEventDetails.location,
        description:updatedEventDetails.description,
        weatherInfo:updatedEventDetails.weatherInfo,
      }),
      headers: {
        "Content-Type": "application/json",
        sessionToken: token,
      },
    })

    if(response.ok) {
      console.log("successful");
      navigate('/upcoming-events')
    } else {
      console.log("failed");
    }
    console.log('hii')
    
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
          <EventIcon color="primary" /> Update Event
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
            value={updatedEventDetails.name}
            onChange={(e) => inputHandler(e, "name")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            placeholder="About the event"
            value={updatedEventDetails.description}
            onChange={(e) => inputHandler(e, "description")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="date"
            value={updatedEventDetails.date.slice(0,10)}
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
            value={updatedEventDetails.location}
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
          <NavLink to='/upcoming-events'>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Cancel
          </Button>
          </NavLink>
          
          <Button onClick={submitHandler} type="submit" variant="contained" sx={{ mt: 3, mb: 2,ml:20}}>
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateEvent;
