import { React, useState , useEffect} from 'react'
import axios from 'axios'
import "../../css/landingPage.css"
import { Link , useHistory} from 'react-router-dom'
import Header from '../partials/Header.js'

const Signup = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [institute, setInstitute] = useState('')
    const history = useHistory()
    const [instituteList, setInstituteList] = useState({})

    useEffect(() => {
        axios.get('/api/auth/institute')
            .then(response => {
                console.log(response.data)
                setInstituteList(response.data)
            });
    }, []);

    const signUpSubmit = (event) => {
        event.preventDefault()
        console.log({username,password,email,institute})
        axios.post("/api/auth/signup", {username,password,email,institute} )
            .then((res) => {
                if (res.status === 200) {
                    history.push("/signup")
                    alert("Signup Successful!")
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
                    <form className="col s10 offset-s1" onSubmit={signUpSubmit}>
                        <div className="row">
                            <div className="input-field col s10">
                                <i class="material-icons prefix">person_pin</i>
                                <input id="username" type="text" className="validate" onChange={(event)=>setUserName(event.target.value)}/>
                                <label for="username">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s10">
                                <i class="material-icons prefix">email</i>
                                <input id="email" type="email" className="validate" onChange={(event)=>setEmail(event.target.value)}/>
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s10">
                                <i class="material-icons prefix">school</i>
                                <input id="institute" type="text" className="validate" onChange={(event)=>setInstitute(event.target.value)}/>
                                <label for="institute">Institute</label>
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
                        <button class="btn waves-effect waves-light btn-large" type="submit" name="submit" style={{backgroundColor:"#2196F3"}}>Sign Up
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
export default  Signup;