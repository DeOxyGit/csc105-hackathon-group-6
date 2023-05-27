import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button,InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import '../style/Register.css';
import Axios from '../AxiousInstance';

function Register() {

  const [inputs , setInputs] = useState ({
    username:"",
    email:"",
    password:"",
  });

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{  
      await Axios.post("/auth/register" , inputs);
      console.log("User create triggle.")
    }
    catch(e){
      console.log(e);
    }
  }


  return (
    <div className="body-register">
    <div className="container-register">
        <div className="register-form">
            <header className="header-logo">
                <h2 className='logo'>BLUE CONNECT</h2>
                <p className='loginText'>Sign up</p>
            </header>
            <form action="">
            <TextField className="inputRounded" onChange={handleChange} name='username'  placeholder="Username" variant="outlined" size="small" label="Username"
             InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}/>
            <TextField className="inputRounded" onChange={handleChange} name='email' label="Email" placeholder="Email" variant="outlined" size="small" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}/>
            <TextField className="inputRounded" onChange={handleChange} name='password' label="Password" placeholder="Password" variant="outlined" size="small" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}/>
            <TextField className="inputRounded" onChange={handleChange} label="Confirm Password" placeholder="Confirm Password" variant="outlined" size="small" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}/>
            <Button variant="contained" onClick={handleSubmit}>Sign up</Button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Register