import React from 'react'
import Navbar from './partials/Navbar.js'
import Post from './PostComponents/Post';
import Footer from './partials/Footer';

const HomePage = ({ user }) => {
    //console.log(user)
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
export default HomePage;