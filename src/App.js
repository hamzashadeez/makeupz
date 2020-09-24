import React from "react";
import "./App.css";
import Home from "./Screens/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div>dashboard</div>,
      main: () => <Link className='' to='./home'>Goto Home</Link>,
    },
    {
      path: "/home",
      sidebar: () => <div>patients</div>,
      main: () =><Home />,
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
