import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventIcon from "@mui/icons-material/Event";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AddNewEvent = () => {
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    location: "",
    weatherInfo: "weather updates will come from 14 days",
    description: "",
  });

  useEffect(() => {
    if (eventDetails.location !== "" && eventDetails.date !== "") {
      const delayFetch = setTimeout(async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/weather?location=${eventDetails.location}&date=${eventDetails.date}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              sessionToken: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const weatherInfo = data.data.weather.description;
          const temperature = (
            (data.data.max_temp + data.data.min_temp) /
            2
          ).toFixed(1);

          setEventDetails({
            ...eventDetails,
            ["weatherInfo"]: `${weatherInfo} and temperature will be around ${temperature} °C`,
          });
        } else {
          const data = response.json();
          setDisplayMessage({
            status: true,
            mode: "info",
            message: "select a valid location",
          });

          setTimeout(() => {
            setDisplayMessage({ ...displayMessage, ["status"]: false });
          }, 2000);
        }
      }, 700);

      return () => {
        clearInterval(delayFetch);
      };
    }
  }, [eventDetails.location, eventDetails.date]);

  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  const dateHandler = (e, name) => {
    const date = new Date();
    date.setDate(date.getDate() + 13);
    if (new Date(e.target.value).getTime() < new Date().getTime()) {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "select a valid date",
      });
      setEventDetails({ ...eventDetails, ["date"]: "" });
      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    } else if (new Date(e.target.value).getTime() > date.getTime()) {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "Choose a date in next 14 days only",
      });
      setEventDetails({ ...eventDetails, ["date"]: "" });
      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    } else {
      setEventDetails({ ...eventDetails, ["date"]: e.target.value });
    }
  };

  const inputHandler = (e, name) => {
    if (e.target.value !== "") {
      setEventDetails({ ...eventDetails, [name]: e.target.value });
    } else if (e.target.value === "" && name === "location") {
      setEventDetails({
        ...eventDetails,
        ["weatherInfo"]: "enter location to get weather update",
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
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
        setDisplayMessage({
          status: true,
          mode: "success",
          message: "event is added successfully",
        });

        setTimeout(() => {
          setDisplayMessage({ ...displayMessage, ["status"]: false });
        }, 2000);

        setTimeout(() => {
          navigate("/upcoming-events");
        }, 500);
      } else {
        setDisplayMessage({
          status: true,
          mode: "info",
          message: "unable to add event",
        });

        setTimeout(() => {
          setDisplayMessage({ ...displayMessage, ["status"]: false });
        }, 2000);
      }
    } else {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "please fill all the fields",
      });

      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    }
  };

  return (
    <>
      {displayMessage.status && (
        <div style={{ position: "fixed", top: "80px" }}>
          <Alert variant="filled" severity={displayMessage.mode}>
            {displayMessage.message}
          </Alert>
        </div>
      )}
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
              multiline={true}
              rows={6}
              placeholder="About the event"
              onChange={(e) => inputHandler(e, "description")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="date"
              value={eventDetails.date}
              onChange={(e) => dateHandler(e, "date")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Enter a valid Location"
              placeholder="Hyderabad"
              type="text"
              onChange={(e) => inputHandler(e, "location")}
            />
            <TextField
              multiline={true}
              rows={2}
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
          <Typography sx={{color:'grey'}}>
          ( *Note: currently we can forecast weather for next 14
            days only )
          </Typography>
          
        </Box>
      </Container>
    </>
  );
};

export default AddNewEvent;
