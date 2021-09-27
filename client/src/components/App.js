import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import LandingPage from './LandingPage'

export default function App() {
    return(
        <Router>
            <Switch>
            <Route exact path='/' component={LandingPage} />
            </Switch>
        </Router>
    );

}