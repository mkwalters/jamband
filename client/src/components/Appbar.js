import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { makeStyles } from "@material-ui/core/styles";
var _ = require("lodash");

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

const Appbar = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    fetch("/logout");
    setUser({});
  };

  const userLoggedin = () => {
    if (_.keys(user).length === 0 || user === null) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
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

          {_.keys(user).length === 0 && (
            <div>
              <Button variant="outlined" component={Link} to={"/login"}>
                Log in
              </Button>

              <Button variant="outlined" component={Link} to={"/signup"}>
                Sign up
              </Button>
            </div>
          )}

          {_.keys(user).length > 0 && (
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
