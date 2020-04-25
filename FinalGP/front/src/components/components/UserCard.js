import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FacebookIcon from '@material-ui/icons/Facebook';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import '../App.css'

const useStyles = makeStyles({
  root: {
    width: 250,
    minHeight: 375,
    margin: "auto",
  },
  media:{
    height: 250,
    margin:"0",
    width:"100%",
    backgroundSize: "100% 100%",
  },
  link:{
    textDecoration: "none",
    color: "#FFF",
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const image  = props.image;
  const name   = props.name;
  const desc   = props.desc;
  const social = props.social;

  const links = () =>{
    let DOM = []
    
    if(social.fb){
      DOM.push(
        <a href={social.fb} target="_blank">
          <FacebookIcon />
        </a>
      )
    }
    if(social.git){
      DOM.push(
        <a href={social.git} target="_blank">
          <GitHubIcon/>
        </a>
        )
    }
    if(social.gm){
      DOM.push(
        <a href={"mailto:"+social.gm} target="_blank">
          <EmailIcon />
        </a>
        )
    }

    return DOM;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt={name}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {links()}
      </CardActions>
    </Card>
  );
}
