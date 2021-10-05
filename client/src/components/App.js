import {React, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Signin from './AuthComponentes/signin.js'
import Signup from './AuthComponentes/signup.js'
import HomePage from './HomePage'

export default function App() {
    const [user,setSignInUser] = useState({})
    return(
        <Router>
            <Switch>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin">
            <Signin setSigninUser={setSignInUser} />
            </Route>
            <Route exact path="/">
                {
                    user && <HomePage user={user}/>
                }
            </Route>
            </Switch>
        </Router>
    );

}