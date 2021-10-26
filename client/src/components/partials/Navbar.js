import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'

// const AppMaintainerView = () => {
//     return (
//         <>
//             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//                 <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                         <Link className="nav-link active" aria-current="page" to="/appmaintainer">Institutes</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link">Log Out</Link>
//                     </li>
//                 </ul>
//             </div>
//         </>
//     );
// }
const SuperAdminView = () => {
    return (
        <>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/superadmin">super admin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            </ul>
        </>
    );
}

const ClubAdminView = () => {
    return (
        <>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page">club admin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/clubadmin">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/clubadmin/addpost">Add Post</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            </ul>
        </>
    );
}

const UserView = () => {
    return(
        <>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page">user</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            </ul>
        </>
    );
}

const Navbar = ({user}) => {
    //console.log(user);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="">
                <img alt="logo" src={logo} style={{height:"50px"}}/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {
                user.isSuperAdmin ? <SuperAdminView/> : user.isAdmin ? <ClubAdminView/> : <UserView/>
            }
            </div>
        </div>
        </nav>
    )
}
export default Navbar;