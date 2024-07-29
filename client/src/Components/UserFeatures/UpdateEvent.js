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
import Alert from "@mui/material/Alert";

const UpdateEvent = () => {
  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const token = useSelector((state) => state.user.token);
  const events = useSelector((state) => state.user.events);
  const navigate = useNavigate();

  const { eventId } = useParams();
  const eventDetails = events.filter((event) => event._id === eventId)[0]

  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    name: eventDetails.name,
    date: eventDetails.date.slice(0, 10),
    location: eventDetails.location,
    weatherInfo: eventDetails.weatherInfo,
    description: eventDetails.description,
  });

  useEffect(() => {
    if (
      updatedEventDetails.location !== eventDetails.location ||
      updatedEventDetails.date !== eventDetails.date
    ) {
      const delayFetch = setTimeout(async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/weather?location=${updatedEventDetails.location}&date=${updatedEventDetails.date.slice(0,10)}`,
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

          if (data.data) {
            const weatherInfo = data.data.weather.description;
            const temperature = (
              (data.data.max_temp + data.data.min_temp) /
              2
            ).toFixed(1);
            setUpdatedEventDetails({
              ...updatedEventDetails,
              ["weatherInfo"]: `${weatherInfo} and temperature will be around ${temperature} °C`,
            });
          }
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
  }, [updatedEventDetails.location, updatedEventDetails.date]);

  const dateHandler = (e, name) => {
    const date = new Date();
    date.setDate(date.getDate() + 13);
    if (new Date(e.target.value).getTime() < new Date().getTime()) {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "select a valid date",
      });
      setUpdatedEventDetails({ ...updatedEventDetails, ["date"]: eventDetails.date.slice(0,10)  });
      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    } else if (new Date(e.target.value).getTime() > date.getTime()) {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "Choose a date in next 14 days only",
      });
      setUpdatedEventDetails({ ...updatedEventDetails, ["date"]: eventDetails.date.slice(0,10) });
      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    } else {
      setUpdatedEventDetails({
        ...updatedEventDetails,
        ["date"]: e.target.value,
      });
    }
  };

  const inputHandler = (e, name) => {
    setUpdatedEventDetails({ ...updatedEventDetails, [name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/events/${eventId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: updatedEventDetails.name,
            date: updatedEventDetails.date,
            location: updatedEventDetails.location,
            description: updatedEventDetails.description,
            weatherInfo: updatedEventDetails.weatherInfo,
          }),
          headers: {
            "Content-Type": "application/json",
            sessionToken: token,
          },
        }
      );

      if (response.ok) {
        setDisplayMessage({
          status: true,
          mode: "success",
          message: "event is updated successfully",
        });

        setTimeout(() => {
          setDisplayMessage({ ...displayMessage, ["status"]: false });
        }, 2000);

        setTimeout(() => {
          navigate("/upcoming-events");
        }, 500);
      } else {
        const data = await response.json();
        setDisplayMessage({
          status: true,
          mode: "info",
          message: "event updation failed",
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
            <EventIcon color="primary" /> Update Event
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Event Name"
              value={updatedEventDetails.name}
              onChange={(e) => inputHandler(e, "name")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              multiline={true}
              rows={6}
              value={updatedEventDetails.description}
              onChange={(e) => inputHandler(e, "description")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="date"
              value={updatedEventDetails.date}
              onChange={(e) => dateHandler(e, "date")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Enter a valid Location"
              type="text"
              value={updatedEventDetails.location}
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
              value={updatedEventDetails.weatherInfo}
            />

            <NavLink to="/upcoming-events">
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Cancel
              </Button>
            </NavLink>

            <Button
              onClick={submitHandler}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 20 }}
            >
              Confirm
            </Button>
          </Box>
          <Typography sx={{ color: "grey" }}>
            ( *Note: currently we can forecast weather for next 14 days only )
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default UpdateEvent;
