import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 700,
    margin: "20px",
    backgroundColor: "#FFFDD0",
    display: "flex",
  },

  title: {
    fontSize: 18,
  },
  author: {
    fontSize: 13,
  },
  tree: {},
});

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    fetch("/login/password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ username, password }),
    }).then(function (res) {
      console.log(res);
    });
  };

  return (
    <main class="container">
      <article class="grid">
        <Card className={classes.root}>
          <CardContent>
            <div>
              <hgroup>
                <h1>Log in</h1>
              </hgroup>
              <form action="/login/password" method="post">
                <input
                  style={{ display: "block" }}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <input
                  style={{
                    display: "block",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <button
                  style={{
                    display: "block",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  type="submit"
                  class="contrast"
                >
                  Sign in
                </button>
              </form>
            </div>
            <div>
              <Link className={classes.root} to="/signup">
                Create an account
              </Link>
            </div>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </article>
    </main>
  );
};
export default Login;
