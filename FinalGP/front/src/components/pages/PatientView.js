import React, { useEffect, useContext, useState} from 'react';
import Nav from '../components/Nav';
import {AuthContext} from '../index.js'
import PatientHistory from '../components/Patient'
import '../App.css';
import { Redirect } from 'react-router';


export default function PatientView(props) {
  
  console.log(props)
  const [user, setUser] = useContext(AuthContext);
  const [pId, setID] = useState(props.location.state.redirectWithState.id || null);
  useEffect(() => {
    if(!user || !user.email) {
      const token = localStorage.getItem('token') || null;
      const email = localStorage.getItem('email') || null;
      const id = localStorage.getItem('id') || null;
      const type = localStorage.getItem('type') || null;
      setID(props.location.state.redirectWithState.id)
      setUser({email, token, id, type});
    }
    if(user && user.id){
      if(user.type !== "doctor"){
        <Redirect to="/" />
      }
      setID(props.location.state.redirectWithState.id)
    }
  }, [])


  return (
    <div className="App">
      {(!user || !user.email)?
        <Redirect to="/Signin"/> :
        false
      }
      <Nav />
      <header className="App-header">
      {
        (user && user.email && user.type !== "patient")?
          <h3>History for patient </h3>:
          <h3>History</h3>
        
      }

      <PatientHistory id={pId}/>
      </header>
    </div>
    )}