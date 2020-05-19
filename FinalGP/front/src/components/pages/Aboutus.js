import React, {useEffect, useContext} from 'react';
import '../App.css';
import Nav from '../components/Nav';
import Box from '@material-ui/core/Box';
import UserCard from '../components/UserCard';
import Grid from '@material-ui/core/Grid';
import {AuthContext} from '../index.js'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    paddingBottom: 100,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const data = [
  ["Ahmed Gaafer", "Creator of the website UI/UX, responsiple for front-end API calls and creator of Brain tumor model", {fb:"https://www.facebook.com/Ahmed.S.Gaafer/", git:"https://github.com/ahmedgaafer", gm:"ahmeds.gaafer@gmail.com"}, "https://scontent-hbe1-1.xx.fbcdn.net/v/t1.0-9/89819274_1439654562882763_925338076719349760_n.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=3vhtUEwKYjQAX88s2cm&_nc_ht=scontent-hbe1-1.xx&oh=c082274db380fa6eee64e872dc127106&oe=5EC975BF"],
  ["Mohamed Hashem", "Creator of the website Back-end and responsible for Back-end APIs", {fb:"https://www.facebook.com/mohamedhashem1998", git:"https://github.com/MohamedHashimYoussef", gm:""}, "https://i.imgur.com/7Bkw8xQ.jpg"],
  ["Marwan Assem", "Creator of Malaria model and Creator of Instant Diagnoses feature", {fb:"https://www.facebook.com/marwan.assem.37", git:"", gm:""}, "https://scontent-hbe1-1.xx.fbcdn.net/v/t1.0-9/22308862_1723305161059230_9172207919354719449_n.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_ohc=7S8y-JM6DLUAX8Bxrdz&_nc_ht=scontent-hbe1-1.xx&oh=e71606898a62d49b5362276e1d3eb3fc&oe=5EC98D03"],
  ["Reem zolfakkar", "Creator of Skin Cancer model and creator of Instant Diagnoses feature", {fb:"https://www.facebook.com/profile.php?id=100027535235676", git:"", gm:""}, "https://scontent.fcai19-1.fna.fbcdn.net/v/t1.0-9/54415233_267615167499656_3707434783727419392_n.jpg?_nc_cat=101&_nc_sid=174925&_nc_ohc=CXq-LIug1N4AX8vZ7ZL&_nc_ht=scontent.fcai19-1.fna&oh=7bbd52d1603456f871e2ef2d3888f703&oe=5EC8EC21"],
];

const items = () => {
  let DOM =[];
  for(let i = 0; i < data.length; i++){
    DOM.push(
      <Grid item xs={6}>
          <UserCard name={data[i][0]} desc={data[i][1]} image={data[i][3]} social={data[i][2]} />
      </Grid>
    );
  }
  return DOM;
}

export default function AboutUs() {
  
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
  const classes = useStyles();
  
  return (
    <div className="App">
      <Nav />
      <div className="App-header">
        Meet our team.
        <div className={classes.root}>
        <Grid 
         container
         spacing={3}
         direction="row"
         wrap="wrap"
         justify="space-around"
         alignItems="center"
         >
          {items()}

        </Grid>
        </div>
      </div>
    </div>
  );
}


