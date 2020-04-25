import React, {useContext, useEffect} from 'react';
import '../App.css';
import Nav from '../components/Nav';
import  Logo from '../'; 
import {AuthContext} from '../index'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));


export default function Profile(){
  
  const classes = useStyles();
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    if(!user || !user.email) {
      const token = localStorage.getItem('token') || null;
      const email = localStorage.getItem('email') || null;
      setUser({email, token});
    }
  }, [])
  const im = "https://scontent-hbe1-1.xx.fbcdn.net/v/t1.0-9/89819274_1439654562882763_925338076719349760_n.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=d40Ye8nZpJEAX9-NxJV&_nc_ht=scontent-hbe1-1.xx&oh=a21daaf6a8b1bb35e6150ec1fb7e93c0&oe=5EADC63F";
  
  return (
    <div className="App">
       {(!user || !user.email)?
        <Redirect to="/Signin"/> :
        false
      }
      <Nav />
      <header className="App-header">
        <Avatar alt={(user && user.email)? user.email:"NoUser"} src={im} className={classes.large}/>
        Welcome {(user && user.email)? user.email: "Error fetching user"}
      </header>
    </div>
  )
  
}
