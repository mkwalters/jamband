import React, { useState, useRef, useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TestSong from "../mississippiHalfStep.mp3";
import { UserContext } from "../UserContext";

var _ = require("lodash");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    marginTop: "12px",
    marginBottom: "12px",
    backgroundColor: "#FFFDD0",
  },
  title: {
    fontSize: 18,
  },
  author: {
    fontSize: 13,
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: "10px",
    },
  },
});

const MyAudioPlayer = (props) => {
  const classes = useStyles();
  // const [currentSongId, setCurrentSongId] = useState(-1);
  const [open, setOpen] = useState(false);
  const [songs, setSongs] = useState(props.user);
  const [totalVotes, setTotalVotes] = useState(props.song.total_votes);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    props.song.liked_by_current_user
  );

  const { user } = useContext(UserContext);

  const audioPlayers = useRef([]);

  const openSnackBar = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    console.log("closing");
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const vote = (songId, liked) => {
    if (_.keys(user).length === 0) {
      openSnackBar();
      return;
    } else {
      console.log(user);
    }
    fetch("/votes", {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ songId, liked, userId: user.user_id }), // body data type must match "Content-Type" header
    }).then((data) => {
      data.json().then((json) => {
        const totalVotesInt = Number.parseInt(totalVotes);
        if (likedByCurrentUser === false) {
          if (json.liked) {
            setTotalVotes(totalVotesInt + 2);
          } else {
            setTotalVotes(totalVotesInt + 1);
          }
        }
        if (likedByCurrentUser === null) {
          if (json.liked) {
            setTotalVotes(totalVotesInt + 1);
          } else {
            setTotalVotes(totalVotesInt - 1);
          }
        }
        if (likedByCurrentUser === true) {
          if (json.liked === null) {
            setTotalVotes(totalVotesInt - 1);
          } else {
            setTotalVotes(totalVotesInt - 2);
          }
        }
        setLikedByCurrentUser(json.liked);
      });
    });
  };

  // const audioPlayers = useRef([]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Please log in to vote
        </Alert>
      </Snackbar>
      <div>
        <Card
          className={
            props.song.song_id === false ? "card-selector" : classes.root
          }
        >
          <CardContent>
            <Link to={"/song/" + props.song.song_id.toString()}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
                style={{ display: "inline" }}
              >
                {props.song.name}
              </Typography>
            </Link>

            <Typography
              className={classes.author}
              color="textPrimary"
              gutterBottom
              style={{ display: "inline" }}
            >
              {" by " + props.song.username}
            </Typography>

            <AudioPlayer
              src={
                process.env.NODE_ENV === "development"
                  ? TestSong
                  : props.song.s3Key
              }
              onPlay={(e) => {
                props.pauseOtherPlayers(props.song.song_id);
                // props.updateCurrentSongId(props.song.song_id);
              }}
              style={{ opacity: "0.5" }}
              id={props.song.song_id}
              ref={(element) => {
                audioPlayers.current.push({
                  id: props.song.song_id,
                  player: element,
                });
              }}
            />

            <CardActions>
              <p style={{ margin: "0px" }}>{totalVotes}</p>

              <IconButton
                onClick={() => {
                  vote(props.song.song_id, true);
                }}
              >
                {props.song.liked_by_current_user ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}
              </IconButton>

              <IconButton
                onClick={() => {
                  vote(props.song.song_id, false);
                }}
              >
                {props.song.liked_by_current_user != true &&
                props.song.liked_by_current_user != undefined ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOutlinedIcon />
                )}
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyAudioPlayer;
