import React, { useState, useEffect, useContext, Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AuthContext} from '../index.js';
import {Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { valid, info, warn} from '../scripts/toasts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  
  const [user, setUser] = useContext(AuthContext);

  useEffect(()=>{
    if(!user || !user.email) {
      const token = localStorage.getItem('token') || null;
      const email = localStorage.getItem('email') || null;
      setUser({email, token});
    }
  }, []);

  const login = e => {
    const form = document.getElementById('loginForm');
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const cashe = document.getElementById('cashe').checked;
    console.log(cashe);
    return fetch('/api/auth/login/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json;',
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      if(res.status == 401 || res.status == 403){
        throw 'unAuthorized';
      }
      return res.json()
    
    })
    .then(data => {
      const email = data.email;
      const token = data.Token;
      const timeOut = 3000;
      setTimeout(() => {
        setUser({email, token});

        if(cashe){
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
        }

      }, timeOut);
      valid(timeOut, `Login success! You will be redirected in ${ timeOut / 1000 } second.`);
    })
    .catch(err => {
      if(err == 'unAuthorized'){
        return warn(5000,"Wrong Email or password")
      }
      alert(`ERROR: ${err}`);
    })
 
 }

 
  return (
    <Container component="main" maxWidth="xs">
      {
        (user && user.email)?
          <Redirect to="/profile"/>:false
        
      }
      <ToastContainer />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in Welcome
        </Typography>
        <form className={classes.form} id="loginForm" onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
            <Checkbox
             color="primary"
             id="cashe" />}
             label="Remember me"
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/Signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}