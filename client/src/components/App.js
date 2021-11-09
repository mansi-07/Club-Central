import { React, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './AuthComponentes/signin.js'
import Signup from './AuthComponentes/signup.js'
import SignOut from './AuthComponentes/signout.js'
import HomePage from './HomePage'
import AddPost from './PostComponents/AddPost.js'
import AddSig from './AddSig.js';
import ViewSig from './ViewSig.js';
import Results from './ResultComponents/Results.js'
import Register from './recsComponents/Register.js'

import EditProfile from './userComponents/EditProfile.js'
import AddEvent from './eventsComponentes/AddEvent.js'
import Event from './eventsComponentes/Event.js'
import EditProfileClub from './clubComponents/EditProfileClub.js'
import UserList from './superadminComponents/UserList.js'
import Status from './recsComponents/Status.js'

export default function App() {
    const [user, setSignInUser] = useState({})
    return (
        <Router>
            <Switch>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin">
                    <Signin setSigninUser={setSignInUser} />
                </Route>
                <Route exact path="/">
                    {
                        user && <HomePage user={user} />
                    }
                </Route>
                <Route exact path="/superadmin">
                    {
                        user.isSuperAdmin && <HomePage user={user} />
                    }
                </Route>
                <Route exact path="/clubadmin">
                    {
                        user.isAdmin && <HomePage user={user} />
                    }
                </Route>
                <Route exact path="/clubadmin/addsig">
                    {
                        <AddSig user={user} />
                    }
                </Route>
                <Route exact path="/clubadmin/viewsig">
                    {
                        <ViewSig user={user} />
                    }
                </Route>
                <Route exact path="/signout">
                    <SignOut setSigninUser={setSignInUser} />
                </Route>
                <Route exact path="/clubadmin/addpost">
                    {
                        user.isAdmin && <AddPost user={user} />
                    }
                </Route>
                <Route exact path="/results">
                    {
                        <Results user={user}/>
                    }
                </Route>
                <Route exact path="/editprofile/:id">
                    <EditProfile user={user} />
                </Route>
                <Route exact path="/addevent">
                    <AddEvent user={user} />
                </Route>
                <Route exact path="/events">
                    <Event user={user} />
                </Route>
                <Route exact path="/edit">
                    <EditProfileClub user={user} />
                </Route>
                <Route exact path="/register">
                    <Register user={user} />
                </Route>
                <Route exact path="/userlist">
                    <UserList user={user} />
                </Route>
                <Route exact path="/status">
                    <Status user={user} />
                </Route>
            </Switch>
        </Router>
    );

}