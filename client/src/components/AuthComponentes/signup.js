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
    const [instituteList, setInstituteList] = useState([])

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
                if (res.status === 201) {
                    alert("Signup Successful!")
                    history.push("/signin")
                    
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
                    <form onSubmit={signUpSubmit}>
                        <div className="mb-3">
                            <label for="username" className="form-label"><span className="icon bi bi-person-circle" aria-hidden="true"></span>Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter your username" onChange={(event)=>setUserName(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label"><span className="icon bi bi-envelope-fill" aria-hidden="true"></span>Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={(event)=>setEmail(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label for="institute" className="form-label"><span className="icon bi bi-briefcase-fill" aria-hidden="true"></span>Institute</label>
                            <select class="form-select" id="institute" aria-label="institute select" onChange={(event)=>setInstitute(event.target.value)}>
                                {instituteList && instituteList.map((institute,i) => {
                                    return (
                                        <option value={institute._id} key={i}>{institute.name}</option>
                                    );
                                })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label"><span className="icon bi bi-shield-lock-fill" aria-hidden="true"></span>Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(event)=>setPassword(event.target.value)}/>
                        </div>

                        <button type="submit" className="btn btn-primary" >
                            <span className="icon bi bi-arrow-right-circle" aria-hidden="true"></span>Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default  Signup;