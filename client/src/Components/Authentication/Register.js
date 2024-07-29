import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

const Register = () => {
  const navigate = useNavigate();
  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e, name) => {
    setSignUpDetails({ ...signUpDetails, [name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      if (signUpDetails.password !== signUpDetails.confirmPassword) {
        setDisplayMessage({
          status: true,
          mode: "info",
          message: "passwords are not matching",
        });

        setTimeout(() => {
          setDisplayMessage({ ...displayMessage, ["status"]: false });
        }, 2000);
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/authentication/register`,
          {
            method: "POST",
            body: JSON.stringify({
              name: signUpDetails.name,
              email: signUpDetails.email,
              password: signUpDetails.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          setDisplayMessage({
            status: true,
            mode: "success",
            message: "sign-up successful",
          });

          setTimeout(() => {
            setDisplayMessage({ ...displayMessage, ["status"]: false });
          }, 2000);

          setTimeout(() => {
            navigate("/sign-in");
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
      <Container component="main" style={{ marginTop: "15vh" }} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Name"
                  required
                  fullWidth
                  label="Name"
                  onChange={(e) => inputHandler(e, "name")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={(e) => inputHandler(e, "email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => inputHandler(e, "password")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  onChange={(e) => inputHandler(e, "confirmPassword")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#007BFF" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/sign-in" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
