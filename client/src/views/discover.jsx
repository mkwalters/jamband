import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import song from "./test.mp3";

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
      <AudioPlayer
        autoPlay
        src={song}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
};
export default Discover;
