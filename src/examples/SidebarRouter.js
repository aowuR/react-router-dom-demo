import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import "../App.css"

const routes = [
    {
        path:"/home",
        exact:true,
        sidebar: ()=><div>home?!</div>,
        main: ()=><h2>Home</h2>
    },
    {
        path:"/bubblegum",
        sidebar: ()=><div>bubblegum?!</div>,
        main: ()=><h2>Bubblegum</h2>
    },
    {
        path:"/shoelaces",
        sidebar: ()=><div>shoelaces?!</div>,
        main: ()=><h2>Shoelaces</h2>
    },

]

export default class SidebarRouter extends Component {
    
    render() {
        return (
            <Router>
                <div style={{display:"flex"}}>
                    <div style={{padding:"10px",width:"40%",background: "#f0f0f0"}}>
                       
                        <ActiveLink  
                            activeOnlyWhenExact={false}
                            to="/home"
                            label="Home"
                        />
                        <ActiveLink  
                            
                            to="/bubblegum"
                            label="Bubblegum"
                        />
                        <ActiveLink  
                            
                            to="/shoelaces"
                            label="Shoelaces"
                        />
                        
                        <Switch>
                            {
                                routes.map((route,index)=>(
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.sidebar />}
                                    />
                                ))
                            }
                        </Switch>
                    </div>
                    <div style={{ flex: 1, padding: "10px" }}>
                        <Switch>
                            {
                                routes.map((route,index)=>(
                                    <Route 
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))
                            }
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
function ActiveLink({ label, to, activeOnlyWhenExact }){
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return(
        <div className={match ? "bg_color_blue" : ""}>
            {match && "!!"}
            <Link to={to}>{label}</Link>
        </div>
    )
}
