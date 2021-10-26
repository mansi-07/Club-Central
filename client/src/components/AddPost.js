import React from 'react'
import Navbar from './partials/Navbar.js'
import AddPostForm from './partials/AddPostForm';
import Footer from './partials/Footer';

const AddPost = ({ user }) => {
    var token = user.token
    return (
        <div>

            <Navbar user={user} />

            <div>

                <AddPostForm token={token} />

            </div>
            <Footer />
        </div>
    )
}
export default AddPost;