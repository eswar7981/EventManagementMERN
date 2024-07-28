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
    <Container sx={{ mt: 10, display: "flex" }} component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Past Events
        {completedEvents &&
          completedEvents.map((event) => (
            <Box component="h7" variant="h2" sx={{ fontSize: "s" }}>
              <p>{event.name}</p>
              <p>{event.date}</p>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{event.weatherInfo}</p>
            </Box>
          ))}
      </Typography>
    </Container>
  );
};

export default CompletedEvents;
