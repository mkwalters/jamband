import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../UserContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../card.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles({
  root: {
    minWidth: 700,
    marginTop: "12px",
    marginBottom: "12px",
    backgroundColor: "#FFFDD0",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  author: {
    fontSize: 13,
  },
});
const Discover = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [songs, setSongs] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(-1);

  const audioPlayers = useRef([]);

  const getUser = async () => {
    fetch("/getUser").then((data) => {
      data.json().then((json) => {
        setUser(json);
      });
    });
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

  const pauseAllButtonsExceptCurrent = (currentId) => {
    // console.log(audioPlayers.current[0].player);
    console.log(audioPlayers.current[0].id);
    console.log(currentId);
    // if (audioPlayers.current[0].id !== currentId) {
    //   audioPlayers.current[0].player.audio.current.pause();
    // }

    audioPlayers.current.forEach((aPlayer) => {
      if (aPlayer.id !== currentId) {
        if (aPlayer.player) {
          aPlayer.player.audio.current.pause();
        }
      }
    });
  };

  const vote = (songId, liked) => {
    fetch("/votes", {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ songId, liked, userId: user.user_id }), // body data type must match "Content-Type" header
    }).then((data) => {
      const json = data.json();
      console.log(JSON.stringify(json));
    });
  };

  return (
    <div className="App">
      <div>
        {songs.map((song, index) => (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <Card
              className={
                song.song_id === currentSongId ? "card-selector" : classes.root
              }
            >
              <CardContent>
                <Link to={"/song/" + song.song_id.toString()}>
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                    style={{ display: "inline" }}
                  >
                    {song.name}
                  </Typography>
                </Link>
                <Typography
                  className={classes.author}
                  color="textPrimary"
                  gutterBottom
                  style={{ display: "inline" }}
                >
                  {" by " + song.username}
                </Typography>
                {/* <Typography
                  className={classes.author}
                  color="textSecondary"
                  gutterBottom
                >
                  by {song.username}
                </Typography> */}
                <AudioPlayer
                  src={song.s3key}
                  onPlay={(e) => {
                    pauseAllButtonsExceptCurrent(song.song_id);
                    setCurrentSongId(song.song_id);
                  }}
                  style={{ opacity: "0.5" }}
                  id={song.song_id}
                  ref={(element) =>
                    audioPlayers.current.push({
                      id: song.song_id,
                      player: element,
                    })
                  }
                  // other props here
                />
              </CardContent>
              <CardActions>
                <p style={{ margin: "0px" }}>{song.total_votes}</p>

                <IconButton
                  onClick={() => {
                    vote(song.song_id, true);
                  }}
                >
                  {song.liked_by_current_user ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                </IconButton>

                <IconButton
                  onClick={() => {
                    vote(song.song_id, false);
                  }}
                >
                  {song.liked_by_current_user != true &&
                  song.liked_by_current_user != undefined ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOutlinedIcon />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </span>
        ))}
      </div>
    </div>
  );
};
export default Discover;
