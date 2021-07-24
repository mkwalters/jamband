import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const testFetch = () => {
    fetch("/api/getList")
      .then((res) => res.json())
      .then((list) => console.log(list));
  };

  return (
    <div className="App">
      <h1>Project Home</h1>
      <Link to="./info">info</Link>
      <button onClick={testFetch}>fetch</button>
    </div>
  );
};
export default Home;
