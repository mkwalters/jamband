import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Discover = () => {
  const { user, setUser } = useContext(UserContext);
  const getUser = async () => {
    fetch("/getUser").then((data) => {
      data.json().then((json) => {
        setUser(json);
      });
    });
  };

  return (
    <div className="App">
      <p>discover</p>
      <button onClick={getUser}>grab the user</button>
      <p>{JSON.stringify(user)}</p>
      <button onClick={getUser}>change</button>
    </div>
  );
};
export default Discover;
