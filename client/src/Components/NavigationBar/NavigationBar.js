import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store/User";
import { useNavigate } from "react-router-dom";

const authPages = [
  { pageName: "Register", path: "/register" },
  { pageName: "Sign In", path: "/sign-in" },
];

const userPages = [
  { pageName: "Add New Event", path: "/add-new-event" },
  { pageName: "Upcoming Events", path: "/upcoming-events" },
  { pageName: "Past Events", path: "/past-events" },
];

const NavigationBar = () => {
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    navigate("/sign-in");
    dispatch(userActions.userLogOut());
  };

  return (
    <>
      <AppBar>
        <Container sx={{ backgroundColor: "#007BFF" }} maxWidth="xl">
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", fontWeight: "800" },
            }}
          >
            {login ? (
              <>
                {userPages.map((page, index) => (
                  <NavLink to={page.path} style={{ textDecoration: "None" }}>
                    <Button
                      key={page.path}
                      sx={{
                        my: 2,
                        color: "#FFFFFF",
                        display: "block",
                        fontFamily: "roboto,sans-serif",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {page.pageName}
                    </Button>
                  </NavLink>
                ))}
              </>
            ) : (
              <>
                {authPages.map((page, index) => (
                  <NavLink to={page.path} style={{ textDecoration: "None" }}>
                    <Button
                      key={page.path}
                      sx={{
                        my: 2,
                        color: "#FFFFFF",
                        display: "block",
                        fontFamily: "roboto,sans-serif",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {page.pageName}
                    </Button>
                  </NavLink>
                ))}
              </>
            )}

            {login && (
              <NavLink style={{ textDecoration: "None", alignSelf: "end" }}>
                <Button
                  sx={{
                    my: 2,
                    color: "#FFFFFF",
                    display: "block",
                    fontFamily: "roboto,sans-serif",
                    fontWeight: "500",
                    fontStyle: "normal",
                  }}
                  onClick={logOut}
                >
                  Log Out
                </Button>
              </NavLink>
            )}
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default NavigationBar;
