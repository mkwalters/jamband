import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

const Song = () => {
  const { id } = useParams();

  const [songData, setSongData] = useState([]);
  const [remixing, setRemixing] = useState(false);

  const toggleRemixing = () => {
    setRemixing(remixing ? false : true);
  };

  useEffect(() => {
    fetch(`/songs/${id}`).then((data) => {
      data.json().then((json) => {
        console.log(json.data[0]);
        setSongData(json.data[0]);
      });
    });
  }, []);

  return (
    <div>
      <p>song page</p>
      {id}
      <AudioPlayer
        src={songData.s3key}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
      <Button variant="outlined" onClick={toggleRemixing}>
        remix
      </Button>
      {remixing && <p>upload</p>}
    </div>
  );
};
export default Song;
