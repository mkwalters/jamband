import React from "react";
import MyAudioPlayer from "./MyAudioPlayer";

const AudioPlayers = (props) => {
  return (
    <div style={{ width: "100%" }}>
      {props.songData.map((song) => (
        <MyAudioPlayer song={song} id={song.song_id}></MyAudioPlayer>
      ))}
    </div>
  );
};

export default AudioPlayers;
