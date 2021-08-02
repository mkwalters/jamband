import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Discover = () => {
  const { user, setUser } = useContext(UserContext);
  const [songs, setSongs] = useState([]);

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
      {songs.map((song, index) => (
        <div key={index}>
          <Button
            variant="outlined"
            component={Link}
            to={"/song/" + song.id.toString()}
          >
            go to {song.name}
          </Button>
          <AudioPlayer
            src={song.s3key}
            onPlay={(e) => console.log("onPlay")}
            header={song.name}
            // other props here
          />
        </div>
      ))}
      <button onClick={readData}>read data</button>
    </div>
  );
};
export default Discover;
