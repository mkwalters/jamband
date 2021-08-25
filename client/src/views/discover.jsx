import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import api from "../api.js";
import AudioPlayers from "../components/AudioPlayers";

const Discover = () => {
  const { user } = useContext(UserContext);
  const [songs, setSongs] = useState([]);

  const getSongs = async () => {
    let songs = await api.getSongs(user);
    setSongs(songs.data);
  };

  useEffect(() => {
    getSongs();
  }, [user]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flex: 1 }}></div>
      <div style={{ display: "flex", flex: 1 }}>
        <AudioPlayers songData={songs} user={user}></AudioPlayers>
      </div>
      <div style={{ display: "flex", flex: 1 }}></div>
    </div>
  );
};
export default Discover;
