import React from 'react'
import Navbar from '../partials/Navbar.js'
//import Post from './PostComponents/Post';
import Footer from '../partials/Footer';
import TableResults from './TableResults.js';

const Results = ({ user }) => {
    //console.log(user)
    return (
        <div>

            <Navbar user={user} />

            <div>

                <TableResults user={user}/>

            </div>
            <Footer />
        </div>
    )
}
export default Results;