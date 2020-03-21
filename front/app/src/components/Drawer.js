import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactIcon from '@material-ui/icons/ContactSupportOutlined';
import Home from '../pages/Home';
import AboutUs from '../pages/Aboutus';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  textLink: {
    color: 'inherit',
    textDecoration: 'inherit',
  }
});

export default function TemporaryDrawer(props) {
  const anch = 'left';
  const topNav = [['Login', <AccountIcon/>]];
  const buttomNav = [['Home', <ContactIcon/>, <Home />,'/'],['About Us', <ContactIcon/>, <AboutUs />,'/AboutUs']];
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

        <List>
          {topNav.map((text, index) => (
            <Link className={classes.textLink} to={text[3] || ""}>
              <ListItem button key={text[0]}>
                  <ListItemIcon>{text[1]}</ListItemIcon>
                  <ListItemText primary={text[0]} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {buttomNav.map((text, index) => (
            <Link className={classes.textLink} to={text[3]}>
              <ListItem button key={text[0]}>
                <ListItemIcon>{text[1]}</ListItemIcon>
                <ListItemText primary={text[0]} />
              </ListItem>
            </Link>
          ))}
        </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={anch}>
          <Drawer anchor={anch} open={props.anchor}>
            {list(anch)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
