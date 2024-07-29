import React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/User";
import Alert from "@mui/material/Alert";

const SignIn = () => {
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const inputHandler = (e, name) => {
    setSignInDetails({ ...signInDetails, [name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/authentication/sign-in`,
        {
          method: "POST",
          body: JSON.stringify({
            email: signInDetails.email,
            password: signInDetails.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.setToken(data.sessionToken));
        dispatch(userActions.login());
        setDisplayMessage({
          status: true,
          mode: "success",
          message: "sign-up successful",
        });

        setTimeout(() => {
          setDisplayMessage({ ...displayMessage, ["status"]: false });
        }, 2000);

        setTimeout(() => {
          navigate("/add-new-event");
        }, 500);
      } else {
        const data = await response.json();
        setDisplayMessage({
          status: true,
          mode: "info",
          message: data.error,
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              label="Email Address"
              name="email"
              onChange={(e) => inputHandler(e, "email")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => inputHandler(e, "password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#007BFF" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/register">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
