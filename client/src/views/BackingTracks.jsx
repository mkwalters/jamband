import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayers from "../components/AudioPlayers";
import "../card.css";
import UploadButton from "../components/UploadButton";

const BackingTracks = () => {
  const { user } = useContext(UserContext);
  const [songs, setSongs] = useState([]);

  const getSongs = () => {
    fetch("/songs/backingtracks").then((data) => {
      data.json().then((json) => {
        setSongs(json.data);
      });
    });
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div className="App">
      <div>
        <UploadButton label="Create a new backing track"></UploadButton>
      </div>

      <div className="App">
        <div>
          <AudioPlayers songData={songs} user={user}></AudioPlayers>
        </div>
      </div>
    </div>
  );
};
export default BackingTracks;
