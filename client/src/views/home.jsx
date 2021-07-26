import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import { ThemeContextProvider } from "../themeContext";

const Home = () => {
  const testFetch = () => {
    fetch("/api/getList")
      .then((res) => res.json())
      .then((list) => console.log(list));
  };

  return (
    <ThemeContextProvider>
      <div className="App">
        <h1>Project Home</h1>
        <Link to="./info">info</Link>
        <Image></Image>
      </div>
    </ThemeContextProvider>
  );
};

export default Home;
