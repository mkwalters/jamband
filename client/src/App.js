import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./views/home";
import Info from "./views/info";
import Signup from "./views/signup";
import Login from "./views/login";
import Discover from "./views/discover";
import Song from "./views/song";
import Create from "./views/create";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "./UserContext";

import Appbar from "./components/Appbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    fetch("/getUser").then((data) => {
      data.json().then((json) => {
        setUser(json);
      });
    });
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <UserContext.Provider value={{ user, setUser }}>
          <Appbar></Appbar>
          <Switch>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/song/:id">
              <Song />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
