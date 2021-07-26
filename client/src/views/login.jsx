import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main class="container">
      <article class="grid">
        <div>
          <hgroup>
            <h1>Sign in</h1>
          </hgroup>
          <form action="/login/password" method="post">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit" class="contrast">
              Sign in
            </button>
          </form>
        </div>
        <div></div>
        <div>
          or <Link to="/signup">Create an account</Link>
        </div>
      </article>
    </main>
  );
};
export default Login;
