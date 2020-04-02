import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/Header'
import Footer from './footer/footer'
import Profile from './user/Profile'
import  '../styles/style.css'

import {Provider} from 'react-redux'
import store from '../store'


class App extends Component{
  render(){
    return (
      <Provider store={store}>
          <Header />
          <div className="ui main text container">
            <Profile />
          </div>
          <Footer />
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));