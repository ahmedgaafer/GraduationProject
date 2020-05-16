import React, {useContext, useEffect, useState} from 'react';
import '../App.css';
import Nav from '../components/Nav';
import {AuthContext} from '../index'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import Paper from '@material-ui/core/Paper';

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
    marginTop: "3vh"
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: '3vh',
    '& > *': {
      margin: theme.spacing(1),
      width: '60vw',
      minHeight: '40vh',
    }
  },
  paperContent: {
    display: "flex",
    flexDirection:"column",
    backgroundColor: "#3F51B5",
    color:"#eee",
    alignItems:"flex-start",
    justifyContent: "flex-start",
    padding: '2vw',
    fontSize: '2vh'
  },
  item:{
    padding: '1vh',
    margin:'1vh',
    marginLeft: '3vw',
    backgroundColor: "#282c34",
    color:"#eee",
    display: "inline"
  },
  push:{
    marginTop: '3vh',
  },


}));

 async function getDoctor(id){
  let doc = ''
  await fetch(`/api/doctor-of-patient/${id}/`)
  .then(res => res.json())
  .then(res => {
    if(res == "false")return doc = null;
    res = res[0]
    doc = res.FirstName+' '+res.LastName;
  })
  return Promise.resolve(doc);
}

async function getPatientNumbers(id){
  let nop = 0
  await fetch(`/api/list-doctor-patients/${id}/`)
  .then(res => res.json())
  .then(res => {
    nop = res.length
  })
  return nop;

}
export default function Profile(){
  
  const classes = useStyles();
  const [user, setUser] = useContext(AuthContext);
  const [doc, setDoc] = useState(null);
  useEffect( () => {
    if(!user || !user.email) {
      const token = localStorage.getItem('token') || null;
      const email = localStorage.getItem('email') || null;
      const id = localStorage.getItem('id') || null;
      const type = localStorage.getItem('type') || null;
      
      setUser({email, token, id, type}); 
    }
    if(user && user.id){
      if(user.type !== "doctor")
      {
        getDoctor(user.id)
        .then(v => {
          setDoc(v)
        })  
      }
      else{
        getPatientNumbers(user.id)
        .then(v => {
          setDoc(v)
        })
      }
    }
    
  }, [])

  const im = user.email || null;
  
  return (
    <div className="App">
       {(!user || !user.email)?
        <Redirect to="/Signin"/> :
        false
      }
      <Nav />
      <header className="App-header">
        <Avatar alt={(user && user.email)? user.email:"NoUser"} src={im} className={classes.large}/>
        <div className={classes.paper}>
        <Paper elevation={5} className={classes.paperContent}>
          <div><strong>E-mail:</strong>    
          <Paper className={classes.item} elevation={3}>
            {(user && user.email)? user.email: "no email"}
          </Paper>
          </div>

          <div className={classes.push}>
            <strong>Password: </strong> 
          <Paper className={classes.item} elevation={3}>
            ****
          </Paper>
          </div>
          {
            (user && user.type !=="doctor")?
            <div className={classes.push}>
              <strong>Doctor:</strong>    
              <Paper className={classes.item}>
                {(doc)? doc: "no doctor"}
              </Paper>
            </div>:
            <div className={classes.push}>
              <strong>Number of patients:</strong> 
              <Paper className={classes.item}>
                {(doc)? doc: 0}
              </Paper>
            </div>
          }

        </Paper>
        </div>
      </header>
    </div>
  )
  
}
