import React from "react";
// import { Link } from "react-router-dom";

const Signup = () => {
  const style = {
    display: "block",
    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <main class="container">
      <article class="grid">
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
        <div></div>
      </article>
    </main>
  );
};
export default Signup;
