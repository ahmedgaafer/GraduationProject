import React, { useEffect, useContext} from 'react';
import Nav from '../components/Nav';
import {AuthContext} from '../index.js'
import {Redirect} from 'react-router-dom';
import '../App.css';

export default function Dev() {
  
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    if(!user || !user.email) {
      const token = localStorage.getItem('token') || null;
      const email = localStorage.getItem('email') || null;
      const id = localStorage.getItem('id') || null;
      const type = localStorage.getItem('type') || null;

      setUser({email, token, id, type});
    }
  }, [])


  return (
    <div className="App">
      {
        (user && user.email && user.type !== "doctor")?
          <Redirect to="/home"/>:false
        
      }
      <Nav />
      <header className="App-header"></header>
    </div>
    )}