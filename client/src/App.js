import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./views/home";
import Info from "./views/info";
import Signup from "./views/signup";
import Login from "./views/login";
import Discover from "./views/discover";
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
              <Button variant="outlined" component={Link} to={"/login"}>
                Log in
              </Button>
              <Button variant="outlined" component={Link} to={"/signup"}>
                Sign up
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
