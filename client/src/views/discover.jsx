import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Discover = () => {
  const { user, setUser } = useContext(UserContext);

  const getUser = async () => {
    fetch("/getUser").then((data) => {
      data.json().then((json) => {
        setUser(json);
      });
    });
  };

  const readData = () => {
    fetch("/pgTest");
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className="App">
      <p>discover</p>
      <button onClick={getUser}>grab the user</button>
      <p>{JSON.stringify(user)}</p>
      <button onClick={getUser}>change</button>
      <AudioPlayer
        src="https://jamband.s3.us-west-1.amazonaws.com/jackstraw.mp3"
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
      <AudioPlayer
        src="https://jamband.s3.us-west-1.amazonaws.com/browneyedwomen.mp3"
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
      <button onClick={readData}>read data</button>
    </div>
  );
};
export default Discover;
