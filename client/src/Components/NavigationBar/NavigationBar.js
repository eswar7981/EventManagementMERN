import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { NavLink, useAsyncValue } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store/User";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const authPages = [
  { pageName: "Register", path: "/register" },
  { pageName: "Sign In", path: "/sign-in" },
];

const userPages = [
  { pageName: "Add New Event", path: "/add-new-event" },
  { pageName: "Upcoming Events", path: "/upcoming-events" },
  { pageName: "Past Events", path: "/past-events" },
  { pageName: "Sessions", path: "/sessions" },
];

const NavigationBar = () => {
  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const login = useSelector((state) => state.user.login);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/log-out`, {
      method: "DELETE",
      headers: {
        "Conten-Type": "application/json",
        sessionToken: token,
      },
    });

    if (response.ok) {
      setDisplayMessage({
        status: true,
        mode: "success",
        message: "logged out",
      });

      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);

      setTimeout(() => {
        navigate("/sign-in");
        dispatch(userActions.userLogOut());
      }, 500);
    } else {
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
      <AppBar>
        <Container
          align="center"
          sx={{ backgroundColor: "#007BFF" }}
          maxWidth="xl"
        >
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                fontWeight: "800",
                alignContent: "center",
                gap: "20px",
              },
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
                        display: "flex",
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
            <Box sx={{ ml: 50 }} sm={{ ml: 0 }} md={{ ml: 0 }}>
              {login && (
                <NavLink style={{ textDecoration: "None" }}>
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
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default NavigationBar;
