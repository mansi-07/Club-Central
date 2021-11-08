// src.App.js
import React from 'react';

import '../css/posts.css';
import Navbar from '../partials/Navbar';
import Post from './PostComponents/Post';
import Footer from '../partials/Footer';


const Posts = ({ user }) => {
  console.log(user.token)
  return (
    <div>

      <Navbar user={user} />

      <div>

        <Post user={user}/>

      </div>
      <Footer />
    </div>
  )

}


export default Posts;


