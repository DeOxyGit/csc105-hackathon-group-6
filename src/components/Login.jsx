import React from "react";
import TextField from "@mui/material/TextField";
import "../style/Login.css";
import { Button, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
function Login() {
  return (
    <div className="body_login">
      <div className="container-login">
        <div className="login-form">
          <header className="header-logo">
            <h2 className="logo">BLUE CONNECT</h2>
            <p className="loginText">Sign in</p>
          </header>
          <form action="">
            <TextField
              className="inputRounded"
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
            <Button variant="contained">Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
