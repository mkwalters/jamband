import React from "react";
import { Link } from "react-router-dom";

const Discover = () => {
  const getUser = () => {
    fetch("getUser");
  };
  return (
    <div className="App">
      <p>discover</p>
      <button onClick={getUser}>grab the user</button>
    </div>
  );
};
export default Discover;
