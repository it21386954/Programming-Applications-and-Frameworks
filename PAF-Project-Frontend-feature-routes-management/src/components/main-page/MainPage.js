import React from 'react'
import Middle from '../middle/Middle';
import Left from '../left/Left';
import Right from '../right/Right';
import Header from '../header/Header';
import "./MainPage.css";
export default function ({ authenticated, onLogout, currentUser }) {
  return (
    <div>
        <Header authenticated={authenticated} onLogout={onLogout} currentUser={currentUser} />
    <main>
       <div className='container'>
          <Left />
          <Middle />
          <Right />
       </div>
    </main>
    </div>
    
  )
}
