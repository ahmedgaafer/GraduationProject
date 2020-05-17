import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../index'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import { valid, warn} from '../scripts/toasts';
import { ToastContainer } from 'react-toastify';
import Nav from '../components/Nav';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../App.css';


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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  btn:{
    padding: '1vh',
    backgroundColor: "crimson",
    color:"#eee",
    display: "inline",

  }
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

function getClearPatient(){
  const DOM = []
  fetch('/api/list-clear-patients/')
  .then(res => res.json())
  .then(data => {
    data.forEach(res => DOM.push(<MenuItem key={res.Email} value={res.Email}>{`${res.FirstName} ${res.LastName}`}</MenuItem>))   
  })
  return DOM;
}

export default function Profile(){
  
  const classes = useStyles();
  const [user, setUser] = useContext(AuthContext);
  const [doc, setDoc] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [pmail, setMail] = React.useState('');

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

  const handleChange = (event) => {
    setMail(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const connect = () => {
    console.log(pmail)
      if(!pmail || pmail === ''){
        warn(7000, 'Please choose a valid patient option')
        return true;
      }
      const formData = new FormData();
      formData.append('email_patient', pmail)
      formData.append('id_doctor', user.id)
      fetch('/api/add-doctor-patient/',{
        method:"POST",
        body: formData,
      })
      .then(res => res.json())
      .then(res => {
        if(res.status === 200){ valid(7000, res.process); setDoc(doc + 1); }else{ warn(7000, res.process) }
      }).then(() => {
        handleClose()
      })
  }

  const im = user.email || null;
  
  return (
    <div className="App">
       {(!user || !user.email)?
        <Redirect to="/Signin"/> :
        false
      }
      <Nav />
      <ToastContainer />
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
            <React.Fragment>
              <div className={classes.push}>
                <strong>Number of patients:</strong> 
                <Paper className={classes.item}>
                  {(doc)? doc: 0}
                </Paper>
              </div>
              <div className={classes.push}>
                
                <Paper className={classes.btn}>
                  <Button style={{color: '#eee', fontSize:"18px"}} onClick={handleClickOpen}><strong>Connect to patient </strong></Button>
                </Paper>
                <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Connect to patient</DialogTitle>
                <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-dialog-select-label">Patient name</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={pmail}
                        onChange={handleChange}
                        input={<Input />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {getClearPatient()}
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button id="connect-submit" onClick={connect} color="primary">
                    Connect 
                  </Button>
                </DialogActions>
              </Dialog>
              </div>
            </React.Fragment>
          }

        </Paper>
        </div>
      </header>
    </div>
  )
  
}
