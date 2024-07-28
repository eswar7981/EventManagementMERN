import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Authentication/Register";
import SignIn from "../Authentication/SignIn";
import AddNewEvent from "../UserFeatures/AddNewEvent";
import UpcomingEvents from "../UserFeatures/UpcomingEvents";
import CompletedEvents from "../UserFeatures/CompletedEvents";
import UpdateEvent from "../UserFeatures/UpdateEvent";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route
          path="/add-new-event"
          element={<AddNewEvent></AddNewEvent>}
        ></Route>
        <Route
          path="/upcoming-events"
          element={<UpcomingEvents></UpcomingEvents>}
        ></Route>
        <Route
          path="/past-events"
          element={<CompletedEvents></CompletedEvents>}
        ></Route>
        <Route
          path="/update-event/:eventId"
          element={<UpdateEvent></UpdateEvent>}
        ></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
