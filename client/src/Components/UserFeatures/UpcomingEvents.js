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
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpcomingEvents = () => {
  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const navigate = useNavigate();

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
        setUpcomingEvents(filteredEvents.reverse());
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
      setDisplayMessage({
        status: true,
        mode: "success",
        message: "event is deleted successfully",
      });

      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);

      setTimeout(() => {
        navigate("/upcoming-events");
      }, 500);
      setUpdate(!update);
    } else {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "event deletion failed",
      });

      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    }
  };

  return (
    <>
     <Container
        sx={{ mt: 15, display: "block"}}
        component="main"
        maxWidth="xs"
      >
      {displayMessage.status && (
        <div style={{ position: "fixed", top: "80px" }}>
          <Alert variant="filled" severity={displayMessage.mode}>{displayMessage.message}</Alert>
        </div>
      )}
     
        {upcomingEvents && upcomingEvents.length === 0 ? (
          <Typography sx={{mb:5}} component="h1" variant="h5">
            No Upcoming Events
          </Typography>
        ) : (
          <Typography sx={{mb:5}} component="h1" variant="h5">
            Upcoming Events
          </Typography>
        )}
        {upcomingEvents &&
          upcomingEvents.map((event) => (
            <Box
              component="h7"
              variant="h2"
              sx={{
                fontSize: "s",
                display: "block",
                bgcolor: "#ADD8E6",
                mb: 10,
                p: 5,
                borderRadius: 5,
              }}
            >
              <Box alignItems="start" sx={{ display: "flex", width: 1 }}>
                <Typography variant="h6" sx={{ color: "black" }}>
                  Event
                </Typography>
                <Typography variant="h6" sx={{ ml: 5, fontWeight: "500",color:'#333333' }}>
                  : {event.name}
                </Typography>
              </Box>
              <Box alignItems="center" sx={{ display: "flex", }}>
                <Typography variant="h6">Date </Typography>
                <Typography variant="h6" sx={{ ml: 6, fontWeight: "500",color:'#333333' }}>
                  : {new Date(event.date).getUTCDate()}-
                  {new Date(event.date).getUTCMonth() + 1}-
                  {new Date(event.date).getUTCFullYear()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Location </Typography>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: "500",color:'#333333' }}>
                  : {event.location}
                </Typography>
              </Box>
              <Box align="start" sx={{ display: "block" }}>
                <Typography  variant="h6">Description : </Typography>
                <Typography  fullWidth  variant="h6" sx={{ ml: 10 ,color:'#333333',fontWeight:'500'}}>
                  {event.description}
                </Typography>
              </Box>

              <Box align="start" sx={{ display: "block",mt:1 }}>
                <Typography variant="h6">weather Update : </Typography>
                <Typography   sx={{mt:1,color:'#003366',fontWeight:'600'}} variant="h6">{event.weatherInfo}</Typography>
              </Box>
              <NavLink to={`/update-event/${event._id}`}>
                <Button sx={{ mt: 4 }} variant="contained">
                  Update
                </Button>
              </NavLink>

              <Button
                sx={{ ml: 10, mt: 4 }}
                variant="contained"
                onClick={(e) => deleteHandler(e, event._id)}
              >
                Delete
              </Button>
            </Box>
          ))}
      </Container>
    </>
  );
};

export default UpcomingEvents;
