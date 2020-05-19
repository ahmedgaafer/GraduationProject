import React, {useContext} from 'react';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppsIcon from '@material-ui/icons/Apps';
import HistoryIcon from '@material-ui/icons/History';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import { AuthContext } from '../index'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Button } from '@material-ui/core';

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
  const topNav = [['Login', <AccountIcon/>, '/Signin'], ['Sign up',<PersonAddIcon/>, '/Signup' ]];
  const buttomNav = [['Home', <HomeIcon/>,'/'], ['Diagnostic services', <AppsIcon/>, '/Services'], ['About Us', <ContactIcon/>, '/AboutUs'], ['Developer Portal',<CodeIcon/> ,'/dev']];
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });
  const [user, setUser] = useContext(AuthContext);

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    setUser({email: null, token:null, id: null, type:null});
    localStorage.clear();
    <Redirect to="/home"/>

  }

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
          
          {
          (user && user.email)?
          <React.Fragment>
            <Link className={classes.textLink} to="/profile">
                <ListItem button key="Profile">
                    <ListItemIcon><ProfileIcon/></ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
            </Link>
            {(user.type === "doctor")?
            
              <Link className={classes.textLink} to="/patients">
                <ListItem button key="Patients">
                    <ListItemIcon><ChildCareIcon/></ListItemIcon>
                    <ListItemText primary="Patients" />
                </ListItem>
              </Link>:
              <Link className={classes.textLink} to="/history">
                <ListItem button key="History">
                    <ListItemIcon><HistoryIcon/></ListItemIcon>
                    <ListItemText primary="History" />
                </ListItem>
              </Link>
            
            }
            <Button onClick={logOut}>
            <ListItem button key="SignOut">
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary="SignOut" />
            </ListItem>
            </Button>
          </React.Fragment>
          :
          topNav.map((text, index) => (
            <Link className={classes.textLink} to={text[2] || ""}>
              <ListItem button key={text[0]}>
                  <ListItemIcon>{text[1]}</ListItemIcon>
                  <ListItemText primary={text[0]} />
              </ListItem>
            </Link>
          ))
          
          }
        </List>
        <Divider />
        <List>
          {buttomNav.map((text, index) => (
            <Link className={classes.textLink} to={text[2]}>
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
