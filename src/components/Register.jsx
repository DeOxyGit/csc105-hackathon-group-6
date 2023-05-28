import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, InputAdornment, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";

import Axios from "../AxiousInstance";

function Register() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/register", inputs);
      navigate("/login");
      console.log("User create triggle.");
    } catch (e) {
      console.log(e);
    }
  };


  const boxStyle = {
    width : {xs:"80vw",sm:"80vw",md:"60vw"}
  }
  const textFieldStyle = {
    width : {xs:"60vw",sm:"60vw",md:"30vw"}
  }

 
  return (
    <Box className="body-register">
      <Box className="container-register" sx={boxStyle} >
        <Box className="register-form" sx={textFieldStyle}>
          <header className="header-logo">
            <h2 className="logo" >BLUECONNECT</h2>
            <p className="loginText">Sign up</p>
          </header>
          <form action="">
            <TextField
              className="inputRounded"
              onChange={handleChange}
              name="username"
              placeholder="Username"
              variant="outlined"
              size="small"
              label="Username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="inputRounded"
              onChange={handleChange}
              name="email"
              label="Email"
              placeholder="Email"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="inputRounded"
              onChange={handleChange}
              name="password"
              label="Password"
              placeholder="Password"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="inputRounded"
              label="Confirm Password"
              placeholder="Confirm Password"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Sign up
            </Button>
          </form>

          <div className="register-btn">
            <p>
              Already have an account? <a href="/Login">Login</a>
            </p>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
