import React, { useEffect, useContext} from 'react';
import Nav from '../components/Nav';
import {AuthContext} from '../index.js'
import PatientHistory from '../components/Patient'
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
      <Nav />
      <header className="App-header">
      {
        (user && user.email && user.type !== "patient")?
          <h1>History for patient </h1>:
          <h1>History</h1>
        
      }

      <PatientHistory id={user.id}/>
      </header>
    </div>
    )}