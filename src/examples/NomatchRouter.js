import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
  } from "react-router-dom";

export default class NomatchRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/old-match">Old Match, to be redirected</Link>
                        </li>
                        <li>
                            <Link to="/will-match">Will Match</Link>
                        </li>
                        <li>
                            <Link to="/will-not-match">Will Not Match</Link>
                        </li>
                        <li>
                            <Link to="/also/will/not/match">Also Will Not Match</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/old-match">
                            <Redirect to="/will-match" />
                        </Route>
                        <Route path="/will-match">
                            <WillMatch />
                        </Route>
                        <Route path="/error">
                            <Error />
                        </Route>
                        <Redirect from="/*" to="/error" />

                        

                    </Switch>
                </div> 
            </Router>
        )
    }
}

function Home(){
    return <h3>Home</h3>
}

function WillMatch(){
    return <h3>Matched!!</h3>
}

function NoMatch(){
    let location = useLocation();

    return (
        <div>
            <h3>
                No match for {location.pathname}
            </h3>
        </div>
    )
}
function Error(){
    return <h3>Error</h3>
}