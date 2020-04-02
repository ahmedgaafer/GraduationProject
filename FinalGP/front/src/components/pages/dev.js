import React from 'react';
import '../App.css';
import Nav from '../components/Nav';
import  Logo from '../'; 

export default class Dev extends React.Component {
  render(){
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        <div className="container">
         <img src={'../logo.svg'}  alt="React Logo" />
        </div>
      </header>
    </div>
  )
  }
}
