import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Discover = () => {
  const { user, setUser } = useContext(UserContext);
  const [songs, setSongs] = useState([]);

  const s3Domain = "https://jamband.s3.us-west-1.amazonaws.com/";

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

  const getSongs = () => {
    fetch("/songs").then((data) => {
      data.json().then((json) => {
        setSongs(json.data);
      });
    });
  };

  useEffect(() => {
    setUser(getUser());
    getSongs();
  }, []);

  return (
    <div className="App">
      <p>discover</p>
      <button onClick={getUser}>grab the user</button>
      <p>{JSON.stringify(user)}</p>
      <button onClick={getUser}>change</button>

      <p>{JSON.stringify(songs)}</p>
      {songs.map((song, index) => (
        <div key={index}>
          <p>{song.s3key}</p>
          <AudioPlayer
            src={s3Domain + song.s3key}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          />
        </div>
      ))}
      <button onClick={readData}>read data</button>
    </div>
  );
};
export default Discover;
