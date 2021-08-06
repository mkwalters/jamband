import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../UserContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FileUpload from "../components/FileUpload";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../card.css";
var _ = require("lodash");

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
  upload: {
    backgroundColor: "#FFFDD0",
    maxWidth: "200px",
  },
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const BackingTracks = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [songs, setSongs] = useState([]);
  const [toggleUpload, setToggleUpload] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentSongId, setCurrentSongId] = useState(-1);
  const audioPlayers = useRef([]);

  const openSnackBar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getUser = async () => {
    fetch("/getUser").then((data) => {
      data.json().then((json) => {
        setUser(json);
      });
    });
  };

  const getSongs = () => {
    fetch("/songs/backingtracks").then((data) => {
      data.json().then((json) => {
        setSongs(json.data);
      });
    });
  };

  useEffect(() => {
    setUser(getUser());
    getSongs();
  }, []);

  const handleToggleUpload = () => {
    if (_.keys(user).length === 0) {
      openSnackBar();
      return;
    }
    setToggleUpload(toggleUpload ? false : true);
  };

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

  return (
    <div className="App">
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            Must be logged in to upload
          </Alert>
        </Snackbar>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className={classes.upload}>
          <CardContent>
            <Button variant="outlined" onClick={handleToggleUpload}>
              Create new backing track
            </Button>
            {toggleUpload && (
              <FileUpload previousPath="" user={user} original={true} />
            )}
          </CardContent>
        </Card>
      </div>

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
                  ref={(element) =>
                    audioPlayers.current.push({
                      id: song.song_id,
                      player: element,
                    })
                  }
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
    // <div className="App">
    // <div className={classes.root}>
    //   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //     <Alert onClose={handleClose} severity="warning">
    //       Must be logged in to upload
    //     </Alert>
    //   </Snackbar>
    // </div>
    // <p></p>
    // <Button variant="outlined" onClick={handleToggleUpload}>
    //   Create new backing track
    // </Button>
    // {toggleUpload && (
    //   <FileUpload previousPath="" user={user} original={true} />
    // )}
    //   <TableContainer component={Paper}>
    //     <Table className={classes.table} aria-label="simple table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Song Name</TableCell>
    //           <TableCell>audio player</TableCell>
    //           <TableCell>author</TableCell>
    //           <TableCell></TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {songs.map((song, index) => (
    //           <TableRow key={song.name}>
    //             <TableCell>{song.name}</TableCell>
    //             <TableCell component="th" scope="row">
    //               <AudioPlayer
    //                 src={song.s3key}
    //                 onPlay={(e) => console.log("onPlay")}
    //                 header={song.name}
    //                 // other props here
    //               />
    //             </TableCell>
    //             <TableCell>
    //               <p>{song.username}</p>
    //             </TableCell>
    //             <TableCell>
    //               <Button
    //                 variant="outlined"
    //                 component={Link}
    //                 to={"/song/" + song.song_id.toString()}
    //               >
    //                 {"Remix >"}
    //               </Button>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </div>
  );
};
export default BackingTracks;
