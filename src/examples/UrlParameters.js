import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

export default class UrlParameters extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>Accounts</h2>

                    <ul>
                    <li>
                        <Link to="/netflix">Netflix</Link>
                    </li>
                    <li>
                        <Link to="/zillow-group">Zillow Group</Link>
                    </li>
                    <li>
                        <Link to="/yahoo">Yahoo</Link>
                    </li>
                    <li>
                        <Link to="/modus-create">Modus Create</Link>
                    </li>
                    </ul>

                    <Switch>
                        <Route path="/:id" component={Child} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
function Child(props) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    let idd = props.match.params.id;
    return (
      <div>
        <h3>ID: {id} ,other:{idd}</h3>
      </div>
    );
}
