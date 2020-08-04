import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

//Redirect 会导航到新的位置,重定向
//useHistory 该useHistory挂钩使您可以访问history可用于导航的实例
//useLocation钩子返回表示当前URL的location对象。您可以将其看作是useState，它在URL出现时返回一个新位置改变。这个可能非常有用，例如，在您希望在每次加载新页面时使用web分析工具触发新的“页面视图”事件的情况下


export default class RedirectRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    

                    <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Protected Page</Link>
                    </li>
                    </ul>

                    <Switch>
                        <Route path="/public">
                            <PublicPage />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <PrivateRoute path="/protected">
                            <AuthButton />
                            <ProtectedPage />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        )
    }
}

//定义变量以及登录退出方法
const fakeAuth = {
    isAuthenticated: false, //是否登录字段
    authenticate(cb) {      //登录方法
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {           //退出登录方法
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

//登录控制按钮组件
function AuthButton() {
    let history = useHistory();
    return fakeAuth.isAuthenticated?(
        <p>
            Welcome!
            <button
            onClick={() => {
                // fakeAuth.signout(() => history.push("/protected"));
                fakeAuth.signout(() => history.push("/protected"));  //如果已经登录成功就显示 sign out 按钮 点击调用退出登录方法 isAuthenticated 置为 false, 异步回调 history.push 进行页面跳转
            }}
            >
                Sign out
            </button>
        </p>
    ):(
        //如果登录失败 显示你没有登录
        <p>You are not logged in.</p>
    )
}

//自定义高阶路由组件 {children, ...rest} children 表示父组件下面的所有子组件 此处是指ProtectedPage组件  ...rest 是父组件上的所有属性 此处是指  path="/protected" 
function PrivateRoute( {children,...rest} ) { 
    // let history = useHistory();
    // console.log("history:",history)
    return (
        <Route
          {...rest}
          render={({ location }) =>
            fakeAuth.isAuthenticated ? (
              children
            ) : (              // 这里 我们可以将退出登录的地方AuthButton组件的 onClick 事件修改一下 push 到 /protected 这样我们就能看到这个组件的切换
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
    );
}
//公共页面组件
function PublicPage() {
    return <h3>Public</h3>;
}
//受保护页面组件
function ProtectedPage() {
    return <h3>Protected</h3>;
}
//登录页面组件
function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    // console.log("history:",history)
    // console.log("location:",location)

    //有 state 属性的话就将 location.state 的 form 赋值给 from,  没有的话就默认 form 是{pathname:"/"}
    let { from } = location.state || { from: { pathname: "/" } };
    //登录方法 调用定义的fakeAuth的登录方法 回调改变路由地址
    //“history.replace 跟 history.push 很像,唯一的不同就是,它不会向 history 添加新记录,而是跟它的方法名一样 —— 替换掉当前的 history 记录
    let login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from);
            // history.push(from.pathname)
            
        });
    };

    return (
        <div>
        <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}
