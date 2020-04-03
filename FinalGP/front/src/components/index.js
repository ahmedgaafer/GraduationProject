import React, { useEffect, useState, useContext } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import AboutUs from './pages/Aboutus';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dev from './pages/dev';
import Profile from './pages/Profile';



const globalState = {
  email: null,
  token: null
};

export const  AuthContext = React.createContext(globalState);

function Routing() {

  const [currentUser, setCurrentUser] = useState(globalState);
  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />            
            <Route exact path="/AboutUs" component={AboutUs} />
            <Route exact path="/Signin" component={Signin} />
            <Route exact path="/Signup" component={Signup} /> 
            <Route exact path="/dev" component={Dev} /> 
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>

      </AuthContext.Provider>
    );
}

ReactDOM.render(<Routing />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
