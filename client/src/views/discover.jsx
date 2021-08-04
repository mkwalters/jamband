import React, { useState, useContext, useEffect } from "react";
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

  const bull = <span className={classes.bullet}>•</span>;

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
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  {song.name}
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
                  onPlay={(e) => setCurrentSongId(song.song_id)}
                  style={{ opacity: "0.5" }}
                  // other props here
                />
              </CardContent>
              <CardActions>
                {/* <Button
                  variant="outlined"
                  component={Link}
                  to={"/song/" + song.song_id.toString()}
                >
                  {"Remix >"}
                </Button> */}
              </CardActions>
            </Card>
          </span>
        ))}
      </div>
    </div>
  );
};
export default Discover;
