import React from 'react'
import logo from '../../assets/images/logo.png'

const Header = () => {
    return (
        <nav className="navbar" style={{backgroundColor:"#2196F3", height:"50px", padding:"0"}}>
            <div className="container-fluid">
                <img alt="logo" src={logo} className="d-inline-block position-absolute top-50 start-50 translate-middle" style={{height:"50px"}}/>
            </div>
        </nav>
    )
}
export default Header;