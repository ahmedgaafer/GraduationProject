import React, { useEffect, useContext} from 'react';
import Nav from '../components/Nav';
import {AuthContext} from '../index.js'
import '../App.css';

export default function Dev() {
  
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    if(!user || !user.email) {
      const token = localStorage.getItem('token') || null;
      const email = localStorage.getItem('email') || null;
      setUser({email, token});
    }
  }, [])


  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        Welcome to our developer portal.
        <p>
          Here are the technologies that we used to develop this amazing platform.
        </p>
        <div className="container">
         <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/718px-Tensorflow_logo.svg.png'} />
         <img src={'https://static.djangoproject.com/img/logos/django-logo-negative.png'} />
         <img src={'https://pluspng.com/img-png/logo-javascript-png-file-javascript-logo-png-1052.png'} />
         <img className="App-logo" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'}  alt="React Logo" />
        </div>
      
      <p>
        We used Tensorflow to build the models that process the images and predict the results.
      </p>
      <p>
        We used Django to build the Back-end server.
      </p>
      <p>
        We used JavaScript to handle front-end logic and API calls
      </p>
      <p>
        We used ReactJS to build a modular good looking front-end
      </p>
      <p>
        To know more about this project Visit out GitHub repository
      </p>
      <p>
      ==============  
      <a href="#">
        <img src={'https://clipart.info/images/ccovers/1499794873github-logo-png.png'} />
      </a>
        ==============
      </p>
      
      </header>
    </div>
  )
  }

