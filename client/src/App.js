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
  const classes = useStyles();

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

  const logout = () => {
    fetch("/logout");
    setUser(null);
  };

  return (
    <Router>
      <div>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Button variant="outlined" component={Link} to={"/discover"}>
                Discover
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to={"/create"}
                className={classes.menuButton}
              >
                Create
              </Button>
              <Typography variant="h6" className={classes.title}>
                News
              </Typography>

              {true && (
                <Button variant="outlined" component={Link} to={"/login"}>
                  Log in
                </Button>
              )}

              <Button variant="outlined" component={Link} to={"/signup"}>
                Sign up
              </Button>

              <Button variant="outlined" component={Link} onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <UserContext.Provider value={{ user, setUser }}>
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
