import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {AuthProvider} from './providers/Auth';
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


function Routing() {
  return (
    <AuthProvider>

      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />            
            <Route exact path="/AboutUs" component={AboutUs} />
            <Route exact path="/Signin" component={Signin} />
            <Route exact path="/Signup" component={Signup} /> 
            <Route exact path="/dev" component={Dev} /> 

          </Switch>
        </div>
      </Router>
    </AuthProvider>
    );
}

ReactDOM.render(<Routing />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
