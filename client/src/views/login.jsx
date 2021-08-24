import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    margin: "20px",
    backgroundColor: "#FFFDD0",
    display: "flex",
  },
});

const Login = () => {
  const classes = useStyles();

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
