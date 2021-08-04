import React, { useState, useContext, useEffect } from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const BackingTracks = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [songs, setSongs] = useState([]);
  const [toggleUpload, setToggleUpload] = useState(false);

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
    setToggleUpload(toggleUpload ? false : true);
  };

  return (
    <div className="App">
      <p></p>
      <Button variant="outlined" onClick={handleToggleUpload}>
        Create new backing track
      </Button>
      {toggleUpload && (
        <FileUpload previousPath="" user={user} original={true} />
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Song Name</TableCell>
              <TableCell>audio player</TableCell>
              <TableCell>author</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song, index) => (
              <TableRow key={song.name}>
                <TableCell>{song.name}</TableCell>
                <TableCell component="th" scope="row">
                  <AudioPlayer
                    src={song.s3key}
                    onPlay={(e) => console.log("onPlay")}
                    header={song.name}
                    // other props here
                  />
                </TableCell>
                <TableCell>
                  <p>{song.username}</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={"/song/" + song.song_id.toString()}
                  >
                    {"Remix >"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default BackingTracks;
