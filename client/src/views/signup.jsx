import React from "react";
// import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

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
const Signup = () => {
  const classes = useStyles();
  const style = {
    display: "block",
    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <main class="container">
      <article class="grid">
        <Card className={classes.root}>
          <CardContent>
            <div>
              <hgroup>
                <h1>Sign up</h1>
              </hgroup>
              <form action="/users" method="post">
                <input
                  style={style}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <input
                  style={style}
                  type="password"
                  name="password"
                  placeholder="Password"
                />

                <button type="submit" class="contrast">
                  Sign up
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </article>
    </main>
  );
};
export default Signup;
