import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventIcon from "@mui/icons-material/Event";

const CompletedEvents = () => {
  const events = useSelector((state) => state.user.events);
  const completedEvents = events.filter(
    (event) => new Date(event.date).getTime() < new Date().getTime()
  );


  return (
    <Container sx={{ mt: 15, display: "block",mb:5 }} component="main" maxWidth="xs">
      {completedEvents && completedEvents.length === 0 ? (
        <Typography sx={{mb:5}} component="h1" variant="h5">
          No Past Events
        </Typography>
      ) : (
        <Typography sx={{mb:5}} component="h1" variant="h5">
          Past Events
        </Typography>
      )}
      
      {completedEvents &&
        completedEvents.map((event) => (
          <Box
            component="h7"
            variant="h2"
            sx={{
              fontSize: "s",
              display: "block",
              bgcolor: "#D3D3D3",
              mb: 10,
              p: 5,
              borderRadius: 5,
              
            }}
          >
            <Box alignItems="start" sx={{ display: "flex", width: 1 }}>
              <Typography variant="h6" sx={{ color: "black" }}>
                Event
              </Typography>
              <Typography variant="h6" sx={{ ml: 5, fontWeight: "bold" }}>
                : {event.name}
              </Typography>
            </Box>
            <Box alignItems="center" sx={{ display: "flex" }}>
              <Typography variant="h6">Date </Typography>
              <Typography variant="h6" sx={{ ml: 6, fontWeight: "bold" }}>
                : {new Date(event.date).getUTCDate()}-{new Date(event.date).getUTCMonth() + 1}-{new Date(event.date).getUTCFullYear()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6">Location </Typography>
              <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                : {event.location}
              </Typography>
            </Box>
            <Box align="start" sx={{ display: "block" }}>
              <Typography variant="h6">Description : </Typography>
              <Typography fullWidth variant="h6" sx={{ ml: 10 }}>
                {event.description}
              </Typography>
            </Box>

            <Box align="start" sx={{ display: "block"}}>
              <Typography variant="h6">weather Update : </Typography>
              <Typography variant="h6" >{event.weatherInfo}</Typography>
            </Box>
          </Box>
        ))}
    </Container>
  );
};

export default CompletedEvents;
