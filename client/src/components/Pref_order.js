// src.App.js
import React from 'react';

import '../css/posts.css';
import Navbar from './partials/Navbar';
import Pref from './partials/Pref';
import Footer from './partials/Footer';


const Pref_order = ({ user }) => {
  console.log(user.token)
  return (
    <div>

      <Navbar user={user} />

      <div>

        <Pref user={user}/>

      </div>
      <Footer />
    </div>
  )

}


export default Pref_order;


