import React from 'react';
import '../App.css';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        Welcome to IBDP
        <p>
          The first platform that helps the user to track their health via instant
          Diagnoses.
        </p>
      </header>
    </div>
  );
}


