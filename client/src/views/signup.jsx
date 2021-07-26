import React from "react";
// import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <main class="container">
      <article class="grid">
        <div>
          <hgroup>
            <h1>Sign up</h1>
          </hgroup>
          <form action="/users" method="post">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
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
