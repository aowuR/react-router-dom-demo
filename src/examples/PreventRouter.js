import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Prompt
  } from "react-router-dom";

export default class PreventRouter extends Component {
    render() {
        return (
            <Router>
                <ul>
                    <li>
                        <Link to="/">From</Link>
                    </li>
                    <li>
                        <Link to="/one">One</Link>
                    </li>
                    <li>
                        <Link to="/two">Two</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/" exact children={ <BlockingForm /> } />
                    <Route path="/one" children={<h3>One</h3>} />
                    <Route path="/two" children={<h3>Two</h3>} />
                </Switch>
            </Router>
        )
    }
}

function BlockingForm() {

    //定义一个锁 变量 isBlocking  修改的方法是 setIsBlocking 默认值是 false
    let [isBlocking, setIsBlocking] = useState(false);

    return(
        //提交表单 event.preventDefault()默认阻止默认提交事件;
        //event.target.reset() 重置表单内容
        //setIsBlocking(false) 将 isBlocking 设为 false;

        //Prompt 组件阻止过渡 when={isBlocking} 如字面意思 表示当isBlocking为 true 的时候
        // message 内容则是 弹窗显示的内容
        <form
            onSubmit={event => {
                event.preventDefault();
                event.target.reset();
                setIsBlocking(false);
            }}
        >

            <Prompt
                when={isBlocking}
                message={location =>
                `Are you sure you want to go to ${location.pathname}`
                }
            />
            <p>
                Blocking?{" "}
                {isBlocking ? "Yes, click a link or the back button" : "Nope"}
            </p>
            <p>
                <input
                size="50"
                placeholder="type something to block transitions"
                onChange={event => {
                    setIsBlocking(event.target.value.length > 0);
                }}
                />
            </p>

            <p>
                <button>Submit to stop blocking</button>
            </p>

        </form>
    )
}
