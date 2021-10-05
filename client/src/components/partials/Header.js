import React from 'react'
import logo from '../../assets/images/logo.png'

const Header = () => {
    return (
        <nav style={{backgroundColor:"#2196F3"}}>
            <div class="nav-wrapper">
                <img alt="logo" src={logo} className="brand-logo center" style={{height:"100%"}}/>
            </div>
        </nav>
    )
}
export default Header;