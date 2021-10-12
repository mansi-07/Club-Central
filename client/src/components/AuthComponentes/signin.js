import { React, useState } from 'react'
import axios from 'axios'
import "../../css/landingPage.css"
import Header from '../partials/Header.js'
import { Link , useHistory } from 'react-router-dom'

const Signin = ({setSigninUser}) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    const history = useHistory()

    const signInSubmit = (event) => {
        console.log({username,password})
        event.preventDefault()
        axios.post("/api/auth/signin", {username,password} )
        .then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                setSigninUser(res.data)
                if(res.data.isAdmin){
                    history.push("/clubadmin")
                }
                else if(res.data.isSuperAdmin){
                    history.push("/superadmin")
                }
                else{
                    history.push("/")
                }
                alert("Signin Successful!")
          }
        })
        .catch(err => {
            console.log(err.response.data.msg)
            alert(err.response.data.msg)
        })
    }
    return (
        <>
        <Header/>
        <br/>
        <br/>
        <br/>
        <div className="container col-lg-6">
            <div className="card">
                <div className="card-header">
                    <Link to="/signup" className="btn btn-primary btn-lg" role="button" aria-disabled="true">Sign Up</Link>
                    <Link to="/signin" className="btnSignIn btn btn-primary btn-lg" role="button" aria-disabled="true">Sign In</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={signInSubmit}>
                        <div className="mb-3">
                            <label for="username" className="form-label"><span className="icon bi bi-person-circle" aria-hidden="true"></span>Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter your username" onChange={(event)=>setUserName(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label"><span className="icon bi bi-shield-lock-fill" aria-hidden="true"></span>Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(event)=>setPassword(event.target.value)}/>
                        </div>

                        <button type="submit" className="btn btn-primary" >
                            <span className="icon bi bi-arrow-right-circle" aria-hidden="true"></span>Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default  Signin;