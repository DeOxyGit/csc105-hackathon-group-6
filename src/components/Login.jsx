import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import "../style/Login.css";
import { Button, InputAdornment,Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "../AxiousInstance";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../authContext";

function Login() {

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const [inputs , setInputs] = useState({
    email:"",
    password:"",
  });

  const handleChange = (e) =>{
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      console.log("Start program")
      await login(inputs);
      
      navigate("/Home");
    }
    catch(e)
    {
      console.log(e);
    }
  }

  console.log(inputs);
 
  const boxStyle = {
    width : {xs:"80vw",sm:"50vw",md:"30vw"}
  }
  const textFieldStyle = {
    width : {xs:"50vw",sm:"40vw",md:"20vw"}
  }

  return (
    <Box className="body_login">
      <Box className="container-login" sx={boxStyle}  >
        <Box className="login-form" sx={textFieldStyle}>
          <header className="header-logo">
            <h2 className="logo">BLUE CONNECT</h2>
            <p className="loginText">Sign in</p>
          </header>
          <form action="">
            <TextField
              onChange={handleChange}
              className="inputRounded"
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
              onChange={handleChange}
              className="inputRounded"
              label="Password"
              name="password"
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
            <Button variant="contained" onClick={handleSubmit}>Sign in</Button>
          </form>
         
          <div className="login-btn">
        <p>To be our family. <a href="/Register">Join us</a></p>
        </div>
        </Box>
        
      </Box>
    </Box>
  );
}

export default Login;
