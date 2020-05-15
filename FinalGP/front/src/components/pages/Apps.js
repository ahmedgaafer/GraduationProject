import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import Nav from '../components/Nav';
import MediaCard from '../components/card';
import { ToastContainer, toast } from 'react-toastify';
import { valid, info, warn} from '../scripts/toasts';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {AuthContext} from '../index.js';


const apiCall1 = (id) => {
  const file = document.getElementById('1').files[0];
  const formData = new FormData();
  formData.append('picture', file);
  formData.append('id', id)

  fetch(`/api-predict/brain/`,{
    method:'POST',   
    body: formData,
  })
  .then(res => res.json())
  .then(data => {
    const message = `The result of the diagnosis is ${data.Result}`;
    info(7000, message)
  })
}

const apiCall2 = (id) => {
  const file = document.getElementById('2').files[0];
  const formData = new FormData();
  formData.append('picture', file);
  formData.append('id', id);

  fetch(`/api-predict/malaria/`,{
    method:'POST',   
    body: formData,
  })
  .then(res => res.json())
  .then(data => {
    const message = `The result of the diagnosis is ${data.Result}`;
    info(7000, message)
  })
}

const apiCall3 = (id) => {
  const file = document.getElementById('3').files[0];
  const formData = new FormData();
  formData.append('picture', file);
  formData.append('id', id)

  fetch(`/api-predict/skin/`,{
    method:'POST',   
    body: formData,
  })
  .then(res => res.json())
  .then(data => {
    const message = `The result of the diagnosis is ${data.Result}`;
    info(7000, message)
  })
}

const data = [
  [
   "https://www.healthline.com/hlcmsresource/images/bm_images/nervous2.jpg",
   "Brain Tumor Diagnosis",
    "Just upload an Image of your 'MRI / CT' that you want to diagnose and we will do the rest for you.\n",
    apiCall1,
  ],
  [
   "https://media.istockphoto.com/vectors/malaria-word-on-checkered-paper-sheet-vector-id940682644",
   "Malaria Diagnosis",
   "Just upload an Image of your 'MRI / CT' that you want to diagnose and we will do the rest for you.\n",
   apiCall2,
  ],
  [
    "https://lh3.googleusercontent.com/proxy/66huaRJYQluRGrY4qD4NLeQr3ln_96NustwGOUv2pXSSmuBTlGkteHWK-yS6QhrrfbF9xIs0wla3lLFY01UbZvST8F3oec8Tam_cVsT7cSQTT22512QjphKGsiYGcyVrZJ3gCbZ7IB0vZXpO",
    "Skin Cancer Diagnosis",
    "Just upload an Image of your 'MRI / CT' that you want to diagnose and we will do the rest for you.\n",
    apiCall3,
  ],

] 


 const items = (id) => {
   let DOM = [];
   for(let i = 0; i < data.length; i++){
     DOM.push(
    <Box p={1}>
      <MediaCard 
        image={data[i][0]}
        title={data[i][1]}
        desc={data[i][2]}
        fn={() => data[i][3](id)}
        id={(i+1).toString()}
        />
    </Box>
     );
  }
  return DOM;
 }

export default function Home() {
  
  
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
        <p>
          Currently Available Daignostic services
        </p>
        
        <div style={{ width: '100%' }}>
        <Box display="flex" p={1} flexDirection="row" flexWrap="wrap" justifyContent="center">
          {items(user.id)}
        </Box>
        </div>
        
      </header>
    </div>
  );
}


