import React from "react";
import "./App.css";
import Home from "./Screens/Home/Home";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "./Screens/Auth/Auth";
import SignUp from "./Screens/Auth/SignUp";
import Profile from './Screens/Profile/Profile'
// import {UserData} from './context';

function App() {
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div>dashboard</div>,
      // main: () => <Home />
      main: () => <Auth />
    },
    {
      path: "/sign_up",
      sidebar: () => <div>patients</div>,
      main: () =><SignUp />,
    },
    {
      path: "/home",
      sidebar: () => <div>patients</div>,
      main: () =><Home />,
    },
    {
      path: "/profile",
      sidebar: () => <div>patients</div>,
      main: () =><Profile />
    },
  ];
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
        </Switch>
      </Router>
      {/* <Home /> */}
    </div>
  );
}

export default App;
