import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventIcon from "@mui/icons-material/Event";
import { useSelector } from "react-redux";
import { userActions } from "../../Store/User";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const UpcomingEvents = () => {
  const token = useSelector((state) => state.user.token);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionToken: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.setEvents(data.events));
        const filteredEvents = data.events.filter(
          (event) => new Date(event.date).getTime() >= new Date().getTime()
        );
        console.log(filteredEvents);
        setUpcomingEvents(filteredEvents);
      } else {
      }
    };
    fetchEvents();
  }, [update]);

  const deleteHandler = async (e, eventId) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          sessionToken: token,
        },
      }
    );

    if (response.ok) {
      console.log("success");
      setUpdate(!update);
    } else {
      console.log("delete failed")

    }
  };

  

  return (
    <Container sx={{ mt: 10, display: "flex" }} component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Upcoming Events
        {upcomingEvents &&
          upcomingEvents.map((event) => (
            <Container>
              <Box sx={{ fontSize: "s" }}>
                <p>{event.name}</p>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <p>{event.location}</p>
                <p>{event.weatherInfo}</p>
              </Box>
              <NavLink to={`/update-event/${event._id}`}>
              <Button>Update</Button>
              </NavLink>
            
              <Button onClick={(e) => deleteHandler(e, event._id)}>
                Delete
              </Button>
            </Container>
          ))}
      </Typography>
    </Container>
  );
};

export default UpcomingEvents;
