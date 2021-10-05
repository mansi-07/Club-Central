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
        event.preventDefault()
        axios.post("/api/auth/signin", {username,password} )
        .then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                setSigninUser(res.data)
                history.push("/")
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
        <div className="row container mainContainer center">
            <div className="col">
                <Link to="/signup"><button className="waves-effect waves-light btn-large" style={{backgroundColor:"#2196F3"}}>Sign Up</button></Link>
            </div>
            <div className="col">
                <Link to="/signin"><button className="waves-effect waves-light btn-large" style={{backgroundColor:"#2196F3"}}>Sign In</button></Link>
            </div>
            <div className="col s12 innerContainer">
                <div className="row">
                    <form className="col s10 offset-s1" onSubmit={signInSubmit}>
                        <div className="row">
                                <div className="input-field col s10">
                                    <i class="material-icons prefix">person_pin</i>
                                    <input id="username" type="text" className="validate" onChange={(event)=>setUserName(event.target.value)}/>
                                    <label for="username">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s10">
                                    <i class="material-icons prefix">lock</i>
                                    <input id="password" type="password" className="validate" onChange={(event)=>setPassword(event.target.value)}/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="center row">
                            <button class="btn waves-effect waves-light btn-large" type="submit" name="submit" style={{backgroundColor:"#2196F3"}}>Sign In
                                <i class="material-icons right ">send</i>
                            </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default  Signin;