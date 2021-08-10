import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Info from "./views/info";
import Signup from "./views/signup";
import Login from "./views/login";
import Discover from "./views/discover";
import Song from "./views/song";
import BackingTracks from "./views/BackingTracks";
import { UserContext } from "./UserContext";

import Appbar from "./components/Appbar";

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
            <Route path="/song/:id">
              <Song />
            </Route>
            <Route path="/backingtracks">
              <BackingTracks />
            </Route>
            <Route path="/">
              <Discover />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
