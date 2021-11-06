// src.App.js
import React from 'react';

import '../css/posts.css';
import Navbar from './partials/Navbar';
import ViewSigPage from './partials/ViewSigPage';
import Footer from './partials/Footer';


const ViewSig = ({ user }) => {
  console.log(user.token)
  return (
    <div>

      <Navbar user={user} />

      <div>

        <ViewSigPage user={user}/>

      </div>
      <Footer />
    </div>
  )

}


export default ViewSig;


