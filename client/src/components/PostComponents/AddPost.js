import React from 'react'
import Navbar from '../partials/Navbar'
import AddPostForm from './AddPostForm';
import Footer from '../partials/Footer';

const AddPost = ({user}) => {
    var token = user.token
    return (
        <div>

            <Navbar user={user} />

            <div>

                <AddPostForm user={user} />

            </div>
            <Footer />
        </div>
    )
}

export default AddPost