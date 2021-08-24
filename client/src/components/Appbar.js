import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { makeStyles } from "@material-ui/core/styles";
import api from "../api";
var _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#FFFDD0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  username: {
    marginRight: theme.spacing(2),
    color: "black",
  },
}));

const Appbar = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    fetch("/logout");
    setUser({});
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#FFFDD0" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.menuButton}>
            <Link to={"/"}>Jamband</Link>
          </Typography>
          <Button
            variant="outlined"
            component={Link}
            to={"/backingtracks"}
            className={classes.menuButton}
          >
            Backing Tracks
          </Button>

          <Typography variant="h6" className={classes.title}></Typography>

          {!api.userLoggedin(user) && (
            <div>
              <Button variant="outlined" component={Link} to={"/login"}>
                Log in
              </Button>

              <Button variant="outlined" component={Link} to={"/signup"}>
                Sign up
              </Button>
            </div>
          )}
          <Typography variant="h6" className={classes.username}>
            {_.keys(user).length > 0 && user.username}
          </Typography>

          {api.userLoggedin(user) && (
            <Button variant="outlined" component={Link} onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
