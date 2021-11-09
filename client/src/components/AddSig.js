import React from 'react'
import Navbar from './partials/Navbar.js'
import AddSigForm from './partials/AddSigForm.js';
import Footer from './partials/Footer';

const AddSig = ({ user }) => {
    var token = user.token
    console.log(token)
    return (
        <div>

            <Navbar user={user} />

            <div>

                <AddSigForm user={user} />
                

            </div>
            <Footer />
        </div>
    )
}
export default AddSig;