import React, { useState, useRef, useEffect } from "react";
import MyAudioPlayer from "./MyAudioPlayer";
import AudioPlayer from "react-h5-audio-player";
var _ = require("lodash");

const AudioPlayers = (props) => {
  const [currentSongId, setCurrentSongId] = useState(-1);
  // const [arr, setArr] = useState(["a", "b"]);
  // const myRefs = useRef(arr.map(() => React.createRef()));

  const [songs, setSongs] = useState(props.user);

  const updateCurrentSongId = (songId) => {
    setCurrentSongId(songId);
  };

  const pauseOtherPlayers = (currentId) => {
    // console.log(audioPlayers.current[0].id);

    console.log(currentId);
    // if (audioPlayers.current[0].id !== currentId) {
    //   audioPlayers.current[0].player.audio.current.pause();
    // }

    // audioPlayers.current.forEach((aPlayer) => {
    //   if (aPlayer.id !== currentId) {
    //     if (aPlayer.player) {
    //       aPlayer.player.audio.current.pause();
    //     }
    //   }
    // });
  };
  return (
    <div>
      {props.songData.map((song, index) => (
        <MyAudioPlayer
          song={song}
          pauseOtherPlayers={pauseOtherPlayers}
          updateCurrentSongId={updateCurrentSongId}
          id={song.song_id}
          // ref={(element) =>
          //   myRefs.current.push({
          //     id: props.song.song_id,
          //     // player: element,
          //   })
          // }
        ></MyAudioPlayer>
      ))}
    </div>
  );
};

export default AudioPlayers;
