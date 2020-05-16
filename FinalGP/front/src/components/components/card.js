import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
  },
  rootPaper: {
    backgroundColor:'#C0C4D6',
    color:'black',
    margin: theme.spacing(1),
    width: theme.spacing(41.2),
    height: theme.spacing(20),
  },
  media: {
    height: 140,
  },
  margin: {
    margin: theme.spacing(2),
  },

}));


export default function MediaCard(props) {
  const classes = useStyles();
  const image = props.image;
  const title = props.title;
  const desc = props.desc;
  const fn = props.fn;
  const id = props.id;
  
  const [pannel, changePannel] = useState(false);
  const togglePannel = () => {
    const newState = (pannel)? false : true;
    changePannel(newState);
    console.log(localStorage)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
          onClick={togglePannel}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={togglePannel}>
          Open
        </Button>
      </CardActions>
      <Collapse in={pannel}>
        <Card className={classes.rootPaper}>
        <CardContent>
          Upload Image
          <Input type="file" id={id}/>
          <Button className={classes.margin} variant="contained" color="primary" onClick={fn}>
            Submit
          </Button> 
        </CardContent>
        </Card>
      </Collapse>
      
      
    </Card>
  );
}
