import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

const Register = () => {
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
      console.log("sign-up successful");
    } else {
      const data = await response.json();
      console.log(data.error);
    }
  };

  return (
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
  );
};

export default Register;
