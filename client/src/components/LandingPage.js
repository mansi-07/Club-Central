import React, { Component } from 'react'
import M from 'materialize-css'
import logo from "../assets/images/logo.png"
import "../css/landingPage.css"

export default class LandingPage extends Component {
    componentDidMount(){
        M.Tabs.init(this.Tabs);
    }
    render() {
        return (
            <>
            <nav style={{backgroundColor:"#2196F3"}}>
                <div class="nav-wrapper">
                    <img src={logo} className="brand-logo center" style={{height:"100%"}}/>
                </div>
            </nav>
            <br/>
            <div className="container mainContainer">
                <ul ref={Tabs => {this.Tabs = Tabs;}} id="tabs-swipe-demo" className="tabs" >
                    <li className="tab col l3 s6">
                        <a href="#register">Register</a>
                    </li>
                    <li className="tab col l3 s6">
                        <a href="#login">Login</a>
                    </li>
                </ul>

                <div id="register" className="col s12 ">
                    <div className="row">
                        <form className="col s10 offset-s1">
                            <div className="row">
                                <div className="input-field col s10">
                                    <i class="material-icons prefix">person_pin</i>
                                    <input id="username" type="text"/>
                                    <label for="username">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s10">
                                    <i class="material-icons prefix">school</i>
                                    <input id="institute" type="text" className="validate"/>
                                    <label for="institute">Institute</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s10">
                                    <i class="material-icons prefix">lock</i>
                                    <input id="password" type="password" className="validate"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="center row">
                            <button class="btn waves-effect waves-light btn-large" type="submit" name="" style={{backgroundColor:"#2196F3"}}>Submit
                                <i class="material-icons right ">send</i>
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="login" className="col s12 innerContainer">
                    <div className="row">
                        <form className="col s10 offset-s1">
                            <div className="row">
                                    <div className="input-field col s10">
                                        <i class="material-icons prefix">person_pin</i>
                                        <input id="username" type="text"/>
                                        <label for="username">Username</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10">
                                        <i class="material-icons prefix">lock</i>
                                        <input id="password" type="password" className="validate"/>
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                                <div className="center row">
                                <button class="btn waves-effect waves-light btn-large" type="submit" name="" style={{backgroundColor:"#2196F3"}}>Submit
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
}
