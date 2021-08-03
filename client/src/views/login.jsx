import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    margin: "20px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

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
        <h1 className={classes.root}>Log in</h1>
        {/* <div>
          <TextField
            className={classes.root}
            onChange={updateUsername}
            id="standard-basic"
            label="Username"
          />
          <TextField
            onChange={updatePassword}
            className={classes.root}
            id="standard-basic"
            label="Password"
          />
          <Button onClick={submit} variant="outlined" className={classes.root}>
            Submit
          </Button>
        </div> */}
        <div>
          <hgroup>
            <h1>Sign in</h1>
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
        <div></div>
        <div>
          <Link className={classes.root} to="/signup">
            Create an account
          </Link>
        </div>
      </article>
    </main>
  );
};
export default Login;
