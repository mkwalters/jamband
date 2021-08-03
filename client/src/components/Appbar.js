import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { makeStyles } from "@material-ui/core/styles";

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
  return (
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
            Jamband
          </Typography>

          <Button variant="outlined" component={Link} to={"/login"}>
            Log in
          </Button>

          <Button variant="outlined" component={Link} to={"/signup"}>
            Sign up
          </Button>

          <Button variant="outlined" component={Link} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
