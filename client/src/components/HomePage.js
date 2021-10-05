import React from 'react'

const HomePage = ({user}) => {
    console.log(user)
    return (
        <div>
            hey {user.username}
        </div>
    )
}
export default HomePage;