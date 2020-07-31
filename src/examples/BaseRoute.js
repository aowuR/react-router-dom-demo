import React, { Component } from 'react';
import {
    //as的作用为将HashRouter重命名为Router,这样的好处是在反复测试HashRouter和BrowserRouter时,可以免去组件修改
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class BaseRoute extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>

                    <hr />

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

function Home() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
}
  
function About() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
}
  
function Dashboard() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
}
