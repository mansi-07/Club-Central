import React from 'react'
import Navbar from './partials/Navbar.js'

const HomePage = ({user}) => {
    console.log(user)
    return (
        <Navbar user={user}/>
    )
}
export default HomePage;