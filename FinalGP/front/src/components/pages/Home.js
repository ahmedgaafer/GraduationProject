import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import Nav from '../components/Nav';
import MediaCard from '../components/card';
import { ToastContainer, toast } from 'react-toastify';
import { valid, info, warn} from '../scripts/toasts';
import {AuthContext} from '../index.js';

const apiCall = () => {
  const file = document.getElementById('imageFile').files[0];
  const formData = new FormData();
  formData.append('picture', file);
  fetch('/api-predict/automate/',{
    method:'POST',
     
      body: formData,
  })
  .then(res => res.json())
  .then(data => {
    const message = `The System recognized this image as ${data.Type}.\nThe result of the diagnoses is ${data.Result}`;
    info(7000, message)
  })

}

const s = {
  color:"#35ABE3",
  textTransform:"uppercase"
}
export default function Home() {
  const image = "https://i.pinimg.com/564x/d2/f6/8b/d2f68bf135f9a47d6f787dc8a968fb28.jpg";
  const title = "Instant Diagnosis";
  const desc = "Just upload an Image of your 'MRI / CT' that you want to diagnose and we will do the rest for you.\n";
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


  return (
    <div className="App">
      <ToastContainer />
      <Nav />
      <header className="App-header">
        <div className="back-img">
            <img src="https://simplecore.intel.com/itpeernetwork/wp-content/uploads/sites/38/2017/02/precision-medicine-ai-2.jpg" alt="background" />
        </div>
        <div class="text-intro">
          Welcome to IBDP
          <p>
            The <span style={s}>first</span> platform that helps the user to track their health via instant Diagnosis
            .
          </p>
        </div>
        <div className="lift">
          <MediaCard 
            image={image}
            title={title}
            desc={desc}
            fn={apiCall}
            />
        </div>
      </header>
    </div>
  );
}


