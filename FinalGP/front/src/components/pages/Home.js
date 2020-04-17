import React, { useState } from 'react';
import '../App.css';
import Nav from '../components/Nav';
import MediaCard from '../components/card';
import { ToastContainer, toast } from 'react-toastify';
import { valid, info, warn} from '../scripts/toasts';

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

export default function Home() {
  const image = "https://i.pinimg.com/564x/d2/f6/8b/d2f68bf135f9a47d6f787dc8a968fb28.jpg";
  const title = "Instant Diagnosis";
  const desc = "Just upload an Image of your 'MRI / CT' that you want to diagnose and we will do the rest for you.\n";

  return (
    <div className="App">
            <ToastContainer />
      <Nav />
      <header className="App-header">
        Welcome to IBDP
        <p>
          The first platform that helps the user to track their health via instant
          .
        </p>
        <MediaCard 
          image={image}
          title={title}
          desc={desc}
          fn={apiCall}
          />
      </header>
    </div>
  );
}


